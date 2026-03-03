import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getFontSize, rSpacing } from '../../utils';
import { useTheme } from '../../context/ThemeContext';
import { store } from '../../store/store';

interface TodoHeaderProps {
  title: string;
  subtitle: string;
  onPress: () => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({
  title,
  subtitle,
  onPress,
}) => {
  const { theme } = useTheme();
  const { userDetails } = store.getState();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.profileSection, { backgroundColor: theme.card }]}
        onPress={onPress}
      >
        <Image
          source={{ uri: userDetails.userDetails?.image }}
          resizeMode="cover"
          style={{ height: '100%', width: '100%' }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: rSpacing(10),
    paddingHorizontal: rSpacing(20),
  },
  textContainer: {
    gap: rSpacing(2),
  },
  title: {
    fontSize: getFontSize(26),
    fontWeight: '600',
  },
  subtitle: {
    fontSize: getFontSize(12),
  },
  profileSection: {
    height: 40,
    width: 40,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 1,
  },
});
