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
import Icon from 'react-native-vector-icons/Ionicons';
import NetworkUtil from '../Util/NetworkUtil';
import PageLoading from '../component/pageLoadingView';
import MainPage from '../page/MainPage';
import FindPageListCell from '../cells/FindPageListCell';


const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2) => r1 !== r2
});

export default class FindPageListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      loadedData:false,
      currentPage:0,
      dataSource:ds,
    }
  }

  componentDidMount(){
      this._getListData(this.state.currentPage);

  }
  _getListData(pageIndex){
    var that = this;
    let data = theme.BaseRequestListData;
    var listContents = [];
    switch (this.props.id) {
      case 0:
      var url =theme.kBaseURL + 'post/index/listByNew?'+'page='+pageIndex;
        NetworkUtil.get(url,data,function(set){
            let jsonData = set.data;
          //  AlertIOS.alert(jsonData.list[0].post.content);
            for (var i = 0; i < jsonData.list.length; i++) {
              var data = jsonData.list[i];
              listContents.push(data);
            }
            that.setState({
            dataSource:ds.cloneWithRows(listContents),
            loadedData:true,
          });
          })
        break;
        case 1:
        var url =theme.kBaseURL + 'post/index/listByRec?'+'page='+pageIndex;
          NetworkUtil.get(url,data,function(set){
              let jsonData = set.data;
              //AlertIOS.alert(set);
              for (var i = 0; i < jsonData.list.length; i++) {
                var data = jsonData.list[i];
                listContents.push(data);
              }
              that.setState({
              dataSource:ds.cloneWithRows(listContents),
              loadedData:true,
            });
            })
          break;
          case 2:
          var url =theme.kBaseURL + 'post/index/listByAttention?' + 'page='+pageIndex;
            NetworkUtil.get(url,data,function(set){
                let jsonData = set.data;
                //AlertIOS.alert(set);
                for (var i = 0; i < jsonData.list.length; i++) {
                  var data = jsonData.list[i];
                  listContents.push(data);
                }

                that.setState({
                dataSource:ds.cloneWithRows(listContents),
                loadedData:true,
              });
              })
            break;
    }

}
render(){
  return(
    this.state.loadedData ?
    <ListView
      dataSource={this.state.dataSource}
      renderRow={this._renderItem.bind(this)}
      renderHeader={null}
      scrollEnabled={false}
   />  : <PageLoading />
 );
}

_renderItem(rowData){
 return(
    <FindPageListCell data={rowData}/>
   );
}


};
