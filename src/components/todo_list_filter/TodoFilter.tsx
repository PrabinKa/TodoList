import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFontSize, Haptics, rSpacing } from '../../utils';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/colors';

type FilterType = 'all' | 'completed' | 'pending';

interface TodoFilterProps {
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filterType,
  onFilterChange,
}) => {
  const { theme } = useTheme();
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {filters.map(filter => {
        const isActive = filterType === filter.value;
        return (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.button,
              {
                backgroundColor: isActive
                  ? theme.primary
                  : colors.gray200,
              },
            ]}
            onPress={() => {
              onFilterChange(filter.value);
              Haptics.impact('medium');
            }}
          >
            <Text
              style={[
                styles.text,
                { color: isActive ? colors.gray50 : theme.textSecondary },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: rSpacing(10),
    paddingVertical: rSpacing(10),
    paddingHorizontal: rSpacing(20),
  },
  button: {
    paddingHorizontal: rSpacing(16),
    paddingVertical: rSpacing(6),
    borderRadius: 30,
  },
  text: {
    fontSize: getFontSize(14),
    fontWeight: '500',
  },
});
