import styled from "styled-components";
import { text1, title2 } from "../styles/typography";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  display: flex;
  padding: 12px 8px;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  aspect-ratio: 1/1;
  border-radius: 65536px;
`;

const Info = styled.div`
  display: flex;
  width: 216px;
  padding: 8px 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Name = styled.div`
  align-self: stretch;
  color: var(--Black, #17171B);
  ${title2};
`;

const InstagramId = styled.div`
  align-self: stretch;
  color: var(--Black, #17171B);
  margin: 0;
  ${text1};
`;

const TextButton = styled(Button)`
  ${text1};
  height: 32px;
`;

export default function ProfileCard({
                                      name,
                                      profileImage,
                                      instagramId,
                                      buttonText
                                    }) {
  const navigate = useNavigate();

  return (
    <Card>
      <ProfileImage src={profileImage}/>
      <Info>
        <Name>
          {name}
        </Name>
        <InstagramId>
          Instagram @{instagramId?.trim() ? instagramId : "설정되지 않음"}
        </InstagramId>
        <TextButton
          variant="white"
          style={{height: "32px"}}
          onClick={() => navigate("/edit-profile")}
        >
          {buttonText}
        </TextButton>
      </Info>
    </Card>
  );
};
