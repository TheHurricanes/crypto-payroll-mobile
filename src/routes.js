import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import BackButton from './components/BackButton';
import i18n from './utils/i18n';
import { SCREENS } from './utils/constants';
import { getIconName } from './utils/navigator';

/** Auth  */
import Login from './screens/Login';
import Signup from './screens/Signup';

/** Prices */
import Prices from './screens/Prices';

/** Contractor */
import Contractor from './screens/Contractor';
import ContractorDetails from './screens/ContractorDetails';

/** Profile */
import Profile from './screens/Profile';

const options = ({ colors, title = '', ...rest }) => ({
  title,
  headerTintColor: colors.primary,
  headerStyle: {
    shadowOpacity: 0,
    backgroundColor: colors.background,
  },
  cardStyle: { backgroundColor: colors.background },
  headerLeft: props => <BackButton {...props} color={colors.primary} />,
  ...rest,
});

const styles = StyleSheet.create({
  tabBar: colors => ({
    borderTopColor: colors.background,
    backgroundColor: colors.background,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 7,
  }),
});

const AuthStack = createStackNavigator();

export function AuthStackScreen({ localOption }) {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={SCREENS.LOGIN}
        component={Login}
        options={options({ colors, ...localOption })}
      />
      <AuthStack.Screen
        name={SCREENS.SIGNUP}
        component={Signup}
        options={options({ colors, ...localOption })}
      />
    </AuthStack.Navigator>
  );
}

const PricesStack = createStackNavigator();

export function PricesStackScreen() {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <PricesStack.Navigator>
      <PricesStack.Screen
        name={SCREENS.PRICES}
        component={Prices}
        options={options({ colors })}
      />
    </PricesStack.Navigator>
  );
}

const ContractorsStack = createStackNavigator();

export function ContractorsStackScreen() {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <ContractorsStack.Navigator>
      <ContractorsStack.Screen
        name={SCREENS.CONTRACTOR}
        component={Contractor}
        options={options({ colors })}
      />
      <ContractorsStack.Screen
        name={SCREENS.CONTRACTOR_DETAILS}
        component={ContractorDetails}
        options={options({ colors })}
      />
    </ContractorsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

export function ProfileStackScreen() {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={SCREENS.PROFILE}
        component={Profile}
        options={options({ colors, headerShown: false })}
      />
    </ProfileStack.Navigator>
  );
}

const MainStack = createBottomTabNavigator();

export function MainStackScreen() {
  const colors = useSelector((state) => state.appSettings.colors);

  const tabBarOptions = {
    activeTintColor: colors.primary,
    keyboardHidesTabBar: true,
    style: styles.tabBar(colors),
  };

  return (
    <MainStack.Navigator
      keyboardHidesTabBar
      tabBarOptions={tabBarOptions}
      // initialRouteName={SCREENS.CONTRACTOR}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons
            name={getIconName({ routeName: route.name })}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <MainStack.Screen name={SCREENS.PRICES} component={PricesStackScreen} />
      <MainStack.Screen name={SCREENS.CONTRACTOR} component={ContractorsStackScreen} />
      <MainStack.Screen name={SCREENS.PROFILE} component={ProfileStackScreen} />
    </MainStack.Navigator>
  );
}

const RootStack = createStackNavigator();
export function RootStackScreen() {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <RootStack.Navigator
      initialRouteName={SCREENS.APP}
      mode="modal"
    >
      <RootStack.Screen
        name={SCREENS.APP}
        component={MainStackScreen}
        options={options({ colors, headerShown: false })}
      />
    </RootStack.Navigator>
  );
}

