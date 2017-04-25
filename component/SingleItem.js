import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import theme from '../config/theme';
import CacheableImage from 'react-native-cacheable-image';
import Icon from 'react-native-vector-icons/Ionicons';

var SINGLEW = (theme.screenWidth-10) / 2 ;
export default class  SingleItemView extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
    <TouchableWithoutFeedback>
      <View>
        <Image style={{width:SINGLEW-10,height:SINGLEW-10,marginTop:10,marginLeft:5,marginRight:5,marginBottom:10}} source={{uri:this.props.item.pics ? this.props.item.pics[0].url : this.props.item.middle_pic_url}}></Image>
        <View style={styles.middleView}>
          <View style={styles.middle_left}>
            <Image  style={{width:20,height:20,borderRadius:10}} source={{uri:this.props.item.user.avatar}}/>
            <Text style={styles.nickName}>{this.props.item.user.nickname}</Text>
          </View>
          <View style={styles.middle_right}>
              <Icon name={'md-heart-outline'} size={15} color='gray'></Icon>
              <Text style={styles.nickName}>{this.props.item.dynamic.praises}</Text>
          </View>
        </View>
        <Text style={styles.content} numberOfLines={2}>{this.props.item.content}</Text>
      </View>
    </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  middleView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginLeft:5,
    marginRight:5,
  },
  nickName:{
    fontSize:12,
    color:theme.baseColor,
    paddingLeft:3
  },
  middle_left:{
    flexDirection:'row',
    alignItems:'center',
  },
  middle_right:{
    flexDirection:'row',
    alignItems:'center'
  },
  content:{
    fontSize:13,
    color:theme.baseColor,
    width:SINGLEW,
    marginTop:10
  }
})
