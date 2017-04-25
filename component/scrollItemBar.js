import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
  AlertIOS
} from 'react-native';

import theme from '../config/theme';

export default class ScrollItemBar extends Component {
  constructor(props) {
     super(props);
     this.state={
       selectedIndex:0,
       items:[ ],
     }

  }

  render(){
    return(
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {
          this.props.items.map((item,i) => {
            return(
            <TouchableOpacity key={i} onPress={() => this._changeItem(i)}>
              {
              this.state.selectedIndex !== i
                ?
              <View style={styles.single}>
               <Text style={styles.btnTetx} numberOfLines={1}>{item.name}</Text>
              </View>
                :
              <View style={[styles.single,{backgroundColor:'red'}]}>
                <Text style={[styles.btnTetx,{color:'white'}]} numberOfLines= {1} >{item.name}</Text>
              </View>
             }
            </TouchableOpacity>
          )
          })
        }
      </ScrollView>
    )
  }
  _changeItem(i){
    this.setState({
      selectedIndex:i
    })
  }

}

const styles = StyleSheet.create({
  single:{
    height:22,
    width:80,
    borderRadius:3,
    backgroundColor:theme.baseColor,
    marginLeft:5,
    marginTop:10,
    marginRight:5,
    marginBottom:10
  },
  btnTetx:{
    textAlign:'center',
    fontSize:13,
    marginTop:4
  }
})
