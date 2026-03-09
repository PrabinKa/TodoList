import { Toast } from "toastify-react-native";

type ToastType = "success" | "error" | "info" | "warn";

export const showToast = (type: ToastType, message: string) => {
  switch (type) {
    case "success":
      Toast.success(message);
      break;

    case "error":
      Toast.error(message);
      break;

    case "warn":
      Toast.warn(message);
      break;

    case "info":
      Toast.info(message);
      break;
  }
};