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
import PageLoading from '../component/pageLoadingView';
import Button from 'react-native-button';
import NetworkUtil from '../Util/NetworkUtil';
import ShineChartCell from '../cells/shineChartCell';
const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2) => r1 !== r2
});


export default class ArticleListView extends Component {
  constructor(props) {
    super(props);
    this.state={
      loadedData:false,
      dataSource:ds
    }
  }

  componentDidMount(){

      this._getListData();

  }
  _getListData(){
    var that = this;
    let data = theme.BaseRequestListData;
    data.sort_type = this.props.sortType;
    var url =theme.kBaseURL + 'post/post/listByRank';
    var topics = [ ];
    NetworkUtil.get(url,data,function(set){
      var jsonData = set.data;

      for (var i = 0; i < jsonData.post.length; i++) {
          var topic = jsonData.post[i];
          topics.push(topic);
      }

      that.setState({
        dataSource:ds.cloneWithRows(topics),
        loadedData:true
      })
    })


}

render(){
  return(
    this.state.loadedData ?
    <ListView
      dataSource={this.state.dataSource}
      renderRow={this._renderItem.bind(this)}
      renderHeader={null}
   />  : <PageLoading />
 );
}

_renderItem(rowData){
  return(
  <ShineChartCell data={rowData} />
);
}

}
