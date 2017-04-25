import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Image,
  DeviceEventEmitter
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import HomePageMainView from '../page/HomePage';
import FindPage from '../page/FindPage';
import MessagePage from '../page/MessagePage';
import MinePage from '../page/MinePage';
import GlobalStorage from  '../Storage/mainStorage';

export default class TabBar extends Component {
  static defaultProps = {
    selectedColor:'#eb4f38',
    normalColor:'white'
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedItem:'home',
      tabName:['首页','发现','消息','我的'],
      avatar:null
    };
  }
  componentDidMount(){

    var self = this;
    this.listener = DeviceEventEmitter.addListener('changeMine',function(url){

        self.setState({
          avatar:url
        })
    });
    GlobalStorage.get('avatar').then((result) => {
      this.setState({
        avatar:result
      })
    })
  }

  componentWillUnmount(){
      this.listener.remove();
  }


  render(){
    const {selectedColor} = this.props;
    const {tabName} = this.state;
    return(
      <TabNavigator
          hidesTabTouch={true}
          tabBarStyle={styles.tabbar}
          sceneStyle={{paddingBottom:styles.tabbar.height}}
        >
          <TabNavigator.Item
            tabStyle={styles.tabStyle}
            title={tabName[0]}
            selected={this.state.selectedItem === 'home'}
            selectedTitleStyle={{color:selectedColor}}
            renderIcon={() =>  <Image style={styles.tab} source={require('../images/tab/home_normal.png')} />}
            renderSelectedIcon={() => <Image style={styles.tab} source={require('../images/tab/home_focus.png')}/>}
            onPress={() => this.setState({selectedItem:'home'})}>
            {<HomePageMainView navigator={this.props.navigator} />}
          </TabNavigator.Item>

          <TabNavigator.Item
            tabStyle={styles.tabStyle}
            title={tabName[1]}
            selected={this.state.selectedItem === 'find'}
            selectedTitleStyle={{color:selectedColor}}
            renderIcon={() => <Image style={styles.tab} source={require('../images/tab/find_normal.png')}/>}
            renderSelectedIcon={() => <Image style={styles.tab} source={require('../images/tab/find_focus.png')}/>}
            onPress={() => this.setState({selectedItem:'find'})}>
            {<FindPage navigator={this.props.navigator} />}
          </TabNavigator.Item>
          <TabNavigator.Item
            tabStyle={styles.tabStyle}
            title={tabName[2]}
            selected={this.state.selectedItem === 'message'}
            selectedTitleStyle={{color:selectedColor}}
            renderIcon={() => <Image style={styles.tab} source={require('../images/tab/message_normal.png')}/>}
            renderSelectedIcon={() => <Image style={styles.tab} source={require('../images/tab/message_focus.png')}/>}
            onPress={() => this.setState({selectedItem:'message'})}>
            {<MessagePage navigator={this.props.navigator} />}
          </TabNavigator.Item>
          <TabNavigator.Item
            tabStyle={styles.tabStyle}
            title={tabName[3]}
            selected={this.state.selectedItem === 'mine'}
            selectedTitleStyle={{color:selectedColor}}
            renderIcon={() => this.state.avatar ? <Image style={styles.tabUser} source={{uri:this.state.avatar}} /> :<Image style={styles.tab} source={require('../images/tab/mine_normal.png')}/> }
            renderSelectedIcon={() => this.state.avatar ? <Image style={styles.tabUser} source={{uri:this.state.avatar}} /> : <Image style={styles.tab} source={require('../images/tab/mine_focus.png')}/>}
            onPress={() => this.setState({selectedItem:'mine'})}>
            {<MinePage navigator={this.props.navigator} />}
          </TabNavigator.Item>

        </TabNavigator>

      );
    }
};

const styles = StyleSheet.create({
  tabbar:{
    height:49,
    alignItems:'center',
    justifyContent:'center',
  },
  tabStyle:{
    padding:5
  },
  tab:{
    width:22,
    height:22,
  },
  tabUser:{
    width:24,
    height:24,
    borderRadius:12,
    borderColor:'white',
    borderWidth:1
  }

});
