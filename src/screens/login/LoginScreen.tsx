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
import { getFontSize, rSpacing, SecureStorage } from '../../utils';
import { TLoginCredentials } from '../../types/login';
import { useForm, Controller } from 'react-hook-form';
import { login } from '../../services/api';
import { useMutation } from '@tanstack/react-query';
import { STORAGE_KEY } from '../../constants/keys';
import { useDispatch } from 'react-redux';
import { userDetailsActions } from '../../store/slice/userDetails';
import { navigationRef } from '../../utils/navigationRef';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [loginError, setLoginError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginCredentials>();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async data => {
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
              routes: [{name: 'TodoList'}]
            }
          }
        ]
      })
    },
    onError: (error: any) => {
      setLoginError(error?.response?.data?.message);
    },
  });

  const onSubmit = (data: TLoginCredentials) => {
    mutation.mutate(data);
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
              <Text style={styles.errorTextStyle}>{loginError}</Text>
            )}
            <ButtonComponent isLoading={mutation.isPending} label="Sign In" onPress={handleSubmit(onSubmit)} />
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
  errorTextStyle: {
    fontSize: getFontSize(12),
    fontWeight: 'bold',
    color: colors.error,
    marginBottom: rSpacing(10),
  },
});
