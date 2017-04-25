import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AlertIOS,
} from 'react-native';

import theme from '../config/theme';
import Button from 'react-native-button';
import NetworkUtil from '../Util/NetworkUtil';
import CacheableImage from 'react-native-cacheable-image';
import Swiper from 'react-native-swiper';


var margin = 5;
var imgW = (theme.screenWidth -  30)/3;

export default class FansAndAttentionCell extends Component {
  constructor(props) {
    super(props);
    this.state={
      loadedData:false,
      attention_type:0
    }
  }

  componentDidMount(){
    this.setState({
      attention_type:this.props.data.attention_type
    })
  }

  render(){

    var num1 = this.props.data.article_topic_count ?  this.props.data.article_topic_count : 0;
    var num2 = this.props.data.post_count ? this.props.data.post_count :0;
    return(
      <View style={styles.cellItem}>
          <View style={styles.top}>
            <View style={styles.top_left}>
              <Image source={{uri:this.props.data.avatar}} style={{width:30,height:30,borderRadius:15}} />
              <View>
                <Text style={styles.userName}>{this.props.data.nickname}</Text>
                <Text style={styles.time}>{'文章'+ num1 + '篇' + ' ' + '晒单' + num2 + '篇'}</Text>
              </View>
            </View>
            {
              this.state.attention_type === 0 ?
            <Text style={styles.attentionBtn} onPress={() => this._attentionBtnHandlePress()}>关注</Text>
            :
            <Text style={[styles.attentionBtn,{color:"#BFBFBF"}]} onPress={() => this._attentionBtnHandlePress()}>已关注</Text>
            }
          </View>
        <View style={styles.images}>
          {
            this.props.data.pics.map((item,i) => {
              return(
                <TouchableOpacity key={i}>
                  <Image source={{uri:item.url}} style={{width:imgW,height:imgW,marginLeft:5}} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

    )
  }

  _attentionBtnHandlePress(){
    this.setState({
      attention_type:this.state.attention_type === 1 ? 0 : 1
    })
  }
}

const styles = StyleSheet.create({
  cellItem:{
    width:theme.screenWidth,
  },
  top:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'

  },
  top_left:{
    flexDirection:'row',
    marginLeft:10,
    marginTop:10

  },
  attentionBtn:{
    color:'red',
    fontSize:13,
    marginRight:10,
    marginTop:15

  },
  userName:{
    fontSize:13,
    paddingLeft:10
  },
  time:{
    fontSize:10,
    paddingLeft:10,
    paddingTop:5,
    color:'#BFBFBF'
  },
  bottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10

  },
  bottom_left:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginLeft:10

  },
  title:{
    fontSize:15,
    paddingTop:5,
    paddingLeft:10,
    paddingRight:10,
  },
  line:{
    width:theme.screenWidth,
    height:0.5,
    backgroundColor:'#BFBFBF',
    marginTop:10
  },
  bottom_item:{
    flexDirection:'row',
    marginRight:20
  },
  numText:{
    paddingTop:4,
    paddingLeft:2,
    fontSize:13,
    color:'#BFBFBF'
  },

  images:{
    flexDirection:'row',
    alignItems:'flex-start',
    marginTop:10,
    marginBottom:15
  }

})
