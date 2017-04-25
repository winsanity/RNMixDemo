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
  ScrollView,
  TouchableHighlight
} from 'react-native';

import theme from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import NetworkUtil from '../Util/NetworkUtil';
import MainPage from '../page/MainPage';

export default class CommonListCell extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {this._itemClickCallback(this.props.rowData)}}
          activeOpacity={theme.btnActiveOpacity}
        >
         <Image style={{width:theme.screenWidth-20,height:180,marginTop:10}} source={{uri:this.props.rowData.pic}}/>
         </TouchableOpacity>
        <Text style={styles.titleText}>{this.props.rowData.title}</Text>
        <View style={styles.bottom}>
          <Text style={{fontSize:12}}>{this.props.rowData.user.nickname}</Text>
          <View style={styles.smallLine}></View>
          <Icon name={'ios-eye-outline'} size={20} color='gray'></Icon>
          <Text style={{fontSize:11,color:'gray',marginLeft:5,marginRight:5}}>{this.props.rowData.views}</Text>
          <Icon name={'md-heart-outline'} size={15} color='gray'></Icon>
          <Text style={{fontSize:11,color:'gray',marginLeft:5,marginRight:5}}>{this.props.rowData.likes}</Text>
        </View>
        <View style={styles.lineView}></View>
      </View>
    )
  }

  _itemClickCallback(rowData){
    MainPage.switchToInfoListPage(this,rowData);
  }
}

const styles = StyleSheet.create({
  item:{
    width:theme.screenWidth,
    height:250,
    justifyContent:'center',
    alignItems:'center'
  },
  titleText:{
    width:theme.screenWidth,
    height:30,
    paddingTop:5,
    textAlign:'center',
    fontSize:16,
    color:'black'
  },
  numText:{
    width:theme.screenWidth,
    height:20,
    textAlign:'center',
    fontSize:13,
    color:'gray'
  },
  lineView:{
    width:theme.screenWidth,
    height:0.3,
    backgroundColor:'gray',
    opacity:0.7,
    marginTop:7
  },
  bottom:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  smallLine:{
    height:10,
    width:1,
    backgroundColor:'gray',
    marginLeft:5,
    marginRight:5
  }
});
