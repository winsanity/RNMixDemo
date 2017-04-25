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
import CommonListCell from '../cells/commonListCell';

const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2) => r1 !== r2
});

export default class CommonListView extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataSource:ds,
      loadedData:false
    }
  }

  componentDidMount(){

    this._getTopicData(0);
  }

  _getTopicData(page){
    var that = this;
    let data = theme.BaseRequestListData;
    data.id = that.props.item.id;
    data.page = page;
    var url = this.props.item.type_id === 3 ? theme.kBaseURL + 'topics/topic/listByScene' : theme.kBaseURL + 'topics/topic/listByCate';
    NetworkUtil.get(url,data,function(get){
      var array = [ ];
      var jsonData = get.data;
      for (var i = 0; i < jsonData.topic.length; i++) {
         var topic = jsonData.topic[i];
         array.push(topic);
      }
     that.setState({
       loadedData:true,
       dataSource:ds.cloneWithRows(array)
     });

    });

  }

  render(){
      return(
        this.state.loadedData ?
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          renderHeader={null}
          enableEmptySections={true}
          style={{marginTop: this.props.item.type_id !== 3 ? 40 : 0}}
       />  : <PageLoading />
     );
  }

 _renderItem(rowData){
   return(
     <CommonListCell rowData={rowData} />
   );

 }

}
