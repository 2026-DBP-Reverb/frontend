import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { createMeeting } from '../api/meetingApi';
import * as S from '../style/StyledCreateMeeting';

const CATEGORIES = ['콘서트', '페스티벌', '리스닝', '기타'];
const CATEGORY_VALUES = {
  콘서트: 'CONCERT',
  페스티벌: 'FESTIVAL',
  리스닝: 'LISTENING',
  기타: 'OTHER',
};
const DEFAULT_MEETING_IMAGE_URL = '/images/Meeting1.svg';

function formatDateTime(value) {
  return value ? value.replace('T', ' ') : '2026-00-00 19:00';
}

export default function CreateMeetingPage() {
  const navigate = useNavigate();
  const dateInputRef = useRef(null);
  const [form, setForm] = useState({
    title: '',
    place: '',
    dateTime: '',
    capacity: '',
    category: '',
    description: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleCapacityChange = (event) => {
    updateField('capacity', event.target.value.replace(/\D/g, ''));
  };

  const handleImageUrlChange = () => {
    const input = window.prompt('이미지 URL을 입력해주세요.', imageUrl);

    if (input === null) {
      return;
    }

    const nextImageUrl = input.trim();

    if (!nextImageUrl) {
      setImageUrl('');
      return;
    }

    try {
      const parsedUrl = new URL(nextImageUrl);

      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('지원하지 않는 URL 형식입니다.');
      }

      setImageUrl(nextImageUrl);
    } catch {
      window.alert('http 또는 https로 시작하는 이미지 URL을 입력해주세요.');
    }
  };

  const openDatePicker = () => {
    if (typeof dateInputRef.current?.showPicker === 'function') {
      dateInputRef.current.showPicker();
      return;
    }

    dateInputRef.current?.focus();
    dateInputRef.current?.click();
  };

  const canSubmit =
    form.title.trim().length > 0 &&
    form.place.trim().length > 0 &&
    form.dateTime.length > 0 &&
    Number(form.capacity) > 0 &&
    form.category.length > 0 &&
    form.description.trim().length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const meeting = await createMeeting({
        title: form.title.trim(),
        description: form.description.trim(),
        imageUrl: imageUrl || DEFAULT_MEETING_IMAGE_URL,
        category: CATEGORY_VALUES[form.category],
        place: form.place.trim(),
        capacity: Number(form.capacity),
        startsAt: form.dateTime,
      });

      navigate(`/meetings/${meeting.meetupId}`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-layout page-layout--with-button">
      <div className="page-content">
        <S.Form onSubmit={handleSubmit}>
          <BackButton onClick={() => navigate(-1)} />

          <S.Fields>
            <S.ImageTitleRow>
              <S.ImageButton
                type="button"
                aria-label="모임 사진 URL 입력"
                onClick={handleImageUrlChange}
              >
                {imageUrl ? (
                  <S.ImagePreview
                    src={imageUrl}
                    alt="선택한 모임"
                    onError={() => setImageUrl('')}
                  />
                ) : (
                  <S.ImagePlaceholder
                    src={`${process.env.PUBLIC_URL}/images/MeetingImagePlaceholder.svg`}
                    alt=""
                  />
                )}
              </S.ImageButton>
              <S.ImageUrlInput
                type="url"
                name="imageUrl"
                value={imageUrl}
                readOnly
                tabIndex={-1}
                aria-hidden="true"
              />

              <S.TitleField>
                <S.Label htmlFor="meeting-title">모임 제목</S.Label>
                <S.TextInput
                  id="meeting-title"
                  name="title"
                  value={form.title}
                  onChange={(event) => updateField('title', event.target.value)}
                  placeholder="우리 모임의 제목을 입력해주세요"
                />
              </S.TitleField>
            </S.ImageTitleRow>

            <S.Field>
              <S.Label htmlFor="meeting-place">장소</S.Label>
              <S.TextInput
                id="meeting-place"
                name="place"
                value={form.place}
                onChange={(event) => updateField('place', event.target.value)}
                placeholder="서울특별시 OO구 OO로 00"
              />
            </S.Field>

            <S.Field>
              <S.Label htmlFor="meeting-date">일시</S.Label>
              <S.DateRow>
                <S.DateValue
                  type="button"
                  $hasValue={Boolean(form.dateTime)}
                  onClick={openDatePicker}
                >
                  {formatDateTime(form.dateTime)}
                </S.DateValue>
                <S.NativeDateInput
                  ref={dateInputRef}
                  id="meeting-date"
                  name="dateTime"
                  type="datetime-local"
                  value={form.dateTime}
                  onChange={(event) =>
                    updateField('dateTime', event.target.value)
                  }
                />
                <S.SelectDateButton type="button" onClick={openDatePicker}>
                  선택
                </S.SelectDateButton>
              </S.DateRow>
            </S.Field>

            <S.HalfRow>
              <S.Field>
                <S.Label htmlFor="meeting-capacity">정원</S.Label>
                <S.TextInput
                  id="meeting-capacity"
                  name="capacity"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={form.capacity}
                  onChange={handleCapacityChange}
                  placeholder="5"
                />
              </S.Field>

              <S.Field>
                <S.Label htmlFor="meeting-category">카테고리</S.Label>
                <S.Select
                  id="meeting-category"
                  name="category"
                  value={form.category}
                  onChange={(event) =>
                    updateField('category', event.target.value)
                  }
                >
                  <option value="" disabled>
                    카테고리 선택
                  </option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </S.Select>
              </S.Field>
            </S.HalfRow>

            <S.DescriptionField>
              <S.Label htmlFor="meeting-description">설명</S.Label>
              <S.Textarea
                id="meeting-description"
                name="description"
                value={form.description}
                onChange={(event) =>
                  updateField('description', event.target.value)
                }
                placeholder="우리 모임을 구체적으로 설명해주세요"
              />
            </S.DescriptionField>
          </S.Fields>

          {errorMessage && (
            <S.ErrorMessage role="alert">{errorMessage}</S.ErrorMessage>
          )}

          <S.SubmitButton
            type="submit"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? '개설 중...' : '이대로 모임 개설하기'}
          </S.SubmitButton>
        </S.Form>
      </div>
    </main>
  );
}
