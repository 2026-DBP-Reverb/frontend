import styled from "styled-components";
import { text1Bold } from "../styles/typography";
import { labelText } from "../styles/typography";

const Card = styled.div`
  display: flex;
  width: 100%
  height: 108px;
  padding: 0 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
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
  align-items: center;
  gap: 4px;
  margin-top: 7px;
`;

const ProfileImage = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.span`
  ${text1Bold}
  overflow: hidden;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TagList = styled.div`
  ${labelText}
  margin-top: -2px;
  display: flex;
  flex-direction: column;
  color: var(--Slate-Blue, #48535c);
  line-height: 1.35;
`;

const MatchRate = styled.span`
  ${labelText}
  margin-top: -5px;
  margin-bottom: 5px;
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
        <ProfileImage src={profileImage} />
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
