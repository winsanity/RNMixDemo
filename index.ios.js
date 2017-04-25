/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import MainPage from './page/MainPage';

export default class RNMixDemo extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{component:MainPage}}
        renderScene = {(route,navigator) => {
          return <route.component navigator={navigator} {...route.params}/>
        }}
      />

    );
  }
}


AppRegistry.registerComponent('RNMixDemo', () => RNMixDemo);
