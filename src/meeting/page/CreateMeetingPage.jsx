import {useRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import {createMeeting} from "../api/meetingApi";
import * as S from "../style/StyledCreateMeeting";

const CATEGORIES = ["콘서트", "페스티벌", "리스닝", "기타"];
const CATEGORY_VALUES = {
  콘서트: "CONCERT",
  페스티벌: "FESTIVAL",
  리스닝: "LISTENING",
  기타: "OTHER",
};
const DEFAULT_MEETING_IMAGE_URL = "/images/Meeting1.svg";
const MAX_TITLE_BYTES = 200;
const MAX_PLACE_BYTES = 255;
const PLACE_FORMAT = /^(?:[가-힣]+도 +)?[가-힣]+시 +\S.*$/;
const MAX_CAPACITY = 99999;
const EMPTY_DATE_TIME = {date: null, period: "AM", hour: null, minute: ""};
const textEncoder = new TextEncoder();
const PERIODS = {AM: "오전", PM: "오후"};
const HOURS = Array.from({length: 12}, (_, index) => index + 1);
const MINUTES = ["00", "10", "20", "30", "40", "50"];

function formatLocalDate(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((part) => String(part).padStart(2, "0"))
    .join("-");
}

export default function CreateMeetingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    place: "",
    capacity: "",
    category: "",
    description: "",
  });
  const dateTimeDialog = useRef(null);
  const [selectedDateTime, setSelectedDateTime] = useState(EMPTY_DATE_TIME);
  const [draftDateTime, setDraftDateTime] = useState(EMPTY_DATE_TIME);
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");

  const updateField = (field, value) => {
    setForm((previous) => ({...previous, [field]: value}));
  };

  const openDateTimeDialog = () => {
    setDraftDateTime(selectedDateTime);
    dateTimeDialog.current.showModal();
  };

  const updateDraftDateTime = (field, value) => {
    setDraftDateTime((previous) => ({...previous, [field]: value}));
  };

  const canConfirmDateTime = Boolean(
    draftDateTime.date && draftDateTime.hour !== null && draftDateTime.minute
  );

  const confirmDateTime = () => {
    setSelectedDateTime(draftDateTime);
    dateTimeDialog.current.close();
  };

  const handleImageUrlChange = () => {
    const input = window.prompt("이미지 URL을 입력해주세요.", imageUrl);

    if (input === null) {
      return;
    }

    const nextImageUrl = input.trim();
    setImageUrlError("");

    if (!nextImageUrl) {
      setImageUrl("");
      return;
    }

    try {
      const parsedUrl = new URL(nextImageUrl);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("지원하지 않는 URL 형식입니다.");
      }

      setImageUrl(nextImageUrl);
    } catch {
      setImageUrlError("http 또는 https로 시작하는 이미지 URL을 입력해주세요.");
    }
  };

  const {date, period, hour, minute} = selectedDateTime;
  const hour24 = (hour % 12) + (period === "PM" ? 12 : 0);
  const startsAt = date
    ? `${formatLocalDate(date)}T${String(hour24).padStart(2, "0")}:${minute}`
    : "";
  const title = form.title.trim();
  const place = form.place.trim();
  const isTitleTooLong = textEncoder.encode(title).length > MAX_TITLE_BYTES;
  const isPlaceTooLong = textEncoder.encode(place).length > MAX_PLACE_BYTES;
  const isPlaceFormatValid = PLACE_FORMAT.test(place);
  const hasPlaceError = place !== "" && (isPlaceTooLong || !isPlaceFormatValid);

  const capacity = Number(form.capacity);
  const isCapacityValid =
    /^[0-9]+$/.test(form.capacity) && capacity >= 1 && capacity <= MAX_CAPACITY;
  const hasCapacityError = form.capacity !== "" && !isCapacityValid;

  const canSubmit =
    title.length > 0 &&
    !isTitleTooLong &&
    isPlaceFormatValid &&
    !isPlaceTooLong &&
    startsAt !== "" &&
    isCapacityValid &&
    form.category.length > 0 &&
    form.description.trim().length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const meeting = await createMeeting({
        title,
        description: form.description.trim(),
        imageUrl: imageUrl || DEFAULT_MEETING_IMAGE_URL,
        category: CATEGORY_VALUES[form.category],
        place,
        capacity,
        startsAt,
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
        <S.ScrollableForm onSubmit={handleSubmit}>
          <BackButton onClick={() => navigate(-1)}/>

          <S.Fields>
            <S.ImageTitleRow>
              <S.ImageButton
                type="button"
                aria-label="모임 사진 URL 입력"
                aria-describedby={imageUrlError ? "meeting-image-error" : undefined}
                onClick={handleImageUrlChange}
              >
                {imageUrl ? (
                  <S.ImagePreview
                    src={imageUrl}
                    alt="선택한 모임"
                    onError={() => setImageUrl("")}
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
                  aria-invalid={isTitleTooLong}
                  aria-describedby={isTitleTooLong ? "meeting-title-error" : undefined}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="우리 모임의 제목을 입력해주세요"
                />
                {isTitleTooLong && (
                  <S.FieldError id="meeting-title-error" role="alert">
                    모임 제목은 UTF-8 기준 {MAX_TITLE_BYTES}바이트 이하로 입력해주세요.
                  </S.FieldError>
                )}
              </S.TitleField>
            </S.ImageTitleRow>
            {imageUrlError && (
              <S.FieldError id="meeting-image-error" role="alert">
                {imageUrlError}
              </S.FieldError>
            )}

            <S.Field>
              <S.Label htmlFor="meeting-place">장소</S.Label>
              <S.TextInput
                id="meeting-place"
                name="place"
                value={form.place}
                aria-invalid={hasPlaceError}
                aria-describedby={hasPlaceError ? "meeting-place-error" : undefined}
                onChange={(event) => updateField("place", event.target.value)}
                placeholder="서울특별시 OO구 OO로 00"
              />
              {hasPlaceError && (
                <S.FieldError id="meeting-place-error" role="alert">
                  {isPlaceTooLong
                    ? `장소는 UTF-8 기준 ${MAX_PLACE_BYTES}바이트 이하로 입력해주세요.`
                    : "‘○○시 상세 주소’ 또는 ‘○○도 ○○시 상세 주소’ 형식으로 입력해주세요."}
                </S.FieldError>
              )}
            </S.Field>

            <S.Field>
              <S.Label htmlFor="meeting-date">일시</S.Label>
              <S.DateRow>
                <S.DateValue
                  id="meeting-date"
                  type="button"
                  aria-haspopup="dialog"
                  $hasValue={Boolean(startsAt)}
                  onClick={openDateTimeDialog}
                >
                  {date
                    ? `${formatLocalDate(date)} ${PERIODS[period]} ${hour}:${minute}`
                    : "날짜를 선택해주세요"}
                </S.DateValue>
                <S.SelectDateButton
                  type="button"
                  aria-label="모임 일시 선택"
                  aria-haspopup="dialog"
                  onClick={openDateTimeDialog}
                >
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
                  value={form.capacity}
                  aria-invalid={hasCapacityError}
                  aria-describedby={hasCapacityError ? "meeting-capacity-error" : undefined}
                  onChange={(event) => updateField("capacity", event.target.value)}
                  placeholder="5"
                />
                {hasCapacityError && (
                  <S.FieldError id="meeting-capacity-error" role="alert">
                    정원은 1명부터 99,999명까지 정수로 입력해주세요.
                  </S.FieldError>
                )}
              </S.Field>

              <S.Field>
                <S.Label htmlFor="meeting-category">카테고리</S.Label>
                <S.Select
                  id="meeting-category"
                  name="category"
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
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
                  updateField("description", event.target.value)
                }
                placeholder="우리 모임을 구체적으로 설명해주세요"
              />
            </S.DescriptionField>
          </S.Fields>

          {errorMessage && (
            <S.CreateMeetingErrorMessage role="alert">
              {errorMessage}
            </S.CreateMeetingErrorMessage>
          )}

          <S.SubmitButton
            type="submit"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? "개설 중..." : "이대로 모임 개설하기"}
          </S.SubmitButton>
        </S.ScrollableForm>
      </div>
      <S.DateTimeDialog ref={dateTimeDialog} aria-labelledby="meeting-date-time-title">
        <h2 id="meeting-date-time-title">모임 일시 선택</h2>
        <DatePicker
          inline
          selected={draftDateTime.date}
          onChange={(date) => updateDraftDateTime("date", date)}
        />
        <S.PeriodOptions>
          <legend>오전/오후</legend>
          {Object.entries(PERIODS).map(([period, label]) => (
            <S.TimeOption
              key={period}
              type="button"
              aria-pressed={draftDateTime.period === period}
              onClick={() => updateDraftDateTime("period", period)}
            >
              {label}
            </S.TimeOption>
          ))}
        </S.PeriodOptions>
        <S.TimeOptions>
          <legend>시</legend>
          {HOURS.map((hour) => (
            <S.TimeOption
              key={hour}
              type="button"
              aria-pressed={draftDateTime.hour === hour}
              onClick={() => updateDraftDateTime("hour", hour)}
            >
              {hour}시
            </S.TimeOption>
          ))}
        </S.TimeOptions>
        <S.TimeOptions>
          <legend>분</legend>
          {MINUTES.map((minute) => (
            <S.TimeOption
              key={minute}
              type="button"
              aria-pressed={draftDateTime.minute === minute}
              onClick={() => updateDraftDateTime("minute", minute)}
            >
              {minute}분
            </S.TimeOption>
          ))}
        </S.TimeOptions>
        <S.DateTimeActions>
          <Button variant="white" onClick={() => dateTimeDialog.current.close()}>
            취소
          </Button>
          <Button disabled={!canConfirmDateTime} onClick={confirmDateTime}>
            완료
          </Button>
        </S.DateTimeActions>
      </S.DateTimeDialog>
    </main>
  );
}
