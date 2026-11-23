const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080";

export async function confirmSettlement(settlementId, requestedMemberId) {
  const response = await fetch(
    `${API_BASE_URL}/api/settlements/${settlementId}/${requestedMemberId}`,
    {
      method: 'PUT',
      credentials: 'include',
    }
  );
  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success !== true || !result?.data?.confirmedAt) {
    throw new Error(
      result?.error?.detail ?? result?.message ?? '정산 확인에 실패했어요.'
    );
  }

  return result.data;
}

export async function createSettlement(settlement) {
  const response = await fetch(`${API_BASE_URL}/api/settlements`, {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(settlement),
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.error?.detail ?? result?.message ?? "정산 등록에 실패했습니다."
    );
  }
}

export async function getSettlements(meetupId, {signal} = {}) {
  const query = new URLSearchParams({meetupId});
  const response = await fetch(`${API_BASE_URL}/api/settlements?${query}`, {
    credentials: "include",
    signal,
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false || !Array.isArray(result?.data)) {
    throw new Error(
      result?.error?.detail ?? result?.message ?? "정산 목록을 불러오지 못했어요."
    );
  }

  return result.data;
}

// 정산 상세 조회 (기본 정보 + 멤버별 정산 항목)
export async function getSettlementDetail(settlementId, {signal} = {}) {
  const response = await fetch(`${API_BASE_URL}/api/settlements/${settlementId}`, {
    credentials: "include",      // 세션 쿠키 같이 보내기 (로그인 유지)
    signal,                      // 페이지를 벗어나면 요청 취소용
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
        result?.error?.detail ?? result?.message ?? "정산 정보를 불러오지 못했어요."
    );
  }

  return result.data;            // { settlementId, title, ..., shares: [...] }
}

// 송금 보고 (내 정산 항목을 UNPAID → REQUESTED)
export async function requestTransfer(settlementId) {
  const response = await fetch(`${API_BASE_URL}/api/settlements/${settlementId}/request`, {
    method: "PUT",
    credentials: "include",
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
        result?.error?.detail ?? result?.message ?? "송금 보고에 실패했어요."
    );
  }
}
