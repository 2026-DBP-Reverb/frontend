import styled from "styled-components";
import { labelText, text1 } from "../styles/typography";

export default function TrackItem({
                                    imageUrl,
                                    trackName,
                                    artistName,
                                    buttonVisible = true,
                                    selected = false,
                                    onButtonClick,
                                    showDivider = true,
                                  }) {
  return (
    <Item>
      <Content>
        <AlbumImage src={imageUrl} alt={`${trackName} 앨범 커버`}/>

        <TrackInfo>
          <TrackTitle>{trackName}</TrackTitle>
          <ArtistName>{artistName}</ArtistName>
        </TrackInfo>

        {buttonVisible && (
          <IconButton
            type="button"
            onClick={onButtonClick}
            aria-label={selected ? `${trackName} 선택 해제` : `${trackName} 추가`}
          >
            <Icon
              src={
                selected
                  ? "/images/CheckBurgundy.svg"
                  : "/images/Add.svg"
              }
              alt=""
              aria-hidden="true"
            />
          </IconButton>
        )}
      </Content>

      {showDivider && <Divider/>}
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 8px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const AlbumImage = styled.img`
  width: 88px;
  height: 88px;
  flex: 0 0 88px;
  border-radius: 8px;
  object-fit: cover;
`;

const TrackInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  flex: 1 0 0;
`;

const TrackTitle = styled.p`
  align-self: stretch;
  width: 100%;
  color: var(--Black, #171717);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${text1};
`;

const ArtistName = styled.p`
  align-self: stretch;
  width: 100%;
  color: var(--Slate-Blue);
  ${labelText};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const IconButton = styled.button`
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const Icon = styled.img`
  display: block;
  width: 24px;
  height: 24px;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background: var(--Gray);
`;