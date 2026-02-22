import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { colors } from '../../theme/colors';
import { getFontSize, rSpacing } from '../../utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  SplashScreen: undefined;
  Auth: undefined;
  UnAuth: undefined;
};

interface SplashScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const accessToken = useSelector(
    (state: RootState) => state.token.accessToken
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigation) {
        if (accessToken) {
          navigation.replace('Auth');
        } else {
          navigation.replace('UnAuth');
        }
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [accessToken, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My App</Text>
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
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
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: getFontSize(20),
    fontWeight: '700',
    marginBottom: rSpacing(20),
  },
  loader: {
    marginTop: rSpacing(10),
  },
});