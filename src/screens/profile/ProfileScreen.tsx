import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { store } from '../../store/store';
import { getFontSize, logout, rHeight, rSpacing, rWidth } from '../../utils';
import { colors } from '../../theme/colors';
import {
  AppModal,
  ButtonComponent,
  Header,
  ProfileInfoRow,
} from '../../components';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { isDarkMode, theme } = useTheme();
  const { userDetails } = store.getState();
  const [isVisible, setIsVisible] = useState(false);
  const { userDetails: user } = userDetails;

  const Divider = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor:
          theme.mode === 'dark' ? colors.gray700 : colors.blue100,
      }}
    />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header title="Profile" />
      <View style={styles.profileWrapper}>
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: theme.background },
          ]}
        >
          <Image
            source={{ uri: user?.image }}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={[styles.userName, { color: theme.textPrimary }]}>
            {`${user?.firstName} ${user?.lastName}`}
          </Text>

          <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
            {user?.email}
          </Text>
        </View>
      </View>

      <View style={styles.infoWrapper}>
        <Text
          style={[styles.informationStyles, { color: theme.textSecondary }]}
        >
          PERSONAL INFORMATION
        </Text>
        <View
          style={[
            styles.profileInfoRowWrapper,
            {
              backgroundColor:
                theme.mode === 'dark' ? theme.card : colors.blue50,
            },
          ]}
        >
          <ProfileInfoRow
            icon="person-outline"
            label="FIRST NAME"
            value={user?.firstName}
          />
          <Divider />
          <ProfileInfoRow
            icon="person-outline"
            label="LAST NAME"
            value={user?.lastName}
          />
          <Divider />
          <ProfileInfoRow
            icon="mail-outline"
            label="EMAIL"
            value={user?.email}
          />
          <Divider />
          <ProfileInfoRow
            icon="woman-outline"
            label="GENDER"
            value={user?.gender}
          />
        </View>
      </View>

      <View style={styles.buttonsWrapper}>
        <ButtonComponent
          icon="settings-outline"
          label="Account Settings"
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
        <ButtonComponent
          icon="log-out-outline"
          label="Logout"
          onPress={() => {
            setIsVisible(true);
          }}
          containerStyle={{ backgroundColor: colors.error100 }}
          textStyle={{ color: colors.error500 }}
          iconColor={colors.error500}
        />
      </View>
      <AppModal
        isVisible={isVisible}
        message="Are you sure you want to logout?"
        type="info"
        isDarkMode={isDarkMode}
        onCancel={() => setIsVisible(false)}
        onConfirm={() => {logout(false)}}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: rSpacing(30),
  },

  profileWrapper: {
    alignItems: 'center',
    gap: rSpacing(12),
  },

  avatarContainer: {
    height: rHeight(100),
    width: rWidth(100),
    borderRadius: 70,
    elevation: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    height: '100%',
    width: '100%',
  },

  userInfoContainer: {
    alignItems: 'center',
    gap: rSpacing(5),
  },

  userName: {
    fontSize: getFontSize(20),
    fontWeight: '800',
  },

  userEmail: {
    fontSize: getFontSize(12),
    fontWeight: 'bold',
  },
  profileInfoRowWrapper: {
    paddingVertical: rSpacing(10),
    borderRadius: 12,
    gap: rSpacing(12),
  },
  infoWrapper: {
    paddingHorizontal: rSpacing(20),
    gap: rSpacing(12),
  },
  informationStyles: {
    fontSize: getFontSize(14),
    fontWeight: '700',
  },
  buttonsWrapper: {
    paddingHorizontal: rSpacing(20),
    gap: rSpacing(20),
  },
});
