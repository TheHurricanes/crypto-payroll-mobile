import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import authActions from '../store/actions/authActions';
import Button from '../components/Button';
import { usernameRegEx, passwordRegEx } from '../utils/validation';
import i18n from '../utils/i18n';
import Logger from '../utils/logger';
import { SCREENS } from '../utils/constants';
import { fontSize } from '../styles';
import appSettingsActions from '../store/actions/appSettingsActions';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const logger = Logger.get('Login.js');

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.appSettings.colors);
  const textColor = (error) => (error ? colors.error : colors.primary);

  const handleLogin = async (values) => {
    try {
      await dispatch(authActions.login(values));
      dispatch(appSettingsActions.hideLoginPage());
    } catch (err) {
      logger.warn(err);
      formik.setFieldError('username', i18n.t('usernameError'));
    }
  };

  const loginSchema = yup.object().shape({
    username: yup.string().matches(usernameRegEx).required('Field is required'),
    password: yup.string().matches(passwordRegEx).required('Field is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleLogin,
    validationSchema: loginSchema,
  });

  const {
    values,
    handleChange,
    handleBlur,
    submitForm,
    errors,
    touched,
  } = formik;
  const usernameErrors = touched.username && errors.username;
  const passwordErrors = touched.password && errors.password;

  return (
    <View style={styles.container(colors)}>
      <KeyboardAvoidingView behavior="padding">
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <View style={styles.formContainer}>
            <Text style={styles.title(colors)}>{i18n.t('login')}</Text>
            <View style={styles.form}>
              <Text style={styles.errorLabel(textColor(usernameErrors))}>{usernameErrors}</Text>
              <TextInput
                value={values.email}
                style={styles.input(textColor(usernameErrors))}
                placeholder={i18n.t('username')}
                autoCapitalize="none"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholderTextColor={textColor(usernameErrors)}
              />
              <TextInput
                value={values.password}
                style={styles.input(textColor(passwordErrors))}
                placeholderTextColor={textColor(passwordErrors)}
                placeholder={i18n.t('password')}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                secureTextEntry
              />
            </View>
            <Button
              title={i18n.t('login')}
              onPress={submitForm}
              colors={colors}
            />
            <TouchableOpacity
              onPressIn={() => navigation.navigate(SCREENS.SIGNUP)}
              style={styles.signinLinkContainer}
            >
              <Text style={styles.signInLink(colors)}>
                {i18n.t('noAccountYet')}
              </Text>
            </TouchableOpacity>
          </View>
        {/* </TouchableWithou/tFeedback> */}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    backgroundColor: colors.background,
  }),
  formContainer: {
    padding: '10%',
    height: '100%',
  },
  title: colors => ({
    fontSize: 40,
    fontWeight: '600',
    color: colors.primary,
  }),
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: '10%',
    marginBottom: '3%',
  },
  errorLabel: color => ({
    color,
    alignSelf: 'flex-start',
  }),
  input: color => ({
    width: '100%',
    borderWidth: 1,
    borderColor: color,
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    marginVertical: '3%',
    color,
    fontWeight: '600',
  }),
  signinLinkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInLink: colors => ({
    color: colors.primary,
    marginVertical: '5%',
    fontWeight: '600',
    fontSize: fontSize.smallMedium,
  }),
});

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
