const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080";

async function requestHomeData(path, errorMessage) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.error?.detail ?? result?.message ?? errorMessage
    );
  }

  return Array.isArray(result?.data) ? result.data : [];
}

export function getRecentHomeMeetups() {
  return requestHomeData(
    "/api/home/meetups",
    "최근 등록된 모임을 불러오지 못했습니다."
  );
}

export function getRecentHomeMembers() {
  return requestHomeData(
    "/api/home/members",
    "최근 가입한 회원을 불러오지 못했습니다."
  );
}
