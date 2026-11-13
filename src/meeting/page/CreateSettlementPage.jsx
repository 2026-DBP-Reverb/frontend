import {forwardRef, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useLocation, useMatch, useNavigate, useParams} from "react-router-dom";
import BackButton from "../../components/BackButton";
import {getMyProfile} from "../../auth/api/memberApi";
import SettlementMenu from "../components/SettlementMenu";
import {getMeeting} from "../api/meetingApi";
import {createSettlement} from "../api/settlementApi";
import * as Meeting from "../style/StyledCreateMeeting";
import * as S from "../style/StyledCreateSettlement";
import * as Members from "../style/StyledMeetingMembers";

const MAX_AMOUNT = 2147483647;
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080";
const DEFAULT_AVATAR = "/images/Profile1.svg";
const won = new Intl.NumberFormat("ko-KR");

function formatAmountInput(value) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CreateSettlementPage() {
  const navigate = useNavigate();
  const {meetupId} = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let current = true;

    Promise.all([getMeeting(meetupId), getMyProfile()])
      .then(([data, profile]) => {
        if (!data) {
          throw new Error("모임 정보를 불러오지 못했습니다.");
        }
        if (current) {
          setMeeting({meetupId, data, memberId: profile?.memberId});
          setLoadError(null);
        }
      })
      .catch((error) => {
        if (current) {
          setLoadError({meetupId, message: error.message});
        }
      });

    return () => {
      current = false;
    };
  }, [meetupId]);

  const currentMeeting = meeting?.meetupId === meetupId ? meeting.data : null;

  function returnToSettlement() {
    navigate(`/meetings/${meetupId}`, {
      replace: true,
      state: {activeTab: "settlement"},
    });
  }

  return (
    <main className="page-layout page-layout--with-button">
      <div className="page-content">
        {currentMeeting?.host || currentMeeting?.joined ? (
          <SettlementForm
            key={meetupId}
            meetupId={meetupId}
            members={currentMeeting.participants ?? []}
            currentMemberId={meeting.memberId}
            onCancel={returnToSettlement}
            onSuccess={returnToSettlement}
          />
        ) : (
          <S.Form as="section">
            <BackButton onClick={returnToSettlement} />
            <h1>새 정산 등록</h1>
            {loadError?.meetupId === meetupId ? (
              <p role="alert">{loadError.message}</p>
            ) : (
              <p role="status">
                {currentMeeting
                  ? "모임 참여자만 정산을 등록할 수 있어요."
                  : "모임 정보를 불러오는 중..."}
              </p>
            )}
          </S.Form>
        )}
      </div>
    </main>
  );
}

const SettlementDateTrigger = forwardRef(function SettlementDateTrigger(
  {id, value, placeholder, onClick, onKeyDown, className},
  ref
) {
  return (
    <Meeting.DateRow className={className}>
      <Meeting.DateValue
        ref={ref}
        id={id}
        type="button"
        $hasValue={Boolean(value)}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {value || placeholder}
      </Meeting.DateValue>
      <Meeting.SelectDateButton
        type="button"
        aria-label="결제 날짜 선택"
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        선택
      </Meeting.SelectDateButton>
    </Meeting.DateRow>
  );
});

