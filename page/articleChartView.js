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
import ArticleChartListView from '../ListView/articleListView';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

var tabNames = ["日榜","周榜","月榜","总榜"];
export default class ArticleChart extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <View style={styles.container}>
        <CommonNavBar title='文章排行榜' needBack={true} backOnPress={() => MainPage.pageBack(this)} />
        <ScrollableTabView
                       renderTabBar={() => <ScrollableTabBar />}
                       tabBarBackgroundColor='white'
                       tabBarActiveTextColor="red"
                       tabBarInactiveTextColor="black"
                       tabBarTextStyle={{fontSize:theme.scrollView.fontSize}}
                       tabBarUnderlineStyle={theme.scrollView.underlineStyle}>
                       {tabNames.map((item, i) => {
                           return(
                              <ArticleChartListView tabLabel={item} id={i} sortType={i} key={i}/>
                           );
                       })
                     }
         </ScrollableTabView>
      </View>
    )
  }

 _renderNavRight(){
   return(
     <Button
       containerStyle={{marginRight:20, height:18, overflow:'hidden', borderRadius:4, backgroundColor: 'red'}}
       style={{fontSize:12, color: 'white',paddingLeft:3,paddingRight:3,paddingTop:2}}
      onPress={() => this._navRightBtnHandlePress()}>
      {'规则' + ' ?'}
    </Button>
   )
 }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  }
})
