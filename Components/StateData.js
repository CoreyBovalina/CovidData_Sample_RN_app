import React, {Component} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {Picker} from '@react-native-community/picker';

class StateData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      language: '',
      dataSource: [],
      stateData: [],
    };
  }

  componentDidMount() {
    this.GetStateData();
  }

  GetStateData() {
    fetch('https://covidtracking.com/api/v1/states/current.json')
      .then((response) => response.json())
      .then((json) => {
        this.setState({dataSource: json});
      })

      .catch((error) => {
        console.error(error);
      });
  }

  getItemContent(state) {
    if (this.state.dataSource.length > 0) {
      var data = {};
      fetch(`https://covidtracking.com/api/v1/states/${state}/current.json`)
        .then((response) => response.json())
        .then((json) => {
          console.log('json:', json);
          this.setState({stateData: json});
        });
      console.log(data);
      return (
        <Text style={styles.text}>Number Hospitalized: {data.positive}</Text>
      );
    }
    return <Text style={styles.text}>Nothing to see here</Text>;
  }

  componentWillUnmount() {
    console.log('component unmounted');
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1.5}}>
              <Text style={styles.text}>Select State:</Text>
            </View>
            <View style={{flex: 1}}>
              <Picker
                selectedValue={this.state.language}
                onValueChange={(itemValue, itemIndex) => {
                  data = this.getItemContent(itemValue);
                  console.log('Item Value:', data);
                  this.setState({
                    language: itemValue,
                    item: data,
                  });
                }}>
                <Picker.Item key="" value="" label="" />
                {this.state.dataSource.map((item) => {
                  return (
                    <Picker.Item
                      key={item.state}
                      value={item.state}
                      label={item.state}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Text style={styles.text}>
                Confirmed Positive: {this.state.stateData.positive}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.text}>
                Confirmed Negative: {this.state.stateData.negative}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.text}>
                Total Tests: {this.state.stateData.total}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#2f354b',
    textAlign: 'center',
  },
});

export default StateData;
