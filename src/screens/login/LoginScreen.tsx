import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonComponent, InputField } from '../../components';
import { colors } from '../../theme/colors';
import { getFontSize, rSpacing } from '../../utils';
import { getUsersList } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../types/users';
import { generateAccessToken } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { tokenActions } from '../../store/slice/token';
import { userDetailsActions } from '../../store/slice/userDetails';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsersList,
  });

  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (key: keyof typeof loginCredentials, value: string) => {
    setLoginCredentials(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = (): boolean => {
    const { email, password } = loginCredentials;

    if (!email.trim() || !password.trim()) {
      setError('Both email and password fields are required.');
      return false;
    }

    if (!data) {
      setError('Users data not loaded yet.');
      return false;
    }

    return true;
  };

const handleLogin = () => {
  setError('');

  if (!validateForm()) return;

  const matchedUser = data!.find(
    (user: User) =>
      user.email.toLowerCase() ===
      loginCredentials.email.trim().toLowerCase(),
  );

  if (!matchedUser) {
    setError('Your credentials do not match, please try again.');
    return;
  }

  const accessToken = generateAccessToken(40);

  // Dispatch token
  dispatch(tokenActions.setAccessToken(accessToken));

  // Dispatch matched user object
  dispatch(userDetailsActions.setUserDetails(matchedUser));

  navigation.navigate('Auth');
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeTextStyles}>
        Welcome back, please signin to continue
      </Text>

      <View>
        <InputField
          label="Email"
          placeholder="Enter your email"
          onChangeText={(text: string) => handleChange('email', text)}
        />

        <InputField
          label="Password"
          placeholder="Enter password"
          secureTextEntry
          onChangeText={(text: string) => handleChange('password', text)}
        />
      </View>

      {!!error && <Text style={styles.errorTextStyles}>{error}</Text>}

      <ButtonComponent
        label="Sign In"
        isLoading={isLoading}
        onPress={handleLogin}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: rSpacing(20),
    paddingVertical: rSpacing(15),
    gap: 20,
  },
  welcomeTextStyles: {
    fontSize: getFontSize(20),
    fontWeight: '500',
    color: colors.grayDark,
  },
  errorTextStyles: {
    fontSize: getFontSize(14),
    color: colors.error,
  },
});
