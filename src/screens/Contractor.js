import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventLoadingCard from '../components/EventLoadingCard';
import { width } from '../utils/device';
import i18n from '../utils/i18n';
import Logger from '../utils/logger';
import SearchBar from '../components/SearchBar';
import { SCREENS } from '../utils/constants';
import ProfileImage from '../components/ProfileImage';
import organizationActions from '../store/actions/organizationActions';

const logger = Logger.get('Contractors.js');

function Contractor({ navigation }) {
  navigation.setOptions({
    title: i18n.t('contractor'),
    headerRight: renderRight,
  });

  const dispatch = useDispatch();
  const org = useSelector((state) => state.org);
  const session = useSelector((state) => state.session);
  const [searchValue, setSearchValue] = useState('');
  const colors = useSelector((state) => state.appSettings.colors);

  useEffect(() => {
    try {
      dispatch(organizationActions.getContractors({ orgId: 1 }));
    } catch (error) {
      logger.error(error);
    }
  }, []);

  console.log(org);

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
    },
  ];

  const onSearchBlur = (e) => {
    logger.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const addContractor = () => {
  };

  // useEffect(() => {
  //   if (session.isUserLoggedIn) {

  //   }
  // }, [session.isUserLoggedIn]);
  const renderRight = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate(SCREENS.CONTRACTOR_FORM)}
      style={styles.addButtonContainer}
    >
      <Text style={styles.addButtonContainerLink(colors)}>Add Contractor</Text>
    </TouchableOpacity>
  );

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
          <View style={styles.searchComponent}>
            <SearchBar
              value={searchValue}
              onBlur={onSearchBlur}
              placeholder={i18n.t('searchEvents')}
              onChangeText={setSearchValue}
              colors={colors}
            />
          </View>
        </View>
      <View style={styles.contacts}>
        {contacts.map((contact, idx) => (
          <View style={styles.fixToText} key={idx}>
            <View style={styles.contractorProfile}>
              <ProfileImage uri="https://api.abranhe.com/api/avatar" />
              <Text style={styles.contact}>
                {contact.username}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREENS.CONTRACTOR_DETAILS)}
              style={styles.appButtonContainer(colors)}
            >
              <Text style={styles.appButtonText}>Pay Contractor</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchComponent: {
    width: '100%',
  },
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
  },
  contact: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 20,
    fontSize: 18,
  },
  div: {
    width: '100%',
    justifyContent: 'space-between',
  },
  addButtonContainerLink: (colors) => ({
    color: colors.link,
  }),
  search: {
    width: '100%',
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  appButtonContainer: (colors) => ({
    elevation: 8,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
  }),
  addButtonContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    height: 40,
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 10,
  },
  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  appButtonText: {
    // fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
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
  contractorProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Contractor;
