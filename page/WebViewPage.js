import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AlertIOS,
  ListView,
  TouchableHighlight
} from 'react-native';

import PageLoading from '../component/pageLoadingView';

export default class WebView extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <PageLoading />
    )
  }


}
