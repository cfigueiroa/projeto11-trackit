import styled from "styled-components";
import useMyContext from "../../components/Context";
import { IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";

export default function Header() {
  const { user } = useMyContext();
  function logmeout() {
    localStorage.removeItem('token');
    window.location.reload(true);
  }

  return (
    <Container>
      <p>TrackIt</p>
      <div>
      <IonIcon icon={logOutOutline} onClick={logmeout} size="large" />
        <img src={user.image} alt="Imagem de perfil" />
      </div>
    </Container>
  );
}

export const Container = styled.div`
  min-height: 70px;
  background-color: #126ba5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  p {
    font-family: "Playball", cursive;
    font-size: 39px;
    color: #fff;
  }
  img {
    width: 51px;
    height: 51px;
    border-radius: 50%;
  }
  div{
    display: flex;
    color: #fff;
    gap: 10px;
    align-items: center;
  }
`;
