import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AuthStackScreen } from '../routes';
import appSettingsActions from '../store/actions/appSettingsActions';
import ModalClose from '../components/ModalClose';

export default function Auth() {
  const dispatch = useDispatch();
  const appSettings = useSelector((state) => state.appSettings);
  const isUserLoggedIn = useSelector((state) => state.session.isUserLoggedIn);
  const { colors, showLoginPage } = appSettings;

  return (
    <Modal
      style={styles.modal}
      isVisible={showLoginPage && !isUserLoggedIn}
    >
      <AuthStackScreen
        localOption={{
          headerRight: () => (
            <ModalClose
              colors={colors}
              onPress={() => dispatch(appSettingsActions.hideLoginPage())}
            />
          ),
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  safeArea: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    paddingTop: 5,
  },
  icon: {
    marginRight: 20,
  },
});
