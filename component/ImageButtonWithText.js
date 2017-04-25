'use strict';
import React, {Component, PropTypes} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';

export default class ImageButton extends Component {
  static propTypes = {
        text: PropTypes.string,
        image: PropTypes.number,
        icon: PropTypes.string,
        onPress: PropTypes.func,
        imgSize: PropTypes.number,
        fontSize: PropTypes.number,
        color: PropTypes.string,
        btnStyle: View.propTypes.style
    };
     static defaultProps = {
       imgSize:40,
       fontSize:13
     };
     render(){
       const {image,icon,onPress} = this.props;
       if (image) {
         return(
           <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
             {this._renderContentWithImage()}
           </TouchableOpacity>
         );
       }else if (icon) {
         return(
           <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
             {this._renderContentWithIcon()}
           </TouchableOpacity>
         );
       }
     }
     _renderContentWithImage(){
       const {text,image,color,imgSize,fontSize,btnStyle} = this.props;
       return(
         <View style={[styles.view, btnStyle]}>
           <Image source={{uri:image}} style={{width:imgSize,height:imgSize}}/>
           {text ?
             <Text style={[style.text, {fontSize:fontSize,color:color}]}>{text}</Text>
             :
             null
           }
         </View>
       );
     }
     _renderContentWithIcon(){
       const {text, icon, color, imgSize, fontSize, btnStyle} = this.props;
        return(
            <View style={[styles.view, btnStyle]}>
                <Icon name={icon} size={imgSize} color={color}/>
                {text ?
                    <Text style={{fontSize: fontSize, color: color}}>{text}</Text>
                    :
                    null
                }
            </View>
          );

     }
}

const styles = StyleSheet.create({
  view:{
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    color:'rgba(255,255,255,0.7)',
    marginTop:4
  }
});
