import React, {Component,PropTypes} from 'react';
import {StyleSheet,View,Text,Platform} from 'react-native';
import ImageButton from '../component/ImageButtonWithText';
import theme from '../config/theme';
import { BlurView, VibrancyView } from 'react-native-blur';

export default class CommonNavBar extends Component {
  static propTypes = {
    title:PropTypes.string.isRequired,
    backOnPress : PropTypes.func
  };
  constructor(props){
    super(props);
  }

  render(){
      if (this.props.needBack) {
        return(
          <View>
          <View style={styles.toolbar}>
            <ImageButton icon="ios-arrow-back" color="#BFBFBF" imgSize={25} btnStyle={styles.imgBtn} onPress={this.props.backOnPress}/>
            <Text style={styles.title}>{this.props.title}</Text>
            {this.props.rightStyle ? this.props.rightStyle : <View style={{width:25,height:25,marginLeft:20}}></View>}
          </View>
          <View style={{width:theme.screenWidth,height:0.5,backgroundColor:'#BFBFBF',opacity:0.5}}></View>
          </View>
        );
      }
      else {
        return(
        <View style={styles.toolbar2}>
          <Text style={styles.title2}>{this.props.title}</Text>
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  toolbar:{
    height:theme.actionBar.height,
    width:theme.screenWidth,
    backgroundColor:theme.actionBar.backgroundColor,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingTop:20
  },
  toolbar2:{
    height:theme.actionBar.height,
    width:theme.screenWidth,
    backgroundColor:theme.actionBar.backgroundColor,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:20
  },
  imgBtn:{
    width:49,
    height:49
  },
  title:{
    color:theme.actionBar.fontColor,
    fontSize:theme.actionBar.fontSize,
  },
  title2:{
    color:theme.actionBar.fontColor,
    fontSize:theme.actionBar.fontSize,
  },
})
