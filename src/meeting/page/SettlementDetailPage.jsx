import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { getMyProfile } from "../../auth/api/memberApi";
import { confirmSettlement, getSettlementDetail, requestTransfer } from "../api/settlementApi";
import * as S from "../style/StyledSettlementDetail";

const won = new Intl.NumberFormat("ko-KR");     // 16000 → "16,000"

// 날짜와 시간 문자열을 YYYY.MM.DD 형식으로 표시
function formatDate(value) {
  if (!value) return "";
  return value.slice(0, 10).split("-").join(".");
}

export default function SettlementDetailPage() {
  const navigate = useNavigate();
  const { meetupId, settlementId } = useParams();   // 주소에서 꺼내기

  const [ settlement, setSettlement ] = useState(null);   // 정산 상세 데이터
  const [ myId, setMyId ] = useState(null);               // 로그인한 내 memberId
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ isRequesting, setIsRequesting ] = useState(false);  // 버튼 중복 클릭 방지
  const [ confirmingMemberId, setConfirmingMemberId ] = useState(null);

  // 정산 상세 + 내 정보 불러오기
  async function loadDetail() {
    try {
      // 두 API를 동시에 호출하고, 둘 다 끝날 때까지 기다리기
      const [ detail, profile ] = await Promise.all([
        getSettlementDetail(settlementId),
        getMyProfile(),
      ]);

      setSettlement(detail);
      setMyId(profile.memberId);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    loadDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ settlementId ]);

  // "정산 완료 요청하기" 클릭
  async function handleRequest() {
    if (isRequesting || !window.confirm("해당 정산에 대해 송금을 완료했나요?")) return;

    setIsRequesting(true);
    try {
      await requestTransfer(settlementId);
      await loadDetail();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsRequesting(false);
    }
  }

  async function handleConfirm(requestedMemberId) {
    if (confirmingMemberId !== null) return;
    if (!window.confirm("해당 멤버가 송금한 사실을 확인했나요?")) return;

    setConfirmingMemberId(requestedMemberId);
    try {
      const { confirmedAt } = await confirmSettlement(settlementId, requestedMemberId);
      setSettlement((current) => ({
        ...current,
        shares: current.shares.map((share) => (
          share.memberId === requestedMemberId
            ? { ...share, status: "CONFIRMED", confirmedAt }
            : share
        )),
      }));
    } catch (error) {
      alert(error.message);
    } finally {
      setConfirmingMemberId(null);
    }
  }

  // 모임 상세의 정산 탭으로 돌아가기
  function goBack() {
    navigate(`/meetings/${ meetupId }`, { replace: true, state: { activeTab: "settlement" } });
  }

  // 멤버 한 줄의 오른쪽 뱃지/버튼 결정
  function renderBadge(share) {
    const isPayer = share.memberId === settlement.paidByMemberId;
    const isMe = share.memberId === myId;

    if (isPayer) return <S.MutedBadge>결제자</S.MutedBadge>;
    if (share.status === "CONFIRMED") {
      return <S.MutedBadge>{ formatDate(share.confirmedAt) } 완료</S.MutedBadge>;
    }
    if (share.status === "REQUESTED") {
      if (settlement.paidByMemberId === myId) {
        return (
          <S.ActionButton
            type="button"
            onClick={ () => handleConfirm(share.memberId) }
            disabled={ confirmingMemberId !== null }
          >
            정산 완료하기
          </S.ActionButton>
        );
      }
      return <S.PendingBadge>정산 완료 요청 중</S.PendingBadge>;
    }
    if (share.status === "UNPAID" && isMe) {
      return <S.ActionButton type="button" onClick={ handleRequest } disabled={ isRequesting }>정산 완료
        요청하기</S.ActionButton>;
    }
    return null;   // 그 외: 뱃지 없음
  }

  // 로딩·에러 화면
  if (errorMessage) {
    return (
      <main className="page-layout">
        <div className="page-content">
          <BackButton onClick={ goBack }/>
          <S.Message role="alert">{ errorMessage }</S.Message>
        </div>
      </main>
    );
  }
  if (!settlement) {
    return (
      <main className="page-layout">
        <div className="page-content">
          <S.Message role="status">정산 정보를 불러오는 중이에요.</S.Message>
        </div>
      </main>
    );
  }

  // 대표 결제자 프로필 (shares 안에서 결제자 찾기)
  const payer = settlement.shares.find((s) => s.memberId === settlement.paidByMemberId);

  return (
    <main className="page-layout">
      <div className="page-content">
        <div style={ { paddingTop: "70px" } }/>
        <BackButton onClick={ goBack }/>

        <S.Header>
          <S.Title>{ settlement.title }</S.Title>
          <S.TotalAmount>{ won.format(settlement.totalAmount) }원</S.TotalAmount>
        </S.Header>

        <S.InfoBox>
          <S.InfoLabel>정산 등록일</S.InfoLabel>
          <S.InfoValue>{ formatDate(settlement.createdAt) }</S.InfoValue>

          <S.InfoLabel>실 결제일</S.InfoLabel>
          <S.InfoValue>{ formatDate(settlement.spentAt) }</S.InfoValue>
          <S.InfoLabel>정산 방식</S.InfoLabel>
          <S.InfoValue>{ settlement.splitMethod === "EQUAL" ? "N분의 1" : "직접 입력" }</S.InfoValue>

          <S.InfoLabel>대표 결제자</S.InfoLabel>
          <S.InfoValue>
            { payer && <S.SmallProfile src={ payer.profileImageUrl } alt=""/> }
            { settlement.paidByNickname }
          </S.InfoValue>

          <S.InfoLabel>정산 계좌</S.InfoLabel>
          <S.InfoValue>{ settlement.account }</S.InfoValue>
        </S.InfoBox>

        <S.SectionTitle>정산 멤버</S.SectionTitle>
        <S.MemberList>
          { settlement.shares.map((share) => (
            <S.MemberRow
              key={ share.memberId }
              $muted={ share.memberId === settlement.paidByMemberId || share.status === "CONFIRMED" }
            >
              <S.MemberInfo>
                <S.MemberProfile src={ share.profileImageUrl } alt=""/>
                <S.MemberNickname>{ share.nickname }</S.MemberNickname>
              </S.MemberInfo>
              { renderBadge(share) }
              <S.MemberAmount>{ won.format(share.amount) }<span>원</span></S.MemberAmount>
            </S.MemberRow>
          )) }
        </S.MemberList>
      </div>
    </main>
  );
}
