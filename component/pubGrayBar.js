import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';

import theme from '../config/theme';
import * as Animatable from 'react-native-animatable';

export default class PublicGrayBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex:0
    }
  }
  componentDidMount(){
    this.setState({
      selectedIndex:this.props.selectedIndex
    })
  }

  render(){
    return(
      <View style={styles.bgView}>
        {
          this.props.tabNames.map((item,i) => {
            return(
              this.state.selectedIndex !== i ?
              <TouchableOpacity key={i} onPress={() => this._itemClick(i)}>
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity key={i} >
                <Text style={[styles.text,{color:'red'}]}>{item}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    )
  }

  _itemClick(i){
    DeviceEventEmitter.emit('changeItem',i);
    this.setState({
      selectedIndex:i
    });
  }
}

const styles = StyleSheet.create({
  bgView:{
   flexDirection:'row',
   width:theme.screenWidth - 20,
   height:35,
   backgroundColor:'black',
   opacity:0.8,
   justifyContent:'space-between',
   alignItems:'center'
 },
 text:{
   color:theme.baseColor,
   marginLeft:10,
   marginRight:10,
   fontSize:14
 }
})
