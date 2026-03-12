import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { getFontSize, Haptics, rHeight, rSpacing } from '../../utils';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../../theme/colors';
import { ButtonComponent, InputField } from '../../components';
import { Controller, useForm } from 'react-hook-form';
import { TAddTodo } from '../../types/todo';
import { useAddTodo } from '../../services/hooks/useAddTodo';

interface AddTodoScreenProps {
  navigation: any;
}

const AddTodoScreen: React.FC<AddTodoScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddTodo>();

  const { mutate: addTodo, isPending } = useAddTodo();

  const onSubmit = (data: TAddTodo) => {
    Haptics.impact('heavy');
    addTodo(
      { todo: data.todo },
      {
        onSuccess: () => {
          navigation.navigate('TodoList');
        },
      },
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View
        style={[styles.headerContainer, { backgroundColor: theme.background }]}
      >
        <Pressable
          style={[styles.backButton, { backgroundColor: theme.border }]}
          onPress={() => {
            navigation.goBack();
            Haptics.impact('medium');
          }}
        >
          <Ionicons name="close-sharp" size={20} color={theme.textPrimary} />
        </Pressable>

        <Text style={[styles.headerStyles, { color: theme.textPrimary }]}>
          New Task
        </Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={[styles.titleStyles, { color: theme.textPrimary }]}>
          What's on your <Text style={{ color: colors.blue400 }}>mind</Text>{' '}
          today?
        </Text>
        <Text style={[styles.subTitleStyles, { color: theme.textSecondary }]}>
          Small steps lead to big goals.
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: rSpacing(20),
          marginVertical: rSpacing(20),
        }}
      >
        <Controller
          control={control}
          name="todo"
          rules={{
            required: 'Task is required.',
          }}
          render={({ field: { value, onChange } }) => (
            <InputField
              label="TASK TITLE"
              multiline
              numberOfLines={4}
              value={value}
              error={errors.todo?.message}
              placeholder="I want to..."
              onChangeText={onChange}
            />
          )}
        />
        <ButtonComponent
          icon="arrow-forward"
          label="Create Task"
          isLoading={isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rSpacing(20),
    height: rHeight(56),
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    padding: rSpacing(5),
    borderRadius: 15,
    left: rSpacing(20),
  },
  headerStyles: {
    fontSize: getFontSize(16),
    fontWeight: '700',
    textAlign: 'center',
  },
  titleStyles: {
    fontSize: getFontSize(32),
    fontWeight: 'bold',
    paddingHorizontal: rSpacing(20),
  },
  subTitleStyles: {
    fontSize: getFontSize(14),
    fontWeight: '500',
    paddingHorizontal: rSpacing(20),
  },
  titleWrapper: {
    marginVertical: rSpacing(10),
    gap: rSpacing(5),
  },
});
