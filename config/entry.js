'use strict';

import React ,{ Component } from 'react';
import {Navigator,DeviceEventEmitter} from 'react-native';

import MainPage from '../page/MainPage';

// import SplashScreen from '../native_modules/SplashScreen';

export default class Navigation extends Component {
    render(){
      return(
        <Navigator
          initialRoute={{component:MainPage}}
          renderScene={(route,navigator) => {
            return <route.component navigator={navigator} {...navigator.params} />
          }}
        />
      );
    }

}
