import { ToastManagerProps } from "toastify-react-native/utils/interfaces";

export const getToastConfig = (theme: any): Partial<ToastManagerProps> => {
  return {
    position: "top",
    duration: 3000,
    width: "90%",
    animationStyle: "fade",

    textStyle: {
      color: theme.textPrimary,
      fontSize: 14,
      fontWeight: "500",
    },

    style: {
      backgroundColor: theme.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },
  };
};