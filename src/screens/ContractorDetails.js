import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function ContractorDetails() {
  const [currTab, setCurrTab] = useState(0);

  const renderTopMenu = () => {
    const tabs = [
      {
        title: 'Details',
      },
      {
        title: 'Payments',
      },
      {
        title: 'Documents',
      },
    ];

    return (
      <View style={styles.topMenu}>
        <View style={styles.topMenuRow}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: `https://api.abranhe.com/api/avatar` }} style={styles.avatar} />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>johndoe@gmail.com</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {tabs.map((tab, idx) => (
            <TouchableOpacity style={styles.menuItem({ selected: currTab === idx })} onPress={() => setCurrTab(idx)}>
              <Text key={`${idx}_${tab.title}`} style={styles.menuText}>{tab.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderDetailsTabContent = () => {
    const personalDetails = [
      {
        title: 'Name',
        value: 'John Doe',
        key: 'name',
      },
      {
        title: 'Email',
        value: 'john@doe.com',
        key: 'email',
      },
      {
        title: 'Phone',
        value: '(305)-234-1480',
        key: 'phone',
      },
      {
        title: 'Address',
        value: '123 Main St',
        key: 'address',
      },
    ]

    return (
      <View style={styles.contentTab}>
        <Text style={styles.personalDetailsText}>Personal Details</Text>

        <View style={styles.personalDetailsContainer}>
          {personalDetails.map((detail, idx) => (
            <View key={detail.key} style={styles.personalDetailsRow}>
              <Text style={styles.personalDetailsLabel}>{detail.title}</Text>
              <Text style={styles.personalDetailsValue}>{detail.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bankAccountContainer}>
          <View style={styles.bankTop}>
            <Text style={styles.bankAccountText}>Bank Account</Text>
          </View>

          <View style={styles.bankDetails}>
            <View style={styles.bankDetailsRow}>
              <FontAwesome name="bank" size={20} color="black" />
              <Text style={styles.bankDetailsLabel}>Account Number</Text>
            </View>
            <Text style={styles.bankAccountValue}>**** ******* 8942</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderPaymentsTabContent = () => {
    // TODO: change for a flatlist
    const payments = [
      {
        date: '12/12/2019',
        type: 'Payment',
        paymentMethod: 'Check',
        amount: '$100.00',
      },
      {
        date: '01/11/2019',
        type: 'Payment',
        paymentMethod: 'Other',
        amount: '$770.00',
      },
      {
        date: '07/10/2019',
        type: 'Payment',
        paymentMethod: 'Direct deposit',
        amount: '$1200.20',
      },
      {
        date: '03/11/2019',
        type: 'Payment',
        paymentMethod: 'Check',
        amount: '$88.30',
      },
    ]

    const ammountOfPayments = payments.length;

    return (
      <View style={styles.contentTab}>
        <Text style={styles.paymentsText}>{ammountOfPayments} payments found</Text>

        <View style={styles.paymentsContainer}>
          {payments.map((payment, idx) => (
            <View key={`${idx}_${payment.date}`} style={styles.paymentRow}>
              <View style={styles.paymentDate}>
                <Text style={styles.paymentDateText}>{payment.date}</Text>
              </View>
              <View style={styles.paymentDetails}>
                <View style={styles.paymentDetailsRow}>
                  <Text style={styles.paymentDetailsLabel}>{payment.type}</Text>
                  <Text style={styles.paymentDetailsLabel}>{payment.paymentMethod}</Text>
                </View>
                <Text style={styles.paymentDetailsValue}>{payment.amount}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderDocumentsTabContent = () => {
    const documents = ['W-9', 'W2s', '1099s', 'Withholdings'];

    return (
      <View style={styles.contentTab}>
        {documents.map((document, idx) => (
          <TouchableOpacity key={`${idx}_${document}`} style={styles.documentRow} onPress={() => { }}>
            <Text style={styles.documentText}>{document}</Text>
          </TouchableOpacity>
        ))}
        
      </View>
    );
  };

  const renderTabContent = () => {
    switch (currTab) {
      case 0:
        return renderDetailsTabContent();
      case 1:
        return renderPaymentsTabContent();
      case 2:
        return renderDocumentsTabContent();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderTopMenu()}
      {renderTabContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  topMenuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  menu: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 30,
  },
  menuItem: ({ selected }) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomColor: 'gray',
    ...(selected && { borderBottomWidth: 3, })
  }),
  contentTab: {
    marginTop: 10,
    padding: 15,
  },
  personalDetailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#303030',
  },
  personalDetailsContainer: {
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  personalDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  personalDetailsLabel: {
    fontSize: 14,
    color: '#303030',
  },
  personalDetailsValue: {
    fontSize: 14,
    color: '#666',
  },
  bankAccountContainer: {
    marginTop: 15,
    paddingBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  bankTop: {
    backgroundColor: '#ddd',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 15,
  },
  bankDetails: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bankDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankDetailsLabel: {
    fontSize: 14,
    color: '#303030',
    marginLeft: 10,
  },
  paymentsContainer: {
    marginTop: 15,
  },
  paymentsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#303030',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentDate: {
    width: '30%',
  },
  paymentDateText: {
    fontSize: 14,
    color: '#666',
  },
  paymentDetails: {
    width: '70%',
  },
  paymentDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentDetailsLabel: {
    fontSize: 14,
    color: '#303030',
  },
  paymentDetailsValue: {
    fontSize: 14,
    color: '#666',
  },
  contentTab: {
    marginTop: 10,
    padding: 15,
  },
  documentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 15,
  },
  documentText: {
    fontSize: 14,
    marginTop: 10,
    color: '#0066ff',
  },
});

export default ContractorDetails;
