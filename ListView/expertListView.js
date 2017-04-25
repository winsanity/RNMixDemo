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
import ExpertChartCell from '../cells/expertChartCell';

const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2) => r1 !== r2
});


export default class ExpertListView extends Component {
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
    data.sortType=this.props.sortType;
    var url =theme.kIbantangURL + 'toplist/userRankData';
    var users = [ ];
    NetworkUtil.get(url,data,function(set){
      var jsonData = set.data;
      for (var i = 0; i < jsonData.user.length; i++) {
          var user = jsonData.user[i];
          users.push(user);
      }

      that.setState({
        dataSource:ds.cloneWithRows(users),
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
  <ExpertChartCell data={rowData} />
);
}

}

// const styles = StyleSheet.create({
//   item:{
//     width:theme.screenWidth,
//     backgroundColor:'#BFBFBF'
//   },
//   top:{
//     flexDirection:'row',
//     alignItems:'center',
//     justifyContent:'space-between'
//   },
//   top_left:{
//     flexDirection:'row',
//     alignItems:'center',
//     marginLeft:10,
//     marginTop:10
//   },
//   nickname:{
//     fontSize:13,
//     paddingLeft:10
//   },
//   rankCount:{
//     fontSize:11,
//     paddingLeft:10,
//     color:'#BFBFBF'
//   },
//   images:{
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems:'flex-start',
//     marginTop:10,
//     marginBottom:15
//   }
// })
