import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  AlertIOS,
  DeviceEventEmitter
} from 'react-native';

import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';
import MainPage from './MainPage';
import CommonNavBar from '../component/commonNavBar';
import GlobalStorage from  '../Storage/mainStorage';

export default class ChangeInfo extends Component {
  constructor(props) {
    super(props)
    this.state={
      nickname:null,
      user_sign:null
    }

  }

  componentDidMount(){
    GlobalStorage.get('nickname').then((result) => {
      this.setState({
        nickname:result,

      })
    })
    GlobalStorage.get('user_sign').then((result) => {
      this.setState({
        user_sign:result,

      })
    })
  }
  render(){
    return(
      <View style={styles.container}>
        <CommonNavBar title='个人资料' needBack={true} backOnPress={() => MainPage.pageBack(this)}  rightStyle={<Text style={styles.save} onPress={() => this._saveChanges()}>保存</Text>}/>
        <View style={styles.nickname}>
          <Text style={styles.nameText}>昵称：</Text>
          <TextInput
         style={styles.textInput}
         onChangeText={(text) => this.setState({nickname:text})}
         defaultValue={this.state.nickname}
         clearButtonMode='while-editing'
      />
        </View>
        <View style={styles.nickname}>
          <Text style={styles.nameText}>个性签名：</Text>
          <TextInput
         style={styles.textInput2}
         onChangeText={(text) => this.setState({user_sign:text})}
         defaultValue={this.state.user_sign}
         clearButtonMode='while-editing'
         multiline={true}
         placeholder='(14个字)'
      />
        </View>
      </View>
    )
  }

  _saveChanges(){
    var that = this;
    let data = theme.BaseRequestListData;
    data.sign = this.state.user_sign;
    data.nickname = this.state.nickname;
    var url =theme.kBaseURL + 'user/nickname';
    NetworkUtil.get(url,data,function(set){
      if (set.status === 1) {
        AlertIOS.alert('修改成功');
        DeviceEventEmitter.emit('updataUserInfo',1);
      }
      MainPage.pageBack(that);
    })
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#DADFE1'
  },
  save:{
    fontSize:14,
    color:theme.baseColor,
    marginRight:15,
    paddingTop:3
  },
  // sepView:{
  //   width:theme.screenWidth,
  //   height:5,
  //   backgroundColor:'#DADFE1'
  // },
  nickname:{
    flexDirection:'row',
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'white',

  },
  nameText:{
    paddingLeft:15,
    color:theme.baseColor,
    paddingTop:15,
    paddingBottom:15
  },
  textInput:{
    height:15,
    width:theme.screenWidth - 100,
    marginTop:15,
    marginBottom:15,
    fontSize:14,
    color:'#BDC3C7',
  },
  textInput2:{
    height:60,
    width:theme.screenWidth - 130,
    marginTop:9,
    marginBottom:15,
    fontSize:14,
    color:'#BDC3C7',
  },

})
