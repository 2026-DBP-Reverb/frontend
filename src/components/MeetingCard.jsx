import styled from "styled-components";
import { Link } from 'react-router-dom';
import { labelText, text1 } from "../styles/typography";

const Card = styled(Link)`
    position: relative;
    flex: 0 0 200px;
    width: 200px;
    height: 160px;
    overflow: hidden;
    border-radius: 8px;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
        background: linear-gradient(
                180deg,
                rgba(23, 23, 27, 0.15) 0%,
                rgba(23, 23, 27, 0.8) 100%
        );
        pointer-events: none;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    color: inherit;
    text-decoration: none;
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: 8px;
    user-select: none;
    pointer-events: none;
`;

const CardInfo = styled.div`
    ${ text1 };
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: 15px;
    left: 0;

    display: flex;
    box-sizing: border-box;
    padding: 0 15px;
    justify-content: space-between;
    align-items: center;

    color: var(--White, #fafafa);
`;

const Title = styled.span`
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: normal;
`;

const MemberCount = styled.span`
    ${ labelText };
    flex-shrink: 0;
    white-space: nowrap;
    line-height: normal;
`;

export default function MeetingCard({
                                      id,
                                      title,
                                      image,
                                      currentMembers,
                                      maxMembers,
                                    }) {
  return (
    <Card to={`/meetings/${id}`} draggable="false">
      <CardImage src={ image } alt="" draggable="false"/>
      <CardInfo>
        <Title>{ title }</Title>
        <MemberCount>
          ({ currentMembers }명 / { maxMembers }명)
        </MemberCount>
      </CardInfo>
    </Card>
  );
}
