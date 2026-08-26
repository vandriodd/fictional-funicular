import { useRouter } from "expo-router";

import { SheetScaffold } from "@/components/ui/sheet-scaffold";
import { Colors } from "@/constants/theme";

export default function LogOutSheet() {
  const router = useRouter();

  const logOut = () => {
    if (router.canDismiss()) {
      router.dismissAll();
    }
    router.replace("/");
  };

  return (
    <SheetScaffold
      title="Log out?"
      actionLabel="Yes, log me out"
      onAction={logOut}
      actionColor={Colors.danger}
      actionPressedColor={Colors.dangerPressed}
    />
  );
}