function SettlementForm({meetupId, members, currentMemberId, onCancel, onSuccess}) {
  const [form, setForm] = useState({title: "", spentAt: "", totalAmount: "", account: ""});
  const [splitMethod, setSplitMethod] = useState("EQUAL");
  const [selectedIds, setSelectedIds] = useState(() => [currentMemberId]);
  const navigate = useNavigate();
  const {state} = useLocation();
  const formPath = `/meetings/${meetupId}/settlements/new`;
  const isSelectingMembers = useMatch(`${formPath}/members`) !== null;
  const [amounts, setAmounts] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const selectedMembers = members.filter(({memberId}) => selectedIds.includes(memberId));
  const totalAmount = Number(form.totalAmount);
  const baseAmount = Math.floor(totalAmount / (selectedMembers.length || 1));
  const remainder = totalAmount % (selectedMembers.length || 1);
  const currentMemberIndex = selectedMembers.findIndex(({memberId}) => memberId === currentMemberId);
  const participants = selectedMembers.map(({memberId}, index) => {
    let remainderIndex = index;
    if (index === currentMemberIndex) {
      remainderIndex = 0;
    } else if (index < currentMemberIndex) {
      remainderIndex += 1;
    }

    return {
      memberId,
      amount: splitMethod === "EQUAL"
        ? baseAmount + (remainderIndex < remainder ? 1 : 0)
        : Number(amounts[memberId] ?? ""),
    };
  });
  const distributedAmount = participants.reduce((sum, {amount}) => sum + amount, 0);
  const splitIsValid =
    participants.length > 0 &&
    participants.every(({amount}) => Number.isInteger(amount) && amount > 0) &&
    distributedAmount === totalAmount;
  const splitError = totalAmount > 0 && !splitIsValid
    ? distributedAmount !== totalAmount
      ? "* 총 금액과 분배된 금액이 일치하지 않아요"
      : "* 멤버별 금액은 1원 이상이어야 해요"
    : "";
  const canSubmit =
    form.title.trim() && form.spentAt && form.account.trim() &&
    Number.isInteger(totalAmount) && totalAmount <= MAX_AMOUNT &&
    participants.length >= 2 && splitIsValid;

  function updateField(event) {
    const {name, value} = event.target;
    const nextValue = name === "totalAmount" ? value.replace(/\D/g, "") : value;
    setForm((previous) => ({...previous, [name]: nextValue}));
  }

  function changeSplitMethod(method) {
    if (splitMethod === "EQUAL" && method === "WEIGHTED") {
      setAmounts(Object.fromEntries(
        participants.map(({memberId, amount}) => [
          memberId,
          totalAmount > 0 ? String(amount) : "",
        ])
      ));
    }
    setSplitMethod(method);
  }

  function removeMember(memberId) {
    setSelectedIds((previous) => previous.filter((id) => id !== memberId));
    setAmounts((previous) => {
      const next = {...previous};
      delete next[memberId];
      return next;
    });
  }

  function selectDate(date) {
    const spentAt = date
      ? [date.getFullYear(), date.getMonth() + 1, date.getDate()]
          .map((part, index) => String(part).padStart(index === 0 ? 4 : 2, "0"))
          .join("-")
      : "";
    setForm((previous) => ({...previous, spentAt}));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await createSettlement({
        meetupId: Number(meetupId),
        title: form.title.trim(),
        account: form.account.trim(),
        totalAmount,
        splitMethod,
        spentAt: form.spentAt,
        participants,
      });
      onSuccess();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function closeMemberPicker() {
    if (state?.fromSettlementForm === formPath) {
      navigate(-1);
    } else {
      navigate(formPath, {replace: true});
    }
  }

  if (isSelectingMembers) {
    return (
      <SettlementMemberPicker
        members={members.filter(({memberId}) =>
          memberId !== currentMemberId && !selectedIds.includes(memberId)
        )}
        onBack={closeMemberPicker}
        onConfirm={(memberIds) => {
          setSelectedIds((previous) => [...previous, ...memberIds]);
          closeMemberPicker();
        }}
      />
    );
  }

  return (
    <S.Form onSubmit={handleSubmit} aria-label="새 정산 등록">
      <BackButton onClick={onCancel} />
      <S.Fields>
        <Meeting.Field>
          <Meeting.Label htmlFor="settlement-title">정산 제목</Meeting.Label>
          <Meeting.TextInput
            id="settlement-title" name="title" value={form.title}
            onChange={updateField} placeholder="어떤 정산인지 간단히 설명해주세요" required
          />
        </Meeting.Field>
        <Meeting.Field>
          <Meeting.Label htmlFor="settlement-date">실제로 결제한 날짜</Meeting.Label>
          <DatePicker
            id="settlement-date"
            selected={form.spentAt ? new Date(`${form.spentAt}T00:00:00`) : null}
            onChange={selectDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="2026-00-00"
            customInput={<SettlementDateTrigger />}
            portalId="settlement-datepicker-portal"
          />
        </Meeting.Field>
        <Meeting.Field>
          <Meeting.Label htmlFor="settlement-total">금액</Meeting.Label>
          <S.AmountInput
            id="settlement-total" name="totalAmount" type="text" inputMode="numeric"
            value={formatAmountInput(form.totalAmount)}
            onChange={updateField} placeholder="50,000" required
          />
        </Meeting.Field>
        <Meeting.Field>
          <Meeting.Label htmlFor="settlement-account">정산 계좌</Meeting.Label>
          <Meeting.TextInput
            id="settlement-account" name="account" value={form.account}
            onChange={updateField} placeholder="OO은행 000-000-000 홍길동" required
          />
        </Meeting.Field>
        <S.Group>
          <S.Legend>어떻게 분배할까요?</S.Legend>
          <S.SplitOptions>
            {Object.entries({EQUAL: "N분의 1", WEIGHTED: "직접 분배"}).map(([method, label]) => (
              <S.SplitOption
                key={method}
                variant={splitMethod === method ? "filled" : "outlined"}
                aria-pressed={splitMethod === method}
                onClick={() => changeSplitMethod(method)}
              >
                {label}
              </S.SplitOption>
            ))}
          </S.SplitOptions>
        </S.Group>
        <S.Group>
          <S.Legend>정산 멤버</S.Legend>
          <SettlementMenu
            label="멤버 추가하기"
            to={`${formPath}/members`}
            state={{fromSettlementForm: formPath}}
          />
          {splitError && (
            <S.SplitErrorMessage role="status">{splitError}</S.SplitErrorMessage>
          )}
          <S.MemberList>
            {selectedMembers.map(({memberId, nickname, profileImageUrl}, index) => (
              <S.MemberRow key={memberId}>
                <S.Avatar
                  src={resolveAvatar(profileImageUrl)}
                  alt=""
                  onError={handleAvatarError}
                />
                <S.MemberName>{nickname}{memberId === currentMemberId ? " (나)" : ""}</S.MemberName>
                {splitMethod === "EQUAL" ? (
                  <S.MemberAmount
                    aria-label={`${nickname} 정산 금액 (원)`}
                    value={totalAmount > 0 ? won.format(participants[index].amount) : ""}
                    placeholder="0" readOnly
                  />
                ) : (
                  <S.MemberAmount
                    aria-label={`${nickname} 정산 금액 (원)`}
                    type="text"
                    inputMode="numeric"
                    value={formatAmountInput(amounts[memberId] ?? "")}
                    onChange={(event) => {
                      const value = event.target.value.replace(/\D/g, "");
                      setAmounts((previous) => ({...previous, [memberId]: value}));
                    }}
                  />
                )}
                {memberId !== currentMemberId && (
                  <S.RemoveMemberButton
                    type="button"
                    aria-label={`${nickname} 정산 멤버에서 제거`}
                    onClick={() => removeMember(memberId)}
                  />
                )}
              </S.MemberRow>
            ))}
          </S.MemberList>
        </S.Group>
        {errorMessage && <S.ErrorMessage role="alert">{errorMessage}</S.ErrorMessage>}
      </S.Fields>
      <S.SubmitButton type="submit" disabled={!canSubmit || isSubmitting}>
        {isSubmitting ? "등록 중..." : "완료"}
      </S.SubmitButton>
    </S.Form>
  );
}

function resolveAvatar(profileImageUrl) {
  return profileImageUrl ? new URL(profileImageUrl, API_BASE_URL).href : DEFAULT_AVATAR;
}

function handleAvatarError(event) {
  if (event.currentTarget.getAttribute("src") !== DEFAULT_AVATAR) {
    event.currentTarget.src = DEFAULT_AVATAR;
  }
}

function SettlementMemberPicker({members, onBack, onConfirm}) {
  const [pendingIds, setPendingIds] = useState([]);

  function toggleMember(memberId) {
    setPendingIds((previous) => previous.includes(memberId)
      ? previous.filter((id) => id !== memberId)
      : [...previous, memberId]);
  }

  return (
    <S.MemberPicker>
      <BackButton onClick={onBack} />
      <Members.Content>
        <Members.Title>모임 멤버 목록</Members.Title>
        {members.length === 0 ? (
          <Members.StatusMessage>추가할 수 있는 모임 멤버가 없어요.</Members.StatusMessage>
        ) : (
          <Members.MemberList>
            {members.map(({memberId, nickname, profileImageUrl}) => {
              const isSelected = pendingIds.includes(memberId);
              return (
                <Members.MemberRow key={memberId}>
                  <Members.ProfileImage
                    src={resolveAvatar(profileImageUrl)}
                    alt=""
                    onError={handleAvatarError}
                  />
                  <Members.Nickname>{nickname}</Members.Nickname>
                  <S.MemberToggle
                    type="button"
                    aria-pressed={isSelected}
                    aria-label={`${nickname} ${isSelected ? "추가됨" : "추가"}`}
                    onClick={() => toggleMember(memberId)}
                  >
                    {isSelected ? "추가됨" : "추가"}
                  </S.MemberToggle>
                </Members.MemberRow>
              );
            })}
          </Members.MemberList>
        )}
      </Members.Content>
      <S.SubmitButton
        type="button"
        disabled={pendingIds.length === 0}
        onClick={() => onConfirm(pendingIds)}
      >
        멤버 추가 완료
      </S.SubmitButton>
    </S.MemberPicker>
  );
}
