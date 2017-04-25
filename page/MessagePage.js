import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';

import CommonNavBar from '../component/commonNavBar';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';

var  listData = [
  {
    iconSource:'ios-contact-outline',
    title:'新的粉丝'
  },
  {
    iconSource:'ios-chatboxes-outline',
    title:'新的评论'
  },
  {
    iconSource:'ios-heart-outline',
    title:'新的喜欢'
  },
  {
    iconSource:'ios-medal-outline',
    title:'新的奖励'

  },
  {
    iconSource:'ios-alert-outline',
    title:'新的通知'
  }
];


export default class MessagePage extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1 !== r2
    });
    this.state = {
      dataSource:ds.cloneWithRows(listData)
    }
  }
  _itemClickCallback(rowData){
    alert(rowData.title);
  }

  _renderItem(rowData,sectionID,rowID){
     return(
       <TouchableOpacity
         onPress={this._itemClickCallback.bind(this, rowData)}
         activeOpacity={theme.btnActiveOpacity}
       >
       {this._renderItemContent(rowData)}
       </TouchableOpacity>

     );
  }
  _renderItemContent(rowData){
    return(
      <View style={{width:theme.screenWidth,height:55}}>
      <View style={styles.item}>
        <View style={styles.leftItem}>
        <Icon name={rowData.iconSource} size={25} color='#eb4f38' style={styles.headImg}/>
        <Text style={styles.titleText}>{rowData.title}</Text>
       </View>
        <Icon name={'ios-arrow-forward-outline'} size={25} color='gray' style={styles.rightImg}/>
      </View>
      <View style={{width:theme.screenWidth,height:0.7,backgroundColor:'#D3D3D3'}}></View>
    </View>
    );
  }
  render(){
    return(
      <View style={styles.container}>
      <CommonNavBar title='消息' needBack={false} />
      <ListView
        scrollEnabled={false}
        dataSource={this.state.dataSource}
        renderRow={this._renderItem.bind(this)}
        renderHeader={null}
     />
     </View>
    );
  }


}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.pageBackgroundColor
  },
  item:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:theme.screenWidth,
    height:54,
    backgroundColor:'white'
  },
  leftItem:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  titleText:{
    paddingLeft:20,
    fontSize:15,
    color:'gray'
  },
  headImg:{
    paddingLeft:20,
  },
  rightImg:{
    right:15
  }

})
