import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { width } from '../utils/device';

const SearchBar = ({ value, onChangeText, placeholder, colors }) => {
  return (
    <View style={styles.container(colors)}>
      <View style={styles.search(colors)}>
        <MaterialIcons
          name="search"
          size={24}
          style={styles.icon}
          color={colors.primary}
        />
        <TextInput
          placeholder={placeholder}
          value={value}
          style={styles.input(colors)}
          autoCapitalize="none"
          onChangeText={onChangeText}
          placeholderTextColor={colors.primary}
        />
        {value ? (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <MaterialIcons
              name="cancel"
              size={20}
              style={styles.icon}
              color={colors.primary}
            />
          </TouchableOpacity>
        ) : (
            <View />
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    width,
    backgroundColor: colors.background,
    alignItems: 'center',
  }),
  search: colors => ({
    height: 50,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 5,
    // width: width * 0.95,
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shade11,
    justifyContent: 'space-between',
  }),
  input: colors => ({
    flex: 1,
    height: '100%',
    alignItems: 'stretch',
    color: colors.primary,
  }),
  icon: {
    paddingHorizontal: '3%',
  },
});

SearchBar.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

SearchBar.defaultProps = {
  value: '',
  placeholder: '',
  onChangeText: PropTypes.func,
};

export default SearchBar;
