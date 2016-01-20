/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';

import kde from 'ksana-database';
import ksa from 'ksana-simple-api';
import wylie from 'tibetan/wylie';

class ksaReactNativeTestSuite extends Component {

  state = {
    searchKeyword: '',
    dbDone: false
  };

  componentDidMount() {
    kde.open('jiangkangyur', (err, engine) => {
      this.engine = engine;
      this.setState({dbDone: true});
    });
  }

  handleChangeText = text => {

    if (this.engine.busy) {
      console.log('busy');
      return;
    }

    this.setState({searchKeyword: text});

    const query = wylie.fromWylieWithWildcard(text);

    console.log('query: ', query);

    const options = {
      db: 'jiangkangyur',
      q: query,
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
  };

  render() {
    if (this.state.dbDone) {
      return (
        <View style={styles.container}>
          <TextInput style={styles.input} autoFocus={true} onChangeText={this.handleChangeText} placeholder={'Search in sutra'} value={this.state.searchKeyword}/>
        </View>
      );
    }
    return false;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    paddingLeft: 14,
    paddingRight: 14
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#555555',
    borderRadius: 4,
    borderWidth: 1,
    color: '#555555',
    fontSize: 18,
    height: 50,
    padding: 7
  }
});

AppRegistry.registerComponent('ksaReactNativeTestSuite', () => ksaReactNativeTestSuite);
