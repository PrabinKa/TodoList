import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFontSize, rSpacing } from '../../utils';
import { colors } from '../../theme/colors';
import Ionicons from '@react-native-vector-icons/ionicons';

interface TodoHeaderProps {
  title: string;
  subtitle: string;
  onLogout: () => void;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({
  title,
  subtitle,
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Ionicons name="exit-outline" size={30} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default TodoHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: rSpacing(10),
    paddingHorizontal: rSpacing(20),
    backgroundColor: colors.primary,
  },
  textContainer: {
    gap: rSpacing(5),
  },
  title: {
    fontSize: getFontSize(18),
    color: colors.grayDark,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: getFontSize(14),
    color: colors.grayDark,
  },
  logoutButton: {
    backgroundColor: colors.blueDark,
    paddingHorizontal: rSpacing(8),
    paddingVertical: rSpacing(5),
    borderRadius: 8,
  },
});
