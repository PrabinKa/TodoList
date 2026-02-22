import React, { useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getTodoList } from '../../services/api';
import { Todo } from '../../types/todo';
import { colors } from '../../theme/colors';
import { getFontSize, rSpacing } from '../../utils';

const TodoListScreen = () => {
  const {
    data: todos,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getTodoList,
  });

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.status}>
          {item.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>
    ),
    [],
  );

  if (isLoading || isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Todos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
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
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  itemContainer: {
    padding: rSpacing(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
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
});
