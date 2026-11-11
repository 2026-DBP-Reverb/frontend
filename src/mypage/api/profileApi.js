const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080";

export async function updateMyProfile({nickname, instagramId, profileImageUrl}) {
  const response = await fetch(`${API_BASE_URL}/api/members/me`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({nickname, instagramId, profileImageUrl}),
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.error?.detail ??
      result?.message ??
      "내 프로필을 수정하지 못했습니다."
    );
  }

  return result?.data;
}
