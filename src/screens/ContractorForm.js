import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';
import i18n from '../utils/i18n';

function ContractorForm({ navigation }) {
    navigation.setOptions({
      title: i18n.t('contractor'),
    });

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSubmit = data => {
    console.log(data);
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log('errors', errors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="firstName"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Username</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="lastName"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Email</Text>
        <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
            <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
            />
            )}
            name="firstName"
            rules={{ required: true }}
      />

      <TouchableOpacity
                activeOpacity={0.8}
                // onPress={}
                style={styles.appButtonContainer}
              >
                {/* <Text style={styles.appButtonText}>{title}</Text> */}
                <Text style={styles.appButtonText}>ADD CONTRACTOR</Text>
              </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: '#fff',
    height: 40,
    backgroundColor: 'lightblue',
    borderRadius: 4,
  },
  container: {
    color: '#fff',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  buttonInner: {
    color: '#fff',
  },
  appButtonText: {
    // fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonContainer: {
    marginTop: 40,
    elevation: 8,
    height: 40,
    backgroundColor: "lightblue",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12
  }
});

export default ContractorForm;