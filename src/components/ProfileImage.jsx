import {useState} from 'react';
import {
  DEFAULT_PROFILE_IMAGE_URL,
  resolveProfileImageUrl,
} from '../utils/profileImage';

function ImageWithFallback({src, alt, onError, ...props}) {
  const [failed, setFailed] = useState(false);
  const imageSrc = failed ? DEFAULT_PROFILE_IMAGE_URL : src;

  function handleError(event) {
    if (imageSrc !== DEFAULT_PROFILE_IMAGE_URL) {
      setFailed(true);
    }
    onError?.(event);
  }

  return <img {...props} src={imageSrc} alt={alt} onError={handleError} />;
}

export default function ProfileImage({src, alt = '프로필 이미지', ...props}) {
  const imageSrc = resolveProfileImageUrl(src);

  return <ImageWithFallback key={imageSrc} {...props} src={imageSrc} alt={alt} />;
}
