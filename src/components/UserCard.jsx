import styled from "styled-components";
import { Link } from 'react-router-dom';
import { labelText, text1 } from "../styles/typography";
import BaseProfileImage from './ProfileImage';

const Card = styled(Link)`
    color: inherit;
    text-decoration: none;
    display: flex;
    height: 108px;
    width: 100%;
    padding: 8px 10px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
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
    width: 100%;
    min-width: 0;
    height: 20px;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
`;

const ProfileImage = styled(BaseProfileImage)`
    border-radius: 50%;
    object-fit: cover;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
`;

const Name = styled.span`
    ${ text1 };
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: normal;
    color: var(--Black, #17171B);
`;

const TagList = styled.div`
    ${ labelText };
    color: var(--Slate-Blue, #48535C);
    display: flex;
    flex-direction: column;
    gap: -2px;
    line-height: 110%;
`;

const MatchRate = styled.span`
    ${ labelText };
    line-height: normal;
    color: var(--Black, #17171b);
`;

export default function UserCard({
                                   id,
                                   name,
                                   profileImage,
                                   favoriteArtists,
                                   matchRate,
                                 }) {
  return (
    <Card to={`/findmates/${id}`}>
      <Profile>
        <ProfileImage src={ profileImage }/>
        <Name>{ name }</Name>
      </Profile>
      <TagList>
        { favoriteArtists.map((artist) => (
          <span key={ artist }>#{ artist }</span>
        )) }
      </TagList>

      <MatchRate>일치율 { matchRate }%</MatchRate>
    </Card>
  );
}
