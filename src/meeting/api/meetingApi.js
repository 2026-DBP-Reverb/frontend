const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080';

export async function createMeeting(meeting) {
  const response = await fetch(`${API_BASE_URL}/api/meetups`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meeting),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.error?.detail ??
        result?.message ??
        '모임 개설에 실패했습니다.'
    );
  }

  return result?.data;
}
