import NativeHaptics from "../../../specs/NativeHaptics";

export type ImpactStyle = 'light' | 'medium' | 'heavy' | 'soft' | 'rigid';
export type NotificationType = 'success' | 'warning' | 'error';

interface HapticsInterface {
  impact: (style?: ImpactStyle) => void;
  notification: (type?: NotificationType) => void;
}

export const Haptics: HapticsInterface = {
  impact: (style = 'medium') => {
    
    NativeHaptics?.impact(style);
  },

  notification: (type = 'success') => {
    NativeHaptics?.notification(type);
  },
};