import React, { useCallback, useState, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Text,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTodoList } from '../../services/api';
import { Todo, TodoListResponse } from '../../types/todo';
import { getFontSize, rSpacing, scheduleTodoReminder } from '../../utils';
import { TodoCard, TodoFilter, TodoHeader } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import { FooterSkeleton } from './FooterSkeleton';

interface TodoListScreenProps {
  navigation: any;
}

type FilterType = 'all' | 'completed' | 'pending';

const limit = 10;

const TodoListScreen: React.FC<TodoListScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(today);

  const [filterType, setFilterType] = useState<FilterType>('all');
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['todos'],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      getTodoList({
        limit,
        skip: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.length * limit;

      if (totalLoaded >= lastPage.total) {
        return undefined; // no more pages
      }

      return totalLoaded; // next skip value
    },
  });

  const renderItem: ListRenderItem<Todo> = useCallback(
    ({ item }) => (
      <TodoCard isLoading={isFetching && !isFetchingNextPage} item={item} />
    ),
    [isFetching, isFetchingNextPage],
  );

  const todosList = useMemo(
    () => data?.pages.flatMap((page: TodoListResponse) => page.todos) ?? [],
    [data?.pages],
  );

  // Filter the list of data
  const filteredTodos = useMemo(() => {
    if (filterType === 'all') {
      return todosList;
    }
    return todosList.filter(todo =>
      filterType === 'completed' ? todo.completed : !todo.completed,
    );
  }, [todosList, filterType]);

  // Shows loader when loading and data not found message when empty
  const renderEmptyComponent = () => {
    if (isLoading) {
      return <FooterSkeleton itemLength={6} />;
    }

    if (!isLoading && filteredTodos.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No {filterType === 'all' ? '' : filterType} todos found
          </Text>
        </View>
      );
    }

    return null;
  };

  useEffect(() => {
    scheduleTodoReminder(
      '1234383737',
      'Testing native local notification handler',
      Date.now() + 60000,
    );
  }, []);

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View
        style={[
          styles.headerWrapper,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <TodoHeader
          title="My Tasks"
          subtitle={formattedDate}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />

        <TodoFilter filterType={filterType} onFilterChange={setFilterType} />
      </View>
      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isFetchingNextPage && !isLoading}
            onRefresh={refetch}
          />
        }
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        contentContainerStyle={styles.flatListContent}
        ListFooterComponent={isFetchingNextPage ? <FooterSkeleton /> : null}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    borderBottomWidth: 2,
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
    paddingVertical: rSpacing(20),
    gap: rSpacing(7),
    paddingHorizontal: rSpacing(20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: rSpacing(50),
  },
  emptyText: {
    fontSize: getFontSize(16),
    textAlign: 'center',
  },
});
