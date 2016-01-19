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
import TimerMixin from 'react-timer-mixin';
import {openDb, toc, filter, fetch, loadNext, loadPrev} from './helpers';
import _ from 'lodash';

class ksaReactNativeTestSuite extends Component {

  state = {
    searchKeyword: ''
  };

  componentDidMount() {

    const q = wylie.fromWylieWithWildcard('བྱེད?བཅུག');

    toc()
      .then(() => {
        console.log('toc() done');
        return openDb();
      })
      .then(db => {
        console.log('openDb() done');
        return this.getSutra(db);
      })
      .then(fields => {
        console.log('fields', fields);
        return filter({q, 'phrase_sep': '།', field: 'head'});
      })
      .then(rows => {
        if (rows.length > 10) {
          rows.length = 10;
        }
        let uti = _.pluck(rows, 'uti');
        return fetch({q, uti});
      })
      .then(rows => {
        TimerMixin.setTimeout(() => {
          this.preload()
            .then(() => {
              console.log('preload done');
            })
            .catch(err => {
              console.log('err', err);
            });
        }, 0);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  getSutra = db => {
    return new Promise((resolve, reject) => {
      db.get([['fields', 'sutra'], ['fields', 'sutra_vpos'], ['fields', 'head']], fields => {
        resolve(fields);
      });
    });
  };

  preload = rows => {

    const q = wylie.fromWylieWithWildcard('བྱེད?བཅུག');

    return loadNext({q, uti: '1.2a', count: 5})
      .then(rows => {
        let vpos = rows[0]['vpos_end'];
        return toc({vpos});
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} autoFocus={true} placeholder={'Search in sutra'} value={this.state.searchKeyword}/>
      </View>
    );
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
