const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080";

async function request(path) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        credentials: "include",
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false) {
        throw new Error(result?.error?.detail ?? "메이트 정보를 불러오지 못했습니다.");
    }

    return result?.data ?? [];
}

export const getRecommendations = () =>
    request("/api/mates/recommendations");

export const getMateProfile = (memberId) =>
    request(`/api/mates/${memberId}/profile`);

export const getMyMates = () =>
    request("/api/mates/requests/my");

export async function requestMate(recipientId) {
    const response = await fetch(`${API_BASE_URL}/api/mates/requests`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        recipientId: recipientId
        }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false) {
        throw new Error(
            result?.error?.detail ?? "메이트 신청에 실패했습니다.",
        );
    }

    return result?.data;
}

export async function acceptRequest(requestId) {
    const response = await fetch(`${API_BASE_URL}/api/mates/requests/${requestId}/accept`, {
        method: "POST",
        credentials: "include",
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false) {
        throw new Error(result?.error?.detail ?? "요청 수락에 실패했습니다.");
    }

    return result?.data;
}

export async function rejectRequest(requestId) {
    const response = await fetch(`${API_BASE_URL}/api/mates/requests/${requestId}/reject`, {
        method: "POST",
        credentials: "include",
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false) {
        throw new Error(result?.error?.detail ?? "요청 거절에 실패했습니다.");
    }

    return result?.data;
}