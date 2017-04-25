import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import SingleItemView from '../component/SingleItem';

import * as Animatable from 'react-native-animatable';
import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';
import PageLoading from '../component/pageLoadingView';

export default  class ActivityCollectionView extends Component {
  constructor(props){
    super(props);
    this.state={
      postArray:[ ],
      loadedData:false
    }

  }

  componentDidMount(){
    this._getPostData(0);
  }

  _getPostData(page){
    var that = this;
    let data = theme.BaseRequestListData;
    data.page = page;
    data.id  = this.props.id;
    data.sort_type = this.props.sortType
    var url =theme.kBaseURL + 'activity/post/listByActivity';
    NetworkUtil.get(url,data,function(get){
      var jsonData = get.data;

      var array = [ ];
      for (var i = 0; i < jsonData.post.length; i++) {
          array.push(jsonData.post[i]);
      }
      that.setState({
        postArray:array,
        loadedData:true
      });

    })
  }

  render(){
    return(
    this.state.loadedData ?
     <ScrollView
       scrollEnabled={false}
       >
        <View style={styles.container}>
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
  );

  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    marginLeft:5,
    marginRight:5,
    backgroundColor:'white'
  }
})
