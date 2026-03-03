import { colors } from './colors';

export const lightTheme = {
  mode: "light",

  background: colors.gray50,
  surface: colors.white,
  card: colors.white,

  textPrimary: colors.gray900,
  textSecondary: colors.gray500,

  border: colors.gray200,

  primary: colors.blue600,
  success: colors.success500,
  warning: colors.warning500,
  error: colors.error500,

  skeletonBase: colors.gray200,
  skeletonHighlight: colors.gray100,
};

export const darkTheme = {
  mode: "dark",

  background: colors.gray900,
  surface: colors.gray800,
  card: colors.gray800,

  textPrimary: colors.gray50,
  textSecondary: colors.gray400,

  border: colors.gray700,

  primary: colors.blue400,
  success: colors.success500,
  warning: colors.warning500,
  error: colors.error500,

  skeletonBase: colors.gray800,
  skeletonHighlight: colors.gray700,
};
