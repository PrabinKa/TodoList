import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getFontSize, rSpacing } from '../../utils';
import { colors } from '../../theme/colors';
import { IconName } from '../../types/icon';

interface SettingButtonProps {
  label: string;
  icon: IconName;
  onPress: () => void;
  isActive: boolean;
}

export const SettingsButton: React.FC<SettingButtonProps> = ({
  label,
  icon,
  onPress,
  isActive,
}) => {
  const { isDarkMode, theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? theme.card
            : colors.blue100,
        },
      ]}
    >
      <View style={styles.leftSection}>
        <Ionicons
          name={icon}
          size={20}
          color={theme.textSecondary}
        />

        <Text
          style={[
            styles.label,
            { color: theme.textSecondary },
          ]}
        >
          {label}
        </Text>
      </View>

      <Ionicons
        name={
          isActive
            ? 'radio-button-on-outline'
            : 'radio-button-off-outline'
        }
        size={20}
        color={
          isActive
            ? theme.primary
            : theme.textSecondary
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: rSpacing(14),
    borderRadius: 12,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rSpacing(8),
  },

  label: {
    fontSize: getFontSize(14),
    fontWeight: '600',
  },
});