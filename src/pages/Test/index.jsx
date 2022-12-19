import { IonIcon } from "@ionic/react";
import { trashOutline, checkmark } from "ionicons/icons";

export default function Test() {
  return (
    <div>
      Test
        <IonIcon icon={checkmark} />
        <IonIcon icon={trashOutline} />
    </div>
  );
}
