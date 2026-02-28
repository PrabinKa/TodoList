import React, { useCallback, useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getTodoList } from '../../services/api';
import { Todo, TodoListResponse } from '../../types/todo';
import { colors } from '../../theme/colors';
import { getFontSize, logout, rSpacing } from '../../utils';
import { TodoCard, TodoFilter, TodoHeader } from '../../components';

interface TodoListScreenProps {
  navigation: any;
}

type FilterType = 'all' | 'completed' | 'pending';

const TodoListScreen: React.FC<TodoListScreenProps> = ({ navigation }) => {
  const [filterType, setFilterType] = useState<FilterType>('all');

  const { data, isLoading, isFetching, refetch } = useQuery<TodoListResponse>({
    queryKey: ['todos'],
    queryFn: getTodoList,
  });

  console.log('TOODDDO:', data);

  const filteredTodos = useMemo(() => {
    if (!data) {
      return [];
    }

    const { todos } = data;

    if (!todos) return [];
    switch (filterType) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [data, filterType]);

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => <TodoCard item={item} />,
    [],
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.headerWrapper}>
        <TodoHeader
          title="Your Todo Playground"
          subtitle="Add your tasks and stay productive today"
          onLogout={() => logout()}
        />

        <TodoFilter filterType={filterType} onFilterChange={setFilterType} />
      </View>

      {isLoading || isFetching ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading Todos...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          windowSize={10}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
            />
          }
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </SafeAreaView>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerWrapper: {
    backgroundColor: colors.primary,
    borderBottomColor: colors.grayMedium,
    borderBottomWidth: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: rSpacing(20),
    fontSize: getFontSize(16),
  },
  flatListContent: {
    paddingVertical: rSpacing(10),
    gap: rSpacing(20),
    paddingHorizontal: rSpacing(20),
  },
});
