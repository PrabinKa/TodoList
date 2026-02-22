import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { colors } from '../../theme/colors';
import { getFontSize, rSpacing } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { getUsersList } from '../../services/api';
import { usersListActions } from '../../store/slice/usersList';
import { User } from '../../types/users';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.token.accessToken);

  // Fetch users list
  const { data: users, isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsersList,
  });

  console.log('user list data:', users)
  console.log('is error:', isError)

  // Save users to Redux when loaded
  useEffect(() => {
    if (users && users.length > 0) {
      dispatch(usersListActions.setUsersList(users));
    }
  }, [users, dispatch]);

  // Navigate when data is loaded
  useEffect(() => {
    if (!isLoading) {
      if (accessToken) {
        navigation.replace('Auth');
      } else {
        navigation.replace('UnAuth');
      }
    }
  }, [isLoading, accessToken, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My App</Text>
        <ActivityIndicator
          size="large"
          color={colors.blueDark}
          style={styles.loader}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: getFontSize(24),
    fontWeight: '700',
    marginBottom: rSpacing(20),
    color: colors.grayDark,
  },
  loader: {
    marginTop: rSpacing(10),
  },
  errorText: {
    marginTop: rSpacing(10),
    color: colors.error,
    fontSize: getFontSize(14),
  },
});