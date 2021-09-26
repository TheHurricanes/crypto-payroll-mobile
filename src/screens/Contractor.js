import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EventLoadingCard from '../components/EventLoadingCard';
import { width } from '../utils/device';
import i18n from '../utils/i18n';
import Logger from '../utils/logger';
import { fontSize } from '../styles';
import SearchBar from '../components/SearchBar';
import { SCREENS } from '../utils/constants';
// import Button from '../components/Button';

const logger = Logger.get('Contractors.js');

function Contractor({ navigation }) {
  navigation.setOptions({
    title: i18n.t('contractor'),
  });

  const session = useSelector((state) => state.session);
  const colors = useSelector((state) => state.appSettings.colors);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const contacts = [
    {
      name: 'Richard',
      username: 'richard01',
      email: 'richard01@gmail.com',
    },
    {
      name: 'David',
      username: 'david01',
      email: 'david01@gmail.com',
    },
    {
      name: 'Brook',
      username: 'brook02',
      email: 'brook02@gmail.com',
    }
  ]

  const onSearchBlur = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const addContractor = () => {
  };

  // useEffect(() => {
  //   if (session.isUserLoggedIn) {

  //   }
  // }, [session.isUserLoggedIn]);

  const Loading = () => (
    <FlatList
      data={[1, 2, 3]}
      renderItem={() => <EventLoadingCard />}
      keyExtractor={(item, idx) => idx.toString()}
    />
  );

  return (
    <View style={styles.container}>
        <View style={styles.search}>
          <SearchBar
              value={searchValue}
              onBlur={onSearchBlur}
              placeholder={i18n.t('searchEvents')}
              onChangeText={setSearchValue}
              colors={colors}
          />
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate(SCREENS.CONTRACTOR_FORM)}
              style={styles.addButtonContainer}
            >
              {/* <Text style={styles.appButtonText}>{title}</Text> */}
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      <View style={styles.contacts}>
        {contacts.map((contact) => {
          {console.log(contact.name)}
          return (
            <View style={styles.fixToText}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: `https://api.abranhe.com/api/avatar` }} style={styles.avatar} />
              </View>
              <Text style={styles.contact}>
                {contact.username}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate(SCREENS.CONTRACTOR_DETAILS)}
                style={styles.appButtonContainer}
              >
                {/* <Text style={styles.appButtonText}>{title}</Text> */}
                <Text style={styles.appButtonText}>Pay Contractor</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(250, 250, 250, 0.1)',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    margin: 10,
    padding: 5,
  },
  eventsContainer: {
    width,
    padding: '3%',
    alignItems: 'center',
  },
  playContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  goToLogin: {
    margin: 20,
    width: width * 0.7,
    backgroundColor: '#000',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toLoginText: {
    color: '#fff',
  },
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contacts: {
    flex: 1,
    height: 100,
    paddingTop: 44,
  },
  contact: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    // display: 'flex',
    // alignItems: 'center',
    padding: 20,
    fontSize: 18,
    // height: 80,
  },
  div: {
    width: '100%',
    justifyContent: 'space-between'
  },
  search: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    height: 40,
    backgroundColor: "lightblue",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  addButtonContainer: {
    width: '100%',
    elevation: 8,
    height: 40,
    backgroundColor: "white",
    color: 'black',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  addButtonText: {
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonText: {
    // fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default Contractor;
