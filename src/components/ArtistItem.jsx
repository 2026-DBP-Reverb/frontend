import styled from "styled-components";
import { text2 } from "../styles/typography";

export default function ArtistItem({
                                     imageUrl,
                                     name,
                                     buttonVisible = true,
                                     selected = false,
                                     onButtonClick,
                                     showDivider = true,
                                   }) {
  return (
    <Item>
      <Content>
        <Image src={imageUrl} alt={`${name} 프로필`}/>
        <Name>{name}</Name>
        {buttonVisible && (
          <IconButton
            type="button"
            onClick={onButtonClick}
            aria-label={selected ? `${name} 선택 해제` : `${name} 추가`}
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
};

const Item = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  padding: 0 8px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const Image = styled.img`
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.div`
  width: 100%;
  color: var(--Black);
  white-space: nowrap;
  text-overflow: ellipsis;
  ${text2};
`;

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: var(--Gray);
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
`;
