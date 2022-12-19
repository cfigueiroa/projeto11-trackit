// import { IonIcon } from "@ionic/react";
// import { trashOutline, checkmark } from "ionicons/icons";
import useMyContext from "../../components/Context";
export default function Test() {
  const { user } = useMyContext();
  // Set the JWT
  const jwt = user.token;

  // Split the JWT into its three parts
  const [header, payload, signature] = jwt.split(".");

  // Base64-decode the header and payload
  const decodedHeader = JSON.parse(atob(header));
  const decodedPayload = JSON.parse(atob(payload));

  return (
    <div>
      <h1>JWT Debugger</h1>
      {`header: ${header}`} <br />
      {`decodedHeader : ${JSON.stringify(decodedHeader)}`} <br />
      {`payload: ${payload}`} <br />
      {`decodedPayload: ${JSON.stringify(decodedPayload)}`} <br />
      {`signature: ${signature}`}
    </div>
  );
}
