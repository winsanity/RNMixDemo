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
  TouchableHighlight,
  DeviceEventEmitter,
  ActionSheetIOS
} from 'react-native';

import ImageButton from '../component/ImageButtonWithText';
import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';
import Icon from 'react-native-vector-icons/Ionicons';

import GlobalStorage from  '../Storage/mainStorage';
import PageLoading from '../component/pageLoadingView';
import MainPage from './MainPage';

import Json from './minePage.json';


var AlphabetListView = require('react-native-alphabetlistview');

var BUTTONS = [
   '修改头像',
   '修改昵称和个性签名',
   '取消',
];

var CANCEL_INDEX = 2;
var userInfo = {};

export default class MinePageListView extends Component {
  constructor(props) {
    super(props);
    var getSectionData = (dataBlob,sectionID) => {
      return dataBlob[sectionID];
    };

    var getRowData = (dataBlob,sectionID,rowID) => {
      return dataBlob[sectionID + ':' + rowID];
    };


    this.state = {
       dataSource:new ListView.DataSource({
         getSectionData:getSectionData,
         getRowData:getRowData,
         rowHasChanged:(r1,r2) => r1 !== r2,
         sectionHeaderHasChanged:(s1,s2) => s1 !== s2,
         userInfo:{},
         loadedData:false
       })
    }

  }

  _renderHeader(){

    return(
      this.state.loadedData ?
      <Image style={styles.backgroundImg}>
        <TouchableOpacity onPress={() => this._onChangePersonalInfo()}>
        <Image style={styles.headImg} source={{uri:this.state.userInfo.avatar}}></Image>
        <Text style={styles.nickName}>{this.state.userInfo.nickname}</Text>
        <Text style={styles.personSign}>{this.state.userInfo.user_sign}</Text>
        </TouchableOpacity>
        <View style={styles.bottomItem}>
          <View style={{flex:1}}></View>
          <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity>
              <Text style={styles.numText}>{this.state.userInfo.article_like ? this.state.userInfo.article_like.length : 0 }</Text>
              <Text style={styles.funText}>获赞</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => MainPage.switchToFansAndAttentionsPage(0)}>
              <Text style={styles.numText}>{this.state.userInfo.attentions}</Text>
              <Text style={styles.funText}>关注</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => MainPage.switchToFansAndAttentionsPage(1)}>
              <Text style={styles.numText}>{this.state.userInfo.fans ? this.state.userInfo.fans.length : 0}</Text>
              <Text style={styles.funText}>粉丝</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1}}></View>
        </View>

      </Image> : <PageLoading />
    )

  }

  componentDidMount(){
    this._getUserInfo();
    this._loadListViewDataFromJson();
    var self = this;
    this.listener = DeviceEventEmitter.addListener('updataUserInfo',function(url){
         self._getUserInfo();
    });


  }
  _loadListViewDataFromJson(){
    var jsonData = Json.data;

    var dataBlob = {},
    sectionIDs =[],
    rowIDs = [];

    for (var i = 0; i < jsonData.length; i++) {
      sectionIDs.push(i);
      dataBlob[i] = jsonData[i].title;

      rowIDs[i] = [ ];

      var cells = jsonData[i].cells;

      for (var j = 0; j < cells.length; j++) {
        rowIDs[i].push(j);

        dataBlob[i +':'+j] = cells[j];
      }


    }


    this.setState({
      dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs)
    });

  }

 _onChangePersonalInfo(){
   ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        MainPage.switchToImagePicker();
      }else if (buttonIndex === 1) {
        MainPage.switchToChangeInfoPage();
      }else {
        return;
      }
    }
    );
  }


 render(){
   return(
     <ListView
       dataSource={this.state.dataSource}
       renderRow={this._renderRow.bind(this)}
       renderSectionHeader={this._renderListSectionHeader.bind(this)}
       renderHeader={this._renderHeader.bind(this)}

     />
   )

 }
 _renderRow(rowData,sectionID,rowID){
   return(
     <TouchableOpacity>
       <View style={styles.cellItem}>

          <Icon name={rowData.icon} size={20} color={rowData.color} style={styles.cellImg}/>
          <Text style={styles.cellTitle}>{rowData.name}</Text>
         <Icon name='ios-arrow-forward-outline' size={20} color='#BFBFBF' style={{position:'absolute',right:15}}/>
       </View>
       <View style={{width:theme.screenWidth,height:1,backgroundColor:'#EEEEEE'}}></View>
     </TouchableOpacity>
   )
 }
 _renderListSectionHeader(sectionID){
   return(
     <View style={{width:theme.screenWidth,height:8,backgroundColor:'#EEEEEE'}}></View>
   )
 }


  _getUserInfo(){
    var that = this;
    let data = theme.BaseRequestData;
    data.visit_user_id = '2855572';
    var url =theme.kBaseURL + 'users/center/userInfo';
    NetworkUtil.get(url,data,function(set){
    var jsonData = set.data;

    //注册监听事件，时间名称：changeMine  传参：jsonData.avatar（头像url）
    DeviceEventEmitter.emit('changeMine',jsonData.avatar);

    GlobalStorage.save('avatar',jsonData.avatar);
    GlobalStorage.save('nickname',jsonData.nickname);
    GlobalStorage.save('user_sign',jsonData.user_sign);

      that.setState({
        loadedData:true,
        userInfo:{
          avatar:jsonData.avatar,
          nickname:jsonData.nickname,
          user_sign:jsonData.user_sign,
          fans:jsonData.fans,
          attentions:jsonData.attentions,
          article_like:jsonData.article_like,
          article_topic_count:jsonData.article_topic_count,
          total_coins:jsonData.total_coins
        }
      })
    })

  }

  componentWillUnmount(){
      this.listener.remove();
  }

}

const styles = StyleSheet.create({
  backgroundImg:{
    width:theme.screenWidth,
    height:230
  },
  headImg:{
    marginTop:64,
    marginLeft:theme.screenWidth/2 - 25,
    width:50,
    height:50,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'
  },
  cellTitle:{
    fontSize:14,
    marginLeft:15
  },
  cellItem:{
    flexDirection:'row',
    width:theme.screenWidth,
    height:50,
    alignItems:'center'
  },
  cellImg:{
    width:25,
    height:25,
    marginLeft:15
  },
  nickName:{
    fontSize:13,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:10
  },
  personSign:{
    fontSize:11,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:10,
    color:'#BDC3C7'
  },
  bottomItem:{
    flexDirection:'row',
    marginTop:10,
    alignItems:'center',
    height:50,
    justifyContent:'space-between'
  },
  numText:{
    paddingLeft:10,
    paddingRight:10,
    textAlign:'center',
    fontSize:16,
    fontFamily: 'Cochin',
    fontWeight:'bold'
  },
  funText:{
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    textAlign:'center',
    fontSize:11,
    color:'#BDC3C7'
  }
})
