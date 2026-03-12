import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { getFontSize, Haptics, rHeight, rSpacing } from '../../utils';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Pressable
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
          Haptics.impact('medium');
        }}
      >
        <Ionicons
          name="chevron-back-sharp"
          size={30}
          color={theme.textPrimary}
        />
      </Pressable>

      <Text
        style={[
          styles.title,
          { color: theme.textPrimary },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rSpacing(20),
    height: rHeight(56),
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    left: rSpacing(20),
  },

  title: {
    fontSize: getFontSize(16),
    fontWeight: '700',
    textAlign: 'center',
  },
});