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
import { getFontSize, rSpacing, SecureStorage } from '../../utils';
import { LoginResponse, TLoginCredentials } from '../../types/login';
import { useForm, Controller } from 'react-hook-form';
import { login } from '../../services/api';
import { useMutation } from '@tanstack/react-query';
import { STORAGE_KEY } from '../../constants/keys';
import { useDispatch } from 'react-redux';
import { userDetailsActions } from '../../store/slice/userDetails';
import { navigationRef } from '../../utils/navigationRef';
import { useTheme } from '../../context/ThemeContext';
import Ionicons from '@react-native-vector-icons/ionicons';

interface LoginScreenProps {
  navigation?: any;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loginError, setLoginError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginCredentials>();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data: LoginResponse) => {
      const { accessToken, refreshToken, ...user } = data;

      // Store tokens in secure storage with encryption
      await SecureStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
      await SecureStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refreshToken);

      // Dispatch user details to reducer
      dispatch(userDetailsActions.setUserDetails(user));

      navigationRef.reset({
        index: 0,
        routes: [
          {
            name: 'AppScreen',
            state: {
              routes: [{ name: 'TodoList' }],
            },
          },
        ],
      });
    },
    onError: (error: any) => {
      setLoginError(error?.response?.data?.message);
    },
  });

  const onSubmit = (data: TLoginCredentials) => {
    mutation.mutate(data);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={{ alignItems: 'center', gap: rSpacing(50) }}>
              <Text
                style={[styles.welcomeTextStyles, { color: theme.textPrimary }]}
              >
                Welcome Back
              </Text>
              <View style={{gap: rSpacing(12), alignItems: 'center'}} >
                <View
                  style={{
                    backgroundColor: theme.primary,
                    padding: rSpacing(15),
                    borderRadius: 12,
                  }}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={25}
                    color="#FFF"
                  />
                </View>
                <View style={{gap: rSpacing(6), alignItems: 'center'}} >
                  <Text
                    style={{
                      color: theme.textPrimary,
                      fontSize: getFontSize(30),
                      fontWeight: '700',
                    }}
                  >
                    Login to Taskly
                  </Text>
                  <Text
                    style={{
                      color: theme.textSecondary,
                      fontSize: getFontSize(14),
                      fontWeight: '500',
                      textAlign: 'center'
                    }}
                  >
                    Enter your details to manage your daily tasks effortlessly.
                  </Text>
                </View>
              </View>
            </View>

            <View style={{marginTop: rSpacing(30)}} >
              <Controller
                control={control}
                name="username"
                rules={{
                  required: 'Username is required',
                }}
                render={({ field: { value, onChange } }) => (
                  <InputField
                    label="User Name"
                    value={value}
                    error={errors.username?.message}
                    placeholder="Enter your username"
                    onChangeText={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password is required',
                }}
                render={({ field: { value, onChange } }) => (
                  <InputField
                    label="Password"
                    value={value}
                    error={errors.password?.message}
                    placeholder="Enter password"
                    secureTextEntry={secureTextEntry}
                    showPasswordToggle
                    onTogglePassword={() =>
                      setSecureTextEntry(!secureTextEntry)
                    }
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
            {!!loginError && (
              <Text style={[styles.errorTextStyle, { color: theme.error }]}>
                {loginError}
              </Text>
            )}
            <ButtonComponent
              isLoading={mutation.isPending}
              label="Sign In"
              onPress={handleSubmit(onSubmit)}
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: rSpacing(20),
    paddingVertical: rSpacing(15),
  },
  welcomeTextStyles: {
    fontSize: getFontSize(16),
    fontWeight: 'bold',
  },
  errorTextStyle: {
    fontSize: getFontSize(12),
    fontWeight: 'bold',
    marginBottom: rSpacing(10),
  },
});
