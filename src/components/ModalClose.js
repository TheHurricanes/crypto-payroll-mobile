import React from 'react'
import { TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getThemeColors } from '../styles';
import i18n from '../utils/i18n';

export default function ModalClose({ colors = getThemeColors(), onPress }) {
  const onExit = () => {
    Alert.alert(
      i18n.t('exitEvent'),
      i18n.t('areYouSure'),
      [
        {
          text: i18n.t('cancel'),
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: i18n.t('leave'),
          onPress,
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <TouchableOpacity
      onPress={onExit}
    >
      <MaterialCommunityIcons
        size={30}
        name="close"
        color={colors.primary}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  icon: {
    marginRight: 20,
  }
});