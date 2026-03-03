import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { getFontSize, rHeight, rSpacing } from '../../utils';
import { useTheme } from '../../context/ThemeContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import { IconName } from '../../types/icon';

interface ButtonComponentProps {
  label: string;
  isLoading?: boolean;
  onPress: () => void;
  icon?: IconName;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconColor?: string;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  isLoading,
  onPress,
  icon,
  containerStyle,
  textStyle,
  iconColor,
}) => {
  const { buttonContainer, buttonDisabled, buttonText } = styles;
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[
        buttonContainer,
        isLoading && buttonDisabled,
        { backgroundColor: theme.primary },
        containerStyle,
      ]}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.9}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={iconColor || colors.gray50}
        />
      )}
      {isLoading ? (
        <ActivityIndicator color={theme.textPrimary} size="small" />
      ) : (
        <Text style={[buttonText, textStyle || {color: colors.gray50}]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: rHeight(56),
    borderRadius: rSpacing(12),
    flexDirection: 'row',
    gap: rSpacing(8),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: getFontSize(16),
    fontWeight: '700',
  },
});
