const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080';

export async function signup({ email, password, passwordConfirm }) {
  const response = await fetch(`${API_BASE_URL}/api/members/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      passwordConfirm,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.error?.detail ??
        result?.message ??
        `회원가입에 실패했습니다. (${response.status})`
    );
  }

  return result?.data;
}

export async function login({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/api/members/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    if (result?.error?.code === 'INVALID_LOGIN_CREDENTIALS') {
      throw new Error('* 아이디 또는 비밀번호가 일치하지 않아요.');
    }

    throw new Error(
      result?.error?.detail ??
        result?.message ??
        `로그인에 실패했습니다. (${response.status})`
    );
  }

  return result?.data;
}
