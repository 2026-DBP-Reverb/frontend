const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080";

export async function getMeetups() {
  const response = await fetch(`${API_BASE_URL}/api/meetups`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.error?.detail ??
        result?.message ??
        "모임 목록을 불러오지 못했습니다."
    );
  }

  return Array.isArray(result?.data) ? result.data : [];
}

export const DEFAULT_MEETING_IMAGE_URL = "/images/MeetingDefaultImage.png";

export function resolveMeetupImageUrl(imageUrl) {
  if (!imageUrl) {
    return DEFAULT_MEETING_IMAGE_URL;
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/images/meetups/")) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  return imageUrl;
}
