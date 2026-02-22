import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonComponent, InputField } from '../../components';
import { colors } from '../../theme/colors';
import { getFontSize, rSpacing } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { User } from '../../types/users';
import { generateAccessToken } from '../../utils/auth';
import { tokenActions } from '../../store/slice/token';
import { userDetailsActions } from '../../store/slice/userDetails';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  // Users list
  const usersList = useSelector(
    (state: RootState) => state.usersList.usersList,
  );
  const [isLoginLoading, setIsLoginLoading] = useState(false);

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

    return true;
  };

const handleLogin = () => {
  setError('');
  setIsLoginLoading(true);

  if (!validateForm()) {
    setIsLoginLoading(false);
    return;
  }

  try {
    const matchedUser = usersList.find(
      (user: User) =>
        user.email.toLowerCase() === loginCredentials.email.trim().toLowerCase()
    );

    if (!matchedUser) {
      setError('Your credentials do not match, please try again.');
      return;
    }

    // Generate access token
    const accessToken = generateAccessToken(40);

    // Dispatch to Redux slices
    dispatch(tokenActions.setAccessToken(accessToken));
    dispatch(userDetailsActions.setUserDetails(matchedUser));

    // Navigate to authenticated stack
    navigation.replace('Auth');
  } catch (err) {
    console.error('Login error:', err);
    setError('Something went wrong. Please try again.');
  } finally {
    setIsLoginLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.welcomeTextStyles}>
              Welcome back, please signin to continue
            </Text>

            <View>
              <InputField
                label="Email"
                value={loginCredentials.email}
                placeholder="Enter your email"
                onChangeText={(text: string) => handleChange('email', text)}
              />

              <InputField
                label="Password"
                value={loginCredentials.password}
                placeholder="Enter password"
                secureTextEntry
                onChangeText={(text: string) => handleChange('password', text)}
              />
            </View>

            {!!error && <Text style={styles.errorTextStyles}>{error}</Text>}

            <ButtonComponent
              label="Sign In"
              isLoading={isLoginLoading}
              onPress={handleLogin}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: rSpacing(20),
    paddingVertical: rSpacing(15),
  },
  welcomeTextStyles: {
    fontSize: getFontSize(20),
    fontWeight: '500',
    color: colors.grayDark,
    marginBottom: rSpacing(40),
  },
  errorTextStyles: {
    fontSize: getFontSize(14),
    color: colors.error,
    marginBottom: rSpacing(10),
  },
});
