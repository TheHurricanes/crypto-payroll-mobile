import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Share,
  Dimensions,
} from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import userActions from '../store/actions/userActions';
import authActions from '../store/actions/authActions';
import { APP_VERSION, SCREENS } from '../utils/constants';
import i18n from '../utils/i18n';
import Logger from '../utils/logger';
import {
  onlyAdmins,
  onlyCompanies,
  onlyInfluencers,
  onlyCustomers,
} from '../utils/userVisibilities';
import appSettingsActions from '../store/actions/appSettingsActions';
import { SafeAreaView } from 'react-native-safe-area-context';

const logger = Logger.get('Profile.js');

function Profile({ navigation, user, session }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const colors = useSelector((state) => state.appSettings.colors);
  const { showActionSheetWithOptions } = useActionSheet();

  const links = [
    {
      icon: 'account-plus-outline',
      title: 'startPlaying',
      IconComponent: MaterialCommunityIcons,
      onPress: () => dispatch(appSettingsActions.showLoginPage()),
      isVisible: false, //!onlyCustomers(user?.userTypes),
    },
    {
      icon: 'person-outline',
      title: 'account',
      IconComponent: MaterialIcons,
      onPress: () => navigation.navigate(SCREENS.ACCOUNT),
      isVisible: onlyCustomers(user?.userTypes),
    },
    {
      icon: 'credit-card',
      title: 'payments',
      IconComponent: MaterialIcons,
      onPress: () => navigation.navigate(SCREENS.PAYMENTS),
      isVisible: onlyCustomers(user?.userTypes),
    },
    {
      icon: 'shield-check-outline',
      title: 'proAccount',
      IconComponent: MaterialCommunityIcons,
      onPress: () => navigation.navigate(SCREENS.BUSINESS),
      isVisible: onlyAdmins(user?.userTypes),
    },
    {
      icon: 'wallet-outline',
      title: 'payoutMethods',
      IconComponent: MaterialCommunityIcons,
      onPress: () => navigation.navigate(SCREENS.PAYOUTMETHODS),
      isVisible: onlyCustomers(user?.userTypes),
    },
    {
      icon: 'cash-usd',
      title: 'earnings',
      IconComponent: MaterialCommunityIcons,
      onPress: () => { },
      isVisible: onlyCustomers(user?.userTypes),
    },
    {
      icon: 'help-outline',
      title: 'help',
      IconComponent: MaterialIcons,
      onPress: () => { },
      isVisible: true,
      onPress: () => { },
      isVisible: onlyCustomers(user?.userTypes),
    },
    {
      icon: 'translate',
      title: 'language',
      IconComponent: MaterialIcons,
      onPress: () => navigation.navigate(SCREENS.LANGUAGE),
      isVisible: true,
    },
    {
      icon: 'theme-light-dark',
      title: 'appearance',
      IconComponent: MaterialCommunityIcons,
      onPress: () => navigation.navigate(SCREENS.APPEARANCE),
      isVisible: true,
    },
    {
      icon: 'help-outline',
      title: 'help',
      IconComponent: MaterialIcons,
      onPress: () => { },
      isVisible: true,
    },
    {
      icon: 'exit-to-app',
      title: 'logout',
      IconComponent: MaterialIcons,
      onPress: () => logout(),
      isVisible: onlyCustomers(user?.userTypes),
    },
    {
      icon: 'login',
      title: 'login',
      IconComponent: MaterialCommunityIcons,
      onPress: () => dispatch(appSettingsActions.showLoginPage()),
      isVisible: !onlyCustomers(user?.userTypes),
    },
  ];

  const userLevel = [
    {
      title: 'admin',
      Icon: Feather,
      iconName: 'settings',
      isVisible: onlyAdmins(user.userTypes),
    },
    {
      title: 'company_account',
      Icon: FontAwesome5,
      iconName: 'building',
      isVisible: onlyCompanies(user.userTypes),
    },
    {
      title: 'influencer',
      Icon: MaterialIcons,
      iconName: 'person',
      isVisible: onlyInfluencers(user.userTypes),
    },
    {
      title: 'customer',
      isVisible: false,
    },
  ];

  useEffect(() => {
    if (session.isUserLoggedIn) {
      getUserInfo();
    }
  }, [isFocused, session.isUserLoggedIn]);

  const getUserInfo = async () => {
    try {
      await dispatch(userActions.getUserDetails());
    } catch (err) {
      logger.error(err);
    }
  };

  const logout = async () => {
    await dispatch(authActions.logout());
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        logger.warn(
          'Sorry, we need camera roll permissions to make this work!',
        );
      }
    }
  };

  // https://github.com/expo/image-upload-example/blob/master/frontend/App.js
  const uploadImage = async () => {
    try {
      await getPermissionAsync();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const uri = result.uri;
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        // eslint-disable-next-line no-undef
        const formData = new FormData();

        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        await dispatch(userActions.uploadAvatar({ formData, mock: uri })); // TODO: remove mock
      }
    } catch (err) {
      logger.info('Upload image failed', err);
    }
  };

  const handleAvatarChange = () => {
    const options = [i18n.t('uploadImage'), i18n.t('cancel')];

    showActionSheetWithOptions({ options, cancelButtonIndex: 1 }, (idx) => {
      if (idx === 0) {
        if (!session.isUserLoggedIn) {
          return dispatch(appSettingsActions.showLoginPage())
        }

        uploadImage();
      }
    });
  };

  const profileItem = ({ icon, title, onPress, IconComponent, isVisible }, idx) => {
    return isVisible ? (
      <TouchableOpacity
        key={`${title}_${idx}`}
        onPress={onPress}
        style={styles.item}
      >
        <IconComponent size={20} name={icon} color={colors.primary} />
        <Text style={styles.itemTitle(colors)}>
          {i18n.t(title)}
        </Text>
      </TouchableOpacity>
    ) : (
      <View key={`${title}_${idx}`} />
    );
  };

  const renderLevel = () => {
    const levelDetail = userLevel.find((lvl) => lvl.isVisible);
    if (!levelDetail || !levelDetail.isVisible) {
      return <View />;
    }
    const Icon = levelDetail.Icon || MaterialIcons;

    return (
      <View style={styles.levelContainer(colors)}>
        <Icon size={16} name={levelDetail.iconName} color="#12db41" />
        <Text style={styles.levelTitle}>{i18n.t(levelDetail.title)}</Text>
      </View>
    );
  };

  const renderUserInformation = () => (
    <>
      <TouchableOpacity onPress={handleAvatarChange}>
        <View style={styles.avatarContainer(colors)}>
          {
            user.avatar
              ? <Image source={{ uri: user.avatar }} style={styles.avatar(colors)} />
              : <View />
          }
          <MaterialIcons name="person-outline" size={70} color="#fff" />
        </View>
      </TouchableOpacity>

      <Text style={styles.name(colors)}>{user.name}</Text>
      <Text style={styles.username(colors)}>@{user.username}</Text>
    </>
  );

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: process.env.APP_STORE_URL || 'dsaffs',
      });

    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container(colors)}>
          <View style={styles.containerlevel}>
            {renderLevel()}
          </View>
          {renderUserInformation()}

          <View style={styles.profileLinks}>
            {links.map(profileItem)}
          </View>
          <Text style={styles.appVersion(colors)}>v{APP_VERSION}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  levelContainer: colors => ({
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.highlight,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 25,
  }),
  levelTitle: {
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 16,
  },
  container: colors => ({
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    height: Dimensions.get('window').height * .9,
  }),
  avatarContainer: colors => ({
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    width: 150,
    height: 150,
    borderRadius: 151,
    backgroundColor: colors.shade9,
  }),
  avatar: colors => ({
    width: 150,
    height: 150,
    borderRadius: 150,
    position: 'absolute',
    zIndex: 100,
  }),
  name: colors => ({
    color: colors.primary,
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 10,
  }),
  username: colors => ({
    color: '#0ccdb6', // colors.shade1,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1.5,
  }),
  profileLinks: {
    marginTop: 10,
    justifyContent: 'flex-start',
    width: '80%',
  },
  item: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  itemTitle: colors => ({
    fontSize: 15,
    marginLeft: 10,
    color: colors.primary,
  }),
  appVersion: colors => ({
    color: colors.shade7,
    margin: '5%',
  }),
});

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    userTypes: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  session: state.session,
});

export default connect(mapStateToProps)(Profile);
