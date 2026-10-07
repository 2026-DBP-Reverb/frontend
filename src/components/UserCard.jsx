import styled from "styled-components";
import { labelText, text1Bold } from "../styles/typography";

const Card = styled.div`
  display: flex;
  width: 100%;
  height: 108px;
  padding: 0 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  flex: 1 0 0;

  border: 0.5px solid var(--Gray, #bdbdbd);
  border-radius: 8px;
  background: var(--White, #fafafa);
  cursor: pointer;
  transition: border-color 150ms ease;

  &:hover {
    border-color: var(--Slate-Blue, #48535c);
  }
`;

const Profile = styled.div`
  display: flex;
  width: 87px;
  height: 20px;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

const Name = styled.span`
  ${text1Bold};
  color: var(--Black, #17171B);
`;

const TagList = styled.div`
  ${labelText};
  color: var(--Slate-Blue, #48535C);
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MatchRate = styled.span`
  ${labelText};
  color: var(--Black, #17171b);
`;

export default function UserCard({
                                   name,
                                   profileImage,
                                   favoriteArtists,
                                   matchRate,
                                 }) {
  return (
    <Card>
      <Profile>
        <ProfileImage src={profileImage}/>
        <Name>{name}</Name>
      </Profile>
      <TagList>
        {favoriteArtists.map((artist) => (
          <span key={artist}>#{artist}</span>
        ))}
      </TagList>

      <MatchRate>일치율 {matchRate}%</MatchRate>
    </Card>
  );
}
