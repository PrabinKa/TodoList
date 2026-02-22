import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { getFontSize, rSpacing } from '../../utils';

type FilterType = 'all' | 'completed' | 'pending';

interface TodoFilterProps {
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filterType, onFilterChange }) => {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
  ];

  return (
    <View style={styles.container}>
      {filters.map(filter => {
        const isActive = filterType === filter.value;
        return (
          <TouchableOpacity
            key={filter.value}
            style={[styles.button, isActive && styles.buttonActive]}
            onPress={() => onFilterChange(filter.value)}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TodoFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: rSpacing(10),
    paddingVertical: rSpacing(10),
    paddingHorizontal: rSpacing(20)
  },
  button: {
    paddingHorizontal: rSpacing(16),
    paddingVertical: rSpacing(5),
    borderRadius: 20,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.grayMedium,
  },
  buttonActive: {
    backgroundColor: colors.grayDark,
  },
  text: {
    fontSize: getFontSize(14),
    color: colors.grayDark,
    fontWeight: '500',
  },
  textActive: {
    color: colors.primary,
  },
});