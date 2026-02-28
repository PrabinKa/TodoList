import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getFontSize, rSpacing } from '../../utils';
import { colors } from '../../theme/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Todo } from '../../types/todo';

interface TodoCardProps {
  item: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.todo}</Text>
      {item.completed && (
        <View
          style={{
            flexDirection: 'row',
            gap: rSpacing(10),
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.status}>Completed</Text>
        </View>
      )}
      {!item.completed && (
        <View
          style={{
            flexDirection: 'row',
            gap: rSpacing(10),
            alignItems: 'center',
          }}
        >
          <Ionicons name="timer-outline" size={20} color={colors.error} />
          <Text style={styles.status}>Pending</Text>
        </View>
      )}
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  itemContainer: {
    padding: rSpacing(15),
    borderWidth: 1,
    borderColor: colors.grayMedium,
    borderRadius: 12,
  },
  title: {
    fontSize: getFontSize(16),
    fontWeight: '500',
    color: colors.blueDark,
  },
  status: {
    fontSize: getFontSize(14),
    color: colors.grayDark,
    marginTop: 5,
  },
});
