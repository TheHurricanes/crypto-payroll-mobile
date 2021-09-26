import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ title, onPress, loading, style, colors }) => {
  return (
    <TouchableOpacity
      onPressIn={onPress}
      style={{ ...styles.container(colors), ...style }}
    >
      <Text style={styles.title(colors)}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: colors => ({
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  }),
  title: colors => ({
    marginVertical: '7%',
    color: colors.background,
    fontSize: 20,
    fontWeight: '600',
  }),
});

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  loading: PropTypes.bool,
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
}

Button.defaultProps = {
  title: '',
  onPress: Function.prototype,
  style: {},
  loading: false,
}

export default Button;
