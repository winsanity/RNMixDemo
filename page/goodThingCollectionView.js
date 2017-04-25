import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  DeviceEventEmitter,
} from 'react-native';

import SingleGTView from '../component/singleGTView';
import PublicGrayBar from '../component/pubGrayBar';
import * as Animatable from 'react-native-animatable';
import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';
import PageLoading from '../component/pageLoadingView';

var offY = 0;

export default class GoodThingCollectionPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      loadedData:false,
      dataArray:[ ],
      sortType:0,
      id:this.props.item.id
    }
  }


  componentDidMount(){
    this._getListData();
  }

  _getListData(){

    var that = this;
    let data = theme.BaseRequestListData;
    data.id = that.state.id;
    data.sort_type = that.state.sortType;

    var url =  theme.kBaseURL + 'products/brandProduct/listByCate';
    NetworkUtil.get(url,data,function(get){
      var jsonData = get.data;
      var array =[ ];
      for (var i = 0; i < jsonData.product.length; i++) {
         array.push(jsonData.product[i]);
      }
      that.setState({
        dataArray :array,
        loadedData:true
      });
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
          style={{marginTop: this.props.item.type_id !== 3 ? 40 : 0}}
          >
          <View style={styles.activityContainer}>
           {
             this.state.dataArray.map((item,i) => {
               return(
                <SingleGTView key={i} item={item} />
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
    left:10,
    backgroundColor:'white'
  },
})
