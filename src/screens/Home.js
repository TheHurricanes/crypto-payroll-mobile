import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Text, View, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { TouchableOpacity } from 'react-native-gesture-handler';

function Home() {
  const colors = useSelector((state) => state.appSettings.colors);

  const mockLables = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const mockData = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100
  ];

  const renderGraph = () => {
    return (<View style={styles.graphContainer}>
      <View style={styles.leyendContainer}>
        <View style={styles.leyendItem}>
          <View style={[styles.leyendCircle, { backgroundColor: 'rgb(232, 12, 12)' }]} />
          <Text style={styles.leyendText}>
            Paid
          </Text>
        </View>

        <View style={styles.leyendItem}>
          <View style={[styles.leyendCircle, { backgroundColor: 'rgb(12, 205, 182)' }]} />
          <Text style={styles.leyendText}>
            Budget
          </Text>
        </View>
      </View>

      <LineChart
        data={{
          labels: mockLables,
          datasets: [
            {
              color: (opacity = 1) => `rgba(232, 12, 12, ${opacity})`,
              data: mockData,
            },
            {
              data: mockData.map((d) => d + Math.random() * 150),
            }
          ]
        }}
        bezier
        width={Dimensions.get('window').width * .9}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.background,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(12, 205, 182, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(130, 130, 130, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
          }
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.topTitle}>Today's balance</Text>
        <Text style={styles.title}>$32,313</Text>
        <Text style={styles.buttonTitle}>6 months</Text>
      </View>
      {renderGraph()}

      <View style={styles.monthlyDetilsContainer}>
        <Text style={styles.monthlyDetilsTitle}>Monthly details</Text>
        <FlatList data={['January', 'February', 'March', 'April', 'May', 'June']}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.monthlyDetilsItem} onPress={() => alert('Feature not implemented')}>
              <Text style={styles.monthlyDetilsItemTitle}>{item}</Text>
              <Text style={styles.monthlyDetilsItemValue}>$32,313</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 10,
  },
  graphContainer: {
    alignItems: 'center',
  },
  leyendContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  leyendText: {
    fontSize: 12,
    marginRight: 10,
  },
  leyendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leyendCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  monthlyDetilsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  monthlyDetilsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  monthlyDetilsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  monthlyDetilsItemTitle: {
    fontSize: 16,
    color: '#333',
  },
  monthlyDetilsItemValue: {
    fontSize: 16,
    color: 'rgb(12, 205, 182)',
  },
});

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
