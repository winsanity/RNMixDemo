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
import Button from 'react-native-button';
import NetworkUtil from '../Util/NetworkUtil';
import CacheableImage from 'react-native-cacheable-image'

var margin = 5;
var imgW = (theme.screenWidth -  30)/3;


export default class ExpertChartCell extends Component{
  constructor(props) {
    super(props);
    this.state={
      attention:null
    }
  }

  componentDidMount(){
    this.setState({
      attention:this.props.data.attention_type,
    })
  }

    render(){
      return(
        <View style={styles.cellItem}>
          <View style={styles.top}>
            <View style={styles.top_left}>
              <Image style={{width:22,height:22,borderRadius:11}} source={{uri:this.props.data.avatar}}/>
              <View>
                <Text style={styles.nickname}>{this.props.data.nickname}</Text>
                <Text style={styles.rankCount}>{'周贡献值'+this.props.data.rank_count}</Text>
              </View>
            </View>
            {
             this.state.attention === 0 ?
            <Button
              containerStyle={{marginRight:10, height:20, overflow:'hidden', borderRadius:4, backgroundColor: 'red'}}
              style={{fontSize:12, color: 'white',paddingTop:3,paddingLeft:3,paddingRight:3}}
              onPress={() => this._attentionBtnHandlePress()}>
             ＋ 关注
           </Button>
           :
           <Button
             containerStyle={{marginRight:10, height:20, overflow:'hidden', borderRadius:4, backgroundColor: '#BFBFBF'}}
             style={{fontSize:12, color: 'white',paddingTop:3,paddingLeft:3,paddingRight:3}}
             onPress={() => this._attentionBtnHandlePress()}>
             已关注
          </Button>
           }
          </View>
          <View style={styles.images}>
            {
              this.props.data.pics.map((item,i) => {
                return(
                  <TouchableOpacity key={i}>
                    <Image source={{uri:item.url}} style={{width:imgW,height:imgW,marginLeft:5}}/>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <View style={{width:theme.width,height:3,backgroundColor:'#ECF0F1'}}></View>

       </View>
      )
    }

  _attentionBtnHandlePress(){
    if (this.state.attention === 1) {
      AlertIOS.alert('取消了关注');

    }else {
      AlertIOS.alert('关注成功');
    }

    this.setState({
      attention: this.state.attention === 1 ? 0 : 1
    })

}
}
const styles = StyleSheet.create({
  item:{
    width:theme.screenWidth,
    backgroundColor:'#BFBFBF'
  },
  top:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  top_left:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:10,
    marginTop:10
  },
  nickname:{
    fontSize:13,
    paddingLeft:10
  },
  rankCount:{
    fontSize:11,
    paddingLeft:10,
    color:'#BFBFBF'
  },
  images:{
    flexDirection:'row',
    alignItems:'flex-start',
    marginTop:10,
    marginBottom:15
  }
})
