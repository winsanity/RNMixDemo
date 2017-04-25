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
        <Image style={{width:SINGLEW-10,height:SINGLEW-10,marginTop:10,marginLeft:5,marginRight:5,marginBottom:10}} source={{uri:this.props.item.pic}}></Image>
        <Text style={styles.title}>{this.props.item.brand.name + ' ' + this.props.item.title}</Text>
        <View style={styles.bottomView}>
          <Text style={styles.price}>{'¥' + ' ' +this.props.item.price}</Text>
          <View style={styles.bottom_right}>
            <Text style={styles.likes}>{this.props.item.likes}</Text>
            <Icon name={'md-heart-outline'} size={14} color='gray'></Icon>
          </View>
        </View>
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
  },
  title:{
    fontSize:12,
    width:theme.screenWidth/2 - 20,
    textAlign:'center'
  },
  bottomView:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10
  },
  bottom_right:{
    flexDirection:'row',
    marginRight:10
  },
  price:{
    fontSize:10,
    color:'red',
    marginLeft:10
  },
  likes:{
    fontSize:10,
    color:theme.baseColor,
    marginRight:5
  }
})
