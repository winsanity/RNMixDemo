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
import CommandDetailCell from '../cells/commandDetailCell';

const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2) => r1 !== r2
});


export default class CommandDetailListView extends Component {
  constructor(props) {
    super(props);
    this.state={
      loadedData:false,
      dataSource:ds
    }
  }

  componentDidMount(){
      this._getListData(0);
  }
  
  _getListData(index){
    var that = this;
    let data = theme.BaseRequestListData;
    data.page = index;
    data.id = this.props.extend;
    data.sort_type = this.props.sortType;
    var url = theme.kBaseURL + 'subject/subject/originalsList';
    var topics = [ ];
    NetworkUtil.get(url,data,function(set){
      var jsonData = set.data;

      for (var i = 0; i < jsonData.list.length; i++) {
          var topic = jsonData.list[i];
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
      scrollEnabled={false}
      enableEmptySections={true}
   />  : <PageLoading />

 );
}

_renderItem(rowData){
  return(
  <CommandDetailCell data={rowData} />
);
}

}
