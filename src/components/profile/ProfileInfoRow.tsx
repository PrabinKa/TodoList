import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../context/ThemeContext';
import { getFontSize, rSpacing } from '../../utils';
import { colors } from '../../theme/colors';
import { IconName } from '../../types/icon';


interface ProfileInfoRowProps {
  icon: IconName;
  label: string;
  value?: string;
}

export const ProfileInfoRow: React.FC<ProfileInfoRowProps> = ({
  icon,
  label,
  value,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} color={colors.blue600} size={20} />
        </View>

        <Text style={[styles.label, { color: theme.textPrimary }]}>
          {label}
        </Text>
      </View>

      <Text style={[styles.value, { color: theme.textSecondary }]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rSpacing(10),
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rSpacing(10),
  },

  iconContainer: {
    backgroundColor: colors.blue100,
    padding: rSpacing(8),
    borderRadius: 6,
  },

  label: {
    fontSize: getFontSize(14),
    fontWeight: '700',
  },

  value: {
    fontSize: getFontSize(14),
    fontWeight: '700',
  },
});
