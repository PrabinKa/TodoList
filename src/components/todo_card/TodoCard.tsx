import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getFontSize, rSpacing } from '../../utils';
import { Todo } from '../../types/todo';
import Skeleton from 'react-native-reanimated-skeleton';
import { useTheme } from '../../context/ThemeContext';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useUpdateTodo } from '../../services/hooks/useUpdateTodo';

interface TodoCardProps {
  item: Todo;
  isLoading: boolean;
}

export const TodoCard: React.FC<TodoCardProps> = ({ item, isLoading }) => {
  const { theme } = useTheme();
  const { mutate: updateTodo, isPending } = useUpdateTodo();

  const handleToggleTodo = () => {
    updateTodo({
      id: item.id,
      isCompleted: !item.completed,
    });
  };

  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: '#000',
        },
      ]}
    >
      <Skeleton
        isLoading={isLoading}
        containerStyle={{ flex: 1 }}
        layout={[
          // Top Row
          {
            key: 'checkbox',
            width: 22,
            height: 22,
            borderRadius: 11,
            marginBottom: rSpacing(14),
          },
          {
            key: 'title',
            width: '75%',
            height: 18,
            marginLeft: 32,
            marginTop: -36,
            borderRadius: 6,
            marginBottom: rSpacing(16),
          },

          // Bottom Row
          {
            key: 'statusBadge',
            width: 90,
            height: 20,
            borderRadius: 20,
            marginLeft: 10,
          },
          {
            key: 'menu',
            width: 5,
            height: 18,
            borderRadius: 4,
            alignSelf: 'flex-end',
            marginTop: -20,
          },
        ]}
      >
        <View style={{ gap: rSpacing(14) }}>
          {/* Top Row */}
          <View style={styles.topRow}>
            <CheckBox
              value={item.completed}
              disabled={isPending}
              boxType="circle"
              onValueChange={handleToggleTodo}
              tintColors={{
                true: theme.success,
                false: theme.border,
              }}
              onFillColor={theme.success}
              onCheckColor={'#FFF'}
            />

            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color: theme.textPrimary,
                    textDecorationLine: item.completed
                      ? 'line-through'
                      : 'none',
                    opacity: item.completed ? 0.6 : 1,
                  },
                ]}
                numberOfLines={3}
              >
                {item.todo}
              </Text>
            </View>
          </View>

          {/* Bottom Row */}
          <View style={styles.statusRow}>
            <View style={styles.statusLeft}>
              <Ionicons
                name={item.completed ? 'checkmark-circle' : 'time-outline'}
                size={20}
                color={item.completed ? theme.success : theme.warning}
              />

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: item.completed
                      ? theme.success + '20'
                      : theme.warning + '20',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: item.completed ? theme.success : theme.warning,
                    },
                  ]}
                >
                  {item.completed ? 'Done' : 'In Progress'}
                </Text>
              </View>
            </View>

            <Pressable style={styles.menuButton}>
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={theme.textSecondary}
              />
            </Pressable>
          </View>
        </View>
      </Skeleton>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: rSpacing(18),
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: rSpacing(14),

    // Elevation
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },

  topRow: {
    flexDirection: 'row',
    gap: rSpacing(8),
    alignItems: 'flex-start',
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: getFontSize(16),
    fontWeight: '600',
    lineHeight: 22,
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: rSpacing(7),
  },

  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rSpacing(8),
  },

  statusBadge: {
    paddingHorizontal: rSpacing(10),
    paddingVertical: rSpacing(4),
    borderRadius: 20,
  },

  statusText: {
    fontSize: getFontSize(12),
    fontWeight: '600',
  },

  menuButton: {
    padding: rSpacing(4),
  },
});
