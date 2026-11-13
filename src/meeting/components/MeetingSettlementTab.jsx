import {useEffect, useState} from "react";
import {getSettlements} from "../api/settlementApi";
import SettlementMenu from "./SettlementMenu";
import * as S from "../style/StyledMeetingDetail";

const amountFormat = new Intl.NumberFormat("ko-KR");
const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "UTC",
});

function formatSpentAt(value) {
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : dateFormat.format(date).replace(/\.$/, "");
}

export default function MeetingSettlementTab({meetupId, onSettlementClick}) {
  const [settlements, setSettlements] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    getSettlements(meetupId, {signal: controller.signal})
      .then((data) => {
        if (!controller.signal.aborted) {
          setSettlements(data);
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setErrorMessage(error.message);
        }
      });

    return () => controller.abort();
  }, [meetupId]);

  return (
    <S.SettlementList>
      <SettlementMenu
        label="새 정산 등록하기"
        to={`/meetings/${meetupId}/settlements/new`}
      />
      {errorMessage && (
        <S.SettlementMessage role="alert">{errorMessage}</S.SettlementMessage>
      )}
      {!errorMessage && !settlements && (
        <S.SettlementMessage role="status">정산 목록을 불러오는 중이에요.</S.SettlementMessage>
      )}
      {settlements?.length === 0 && (
        <S.SettlementMessage>등록된 정산이 없어요.</S.SettlementMessage>
      )}
      {settlements?.length > 0 && (
        <S.SettlementItems aria-label="정산 목록">
          {settlements.map(({settlementId, title, totalAmount, spentAt, paidByMemberNickname, completed}) => (
            <S.SettlementItem key={settlementId}>
              <S.SettlementItemButton
                type="button"
                $completed={completed}
                onClick={() => onSettlementClick?.(settlementId)}
              >
                <S.SettlementItemHeading>
                  <S.SettlementTitle title={title}>{title}</S.SettlementTitle>
                  <S.SettlementAmount>{amountFormat.format(totalAmount)}<span>원</span></S.SettlementAmount>
                </S.SettlementItemHeading>
                <S.SettlementDetails $completed={completed}>
                  <S.SettlementDetail>
                    <S.SettlementDetailLabel>결제일</S.SettlementDetailLabel>
                    <S.SettlementDetailValue>
                      <time dateTime={spentAt}>{formatSpentAt(spentAt)}</time>
                    </S.SettlementDetailValue>
                  </S.SettlementDetail>
                  <S.SettlementDetail>
                    <S.SettlementDetailLabel>결제자</S.SettlementDetailLabel>
                    <S.SettlementDetailValue title={paidByMemberNickname}>
                      {paidByMemberNickname || "확인 불가"}
                    </S.SettlementDetailValue>
                  </S.SettlementDetail>
                </S.SettlementDetails>
              </S.SettlementItemButton>
            </S.SettlementItem>
          ))}
        </S.SettlementItems>
      )}
    </S.SettlementList>
  );
}
