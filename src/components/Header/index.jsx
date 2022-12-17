import styled from "styled-components";
import useMyContext from "../../components/Context";

export default function Header() {
  const { user, setUser } = useMyContext();
  return <Container>
    <p>TrackIt</p>
    <img src={user.image} alt="teste"/>
  </Container>;
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
        font-family: 'Playball', cursive;
        font-size: 39px;
        color: #fff;
    }
    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
`;


