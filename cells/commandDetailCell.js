
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


export default class CommandDetailCell extends Component {
  constructor(props) {
    super(props);
    this.state={
      attention:null,
      praise:false,
      numPraise:0,
      comments:0
    }
  }
  componentDidMount(){
    this.setState({
      numPraise: this.props.data.post ? parseInt(this.props.data.post.dynamic.praises) : parseInt(this.props.data.topic.praises),
      attention: this.props.data.post ? this.props.data.post.user.attention_type : this.props.data.topic.user.attention_type,
      comments: this.props.data.post ? this.props.data.post.dynamic.comments : this.props.data.topic.comments,
      praise: this.props.data.post ? this.props.data.post.ispraise : this.props.data.topic.ispraise
  })
}

render(){
  var single = this.props.data.post ? this.props.data.post : this.props.data.topic;
  return(
    <View style={styles.cellItem}>
      <TouchableOpacity>
        <View style={styles.top}>
          <View style={styles.top_left}>
            <Image source={{uri:single.user.avatar}} style={{width:30,height:30,borderRadius:15}} />
            <View>
              <Text style={styles.userName}>{single.user.nickname}</Text>
              <Text style={styles.time}>{single.datestr}</Text>
            </View>
          </View>
          {
            this.state.attention === 0 ?
          <Text style={styles.attentionBtn} onPress={() => this._attentionBtnHandlePress()}>关注</Text>
          :
          <Text style={[styles.attentionBtn,{color:"#BFBFBF"}]} onPress={() => this._attentionBtnHandlePress()}>已关注</Text>
          }
        </View>
        <Image style={{width:theme.screenWidth - 20,height:180,marginLeft:10,marginRight:10,marginTop:10}} source={{uri:single.pics[0].url}}/>
        <Text style={styles.title} numberOfLines={2}>{this.props.data.topic ? this.props.data.topic.title : this.props.data.post.content }</Text>
        <View style={styles.bottom}>
          <View style={styles.bottom_left}>

              <View style={styles.bottom_item}>
                <TouchableOpacity onPress={() => this._praiseBtnClick()}>
                {
                  !this.state.praise ?
                 <Icon name='md-thumbs-up' size={20} color='#BFBFBF' />
                 :
                 <Icon name='md-thumbs-up' size={20} color='#EF4836' />
                }
                </TouchableOpacity>
                <Text style={styles.numText}>{this.state.numPraise}</Text>
              </View>

            <View style={styles.bottom_item}>
                <Icon name='ios-chatboxes' size={20} color='#BFBFBF' />
                <Text style={styles.numText}>{this.props.data.post ? this.props.data.post.dynamic.comments : this.props.data.topic.comments}</Text>
            </View>
            <TouchableOpacity onPress={() => AlertIOS.alert('分享')}>
              <View style={styles.bottom_item}>
               <Icon name='md-share-alt' size={20} color='#BFBFBF'/>
               <Text style={styles.numText}>分享</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{color:'#BFBFBF',fontSize:13,marginRight:10}}>{this.props.data.post ? this.props.data.post.dynamic.views : this.props.data.views +  ' 浏览'}</Text>
        </View>
        <View style={styles.line}></View>
      </TouchableOpacity>

    </View>

  );
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

_praiseBtnClick(){

  if (this.state.praise) {
    AlertIOS.alert('您已经点过赞了');
  }else {
    this.setState({
      praise:true,
      numPraise:this.state.numPraise + 1
    })
  }



}

}
const styles = StyleSheet.create({
  cellItem:{
    width:theme.screenWidth,
    backgroundColor:'white'
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
  }

})
