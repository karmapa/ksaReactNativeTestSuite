/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import kde from 'ksana-database';
import ksa from 'ksana-simple-api';
import wylie from 'tibetan/wylie';

class ksaReactNativeTestSuite extends Component {

  componentDidMount() {

    const options = {
      db: 'jiangkangyur',
      q: wylie.fromWylieWithWildcard('-'),
      uti: ['1.1a']
    };

    ksa.fetch(options, (err, rows) => {
      if (err) {
        console.log('ksa.fetch err: ', err);
      }
      else {
        console.log('ksa.fetch rows: ', rows);
      }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ksaReactNativeTestSuite', () => ksaReactNativeTestSuite);
