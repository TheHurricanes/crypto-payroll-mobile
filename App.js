import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { RootStackScreen } from './src/routes';
import store from './src/store';
import baseServiceHelperInstance from './src/store/services/BaseServiceHelper';
import BackgroundProcesses from './src/screens/BackgroundProcesses/BackgroundProcesses';
import Auth from './src/screens/Auth';
// import 'react-native-gesture-handler';

export default function App() {
  baseServiceHelperInstance.setStore(store);

  return (
    <Provider store={store}>
      <BackgroundProcesses />
      <NavigationContainer>
        <Auth/>
      </NavigationContainer>
      <NavigationContainer>
        <AppearanceProvider>
          <ActionSheetProvider>
            <RootStackScreen />
          </ActionSheetProvider>
        </AppearanceProvider>
      </NavigationContainer>
    </Provider>
  );
}
