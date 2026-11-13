const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080";

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
