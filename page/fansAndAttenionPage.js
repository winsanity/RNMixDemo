import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  TouchableOpacity,
  Image,
  AlertIOS,
  RefreshControl,
  ScrollView
} from 'react-native';

import theme from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import NetworkUtil from '../Util/NetworkUtil';
import MainPage from './MainPage';
import CommonNavBar from '../component/commonNavBar';
import Button from 'react-native-button';
import FansAndAttentionListView from '../ListView/fansAndAttentionListView';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

var tabNames = ["关注","粉丝"];
export default class ExpertChart extends Component {

  constructor(props){
    super(props);
    this.state={

    }
}
    render(){

       return(
          <View style={{flex:1,backgroundColor:'white'}}>
            <CommonNavBar title='关注／粉丝' needBack={true} backOnPress={() => MainPage.pageBack(this)} />
            <ScrollableTabView
                           renderTabBar={() => <ScrollableTabBar />}
                           tabBarBackgroundColor='white'
                           tabBarActiveTextColor="red"
                           tabBarInactiveTextColor="black"
                           tabBarTextStyle={{fontSize:theme.scrollView.fontSize}}
                           tabBarUnderlineStyle={theme.scrollView.underlineStyle}
                           initialPage={this.props.type}>
                           {tabNames.map((item, i) => {
                               return(
                                  <FansAndAttentionListView tabLabel={item} id={i} key={i} type={i}/>
                               );
                           })
                         }
             </ScrollableTabView>

          </View>
        )
    }

}
