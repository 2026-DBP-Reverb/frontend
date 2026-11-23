const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080';

export const DEFAULT_PROFILE_IMAGE_URL =
  `${process.env.PUBLIC_URL || ''}/images/Profile1.svg`;

export function resolveProfileImageUrl(value) {
  const imageUrl = typeof value === 'string' ? value.trim() : '';

  if (!imageUrl || imageUrl === DEFAULT_PROFILE_IMAGE_URL) {
    return DEFAULT_PROFILE_IMAGE_URL;
  }

  try {
    const url = new URL(imageUrl, API_BASE_URL);
    return ['http:', 'https:'].includes(url.protocol)
      ? url.href
      : DEFAULT_PROFILE_IMAGE_URL;
  } catch {
    return DEFAULT_PROFILE_IMAGE_URL;
  }
}
