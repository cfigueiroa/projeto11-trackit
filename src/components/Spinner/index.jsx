import styled from "styled-components";
import { InfinitySpin } from "react-loader-spinner";

export default function Spinner() {
  return (
    <SyledSpinner>
      <InfinitySpin width="200" color="#126ba5" />
    </SyledSpinner>
  );
}

const SyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
