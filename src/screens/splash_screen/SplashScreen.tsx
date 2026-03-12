import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFontSize, rSpacing, SecureStorage } from '../../utils';
import { STORAGE_KEY } from '../../constants/keys';
import { navigationRef } from '../../utils/navigationRef';
import { useTheme } from '../../context/ThemeContext';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

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
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {    color: theme.textPrimary}]}>Taskly</Text>
        <ActivityIndicator
          size="large"
          color={theme.textPrimary}
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
  },
  loader: {
    marginTop: rSpacing(10),
  }
});
