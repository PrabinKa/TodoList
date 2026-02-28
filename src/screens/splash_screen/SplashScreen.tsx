import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { getFontSize, rSpacing, SecureStorage } from '../../utils';
import { STORAGE_KEY } from '../../constants/keys';
import { navigationRef } from '../../utils/navigationRef';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

        console.log('IS ACCESS TOKEN:', token)

        if (token) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'AppScreen' }],
          });
        } else {
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'AuthScreen' }],
          });
        }
      } catch (error) {
        console.log(error);
        navigationRef.reset({
          index: 0,
          routes: [{ name: 'AuthScreen' }],
        });
      }
    };

    checkAuth();
  }, [navigation]);

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
