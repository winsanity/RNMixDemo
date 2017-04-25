import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  DeviceEventEmitter,
} from 'react-native';

import SingleItemView from '../component/SingleItem';
import PublicGrayBar from '../component/pubGrayBar';
import * as Animatable from 'react-native-animatable';
import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';
import PageLoading from '../component/pageLoadingView';
import ScrollItemBar from '../component/scrollItemBar';

var offY = 0;

export default class CommonCollectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postArray : [ ],
      loadedData:false,
      sortType:0,
    }

  }
  componentDidMount(){
    this._getPostData(0);
    var self = this;
    this.listener = DeviceEventEmitter.addListener('changeItem',function(i){
        self.setState({
          sortType:i,
          loadedData:false
        })
        self._getPostData(0);
    });
  }

  _getPostData(page){
    var that = this;
    let data = theme.BaseRequestListData;
    data.id = that.props.item.id;
    data.sort_type = that.state.sortType;
    var url = this.props.item.type_id === 3 ?  theme.kBaseURL + 'post/post/listByScene' : theme.kBaseURL + 'post/post/listByCate';
    NetworkUtil.get(url,data,function(get){
      var jsonData = get.data;
      var array = [ ];
      for (var i = 0; i < jsonData.post.length; i++) {
          array.push(jsonData.post[i]);
      }
      that.setState({
        loadedData:true,
        postArray : array
      })
    })
  }

  render(){
    return(
    <View style={{flex:1}}>
      {
      this.state.loadedData ?
      <ScrollView
        ref="scrollview"
        onScroll={ (e)=> this.onAnimationEnd(e)}
        style={{marginTop: this.props.item.type_id !== 3 ? 40 : 0}}>
        <View style={styles.activityContainer}>
         {
           this.state.postArray.map((item,i) => {
             return(
              <SingleItemView key={i} item={item} />
            );
           })
         }
        </View>
      </ScrollView>
      :
      <PageLoading />
    }
      <Animatable.View style={styles.floatView} ref="floatView">
        <PublicGrayBar tabNames={["默认","最受欢迎","最新"]} selectedIndex={0} />
      </Animatable.View>
    </View>
    )
  }

  onAnimationEnd(e){
    var offSetY = e.nativeEvent.contentOffset.y;
    if (offSetY < offY) {
         this.refs.floatView.transitionTo({bottom:30})
    }else {
      this.refs.floatView.transitionTo({bottom:- 35})
    }
    offY = offSetY;

  }


}

const styles = StyleSheet.create({
  activityContainer:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    marginLeft:5,
    marginRight:5
  },
  floatView:{
    position:'absolute',
    bottom:-35,
    zIndex:1,
    left:10
  },

})
