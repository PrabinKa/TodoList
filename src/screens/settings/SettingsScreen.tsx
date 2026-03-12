import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { Header, SettingsButton } from '../../components';
import { getFontSize, Haptics, rSpacing } from '../../utils';
import { colors } from '../../theme/colors';

const SettingsScreen = () => {
  const { isDarkMode, theme, toggleTheme, isSystemTheme, systemTheme } =
    useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header title="Settings" />

      <View style={styles.contentWrapper}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Appearance
        </Text>

        <View
          style={[
            styles.settingRow,
            {
              backgroundColor: isDarkMode ? theme.card : colors.blue100,
            },
          ]}
        >
          <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>
            Dark Mode
          </Text>

          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            thumbColor={isDarkMode ? colors.blue600 : colors.gray700}
            trackColor={{
              false: colors.gray900,
              true: colors.blue400,
            }}
          />
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Theme Settings
        </Text>
        <SettingsButton
          label="Light"
          icon="bulb-outline"
          isActive={!isDarkMode && !isSystemTheme}
          onPress={() => {
            Haptics.impact('medium');
            toggleTheme(false);
          }}
        />
        <SettingsButton
          label="Dark"
          icon="moon-outline"
          isActive={isDarkMode && !isSystemTheme}
          onPress={() => {
            Haptics.impact('medium');
            toggleTheme(true);
          }}
        />
        <SettingsButton
          label="System"
          icon="settings-outline"
          isActive={isSystemTheme}
          onPress={() => {
            Haptics.impact('medium');
            systemTheme();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentWrapper: {
    paddingHorizontal: rSpacing(20),
    paddingTop: rSpacing(20),
    gap: rSpacing(16),
  },

  sectionTitle: {
    fontSize: getFontSize(16),
    fontWeight: '600',
  },

  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: rSpacing(14),
    borderRadius: 12,
  },

  settingLabel: {
    fontSize: getFontSize(14),
    fontWeight: '600',
  },
});
