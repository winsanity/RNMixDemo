import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
  AlertIOS,

} from 'react-native';

import theme from '../config/theme';
import PageLoading from '../component/pageLoadingView';
import NetworkUtil from '../Util/NetworkUtil';
import CommonNavBar from '../component/commonNavBar';
import MainPage from './MainPage';

const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2) => r1 !== r2
});

var topics = [ ];
export default class AllCommandsView extends Component {
  constructor(props) {
    super(props);
    this.state={
      loadedData:false,
      dataSource:ds,
      currentPage:0,
    }
  }

  componentDidMount(){

      this._getListData(this.state.currentPage);

  }
  _getListData(page){
    var that = this;
    let data = theme.BaseRequestListData;
    data.page = page;
    var url =theme.kBaseURL + 'subject/subject/list';

    NetworkUtil.get(url,data,function(set){
      var jsonData = set.data;

      for (var i = 0; i < (jsonData.length ); i++) {
          var topic = jsonData[i];
          topics.push(topic);
      }

      that.setState({
        dataSource:ds.cloneWithRows(topics),
        loadedData:true,
      })
    })


}
_getMoreData(){

  this.setState({
    currentPage:this.currentPage + 1
  })

  this._getListData(this.state.currentPage);

}

render(){
  return(
    <View style={styles.container}>
     <CommonNavBar title='全部小组' needBack={true} backOnPress={() => MainPage.pageBack(this)} />
     {
    this.state.loadedData ?
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this._renderItem.bind(this)}
      renderHeader={null}
      onEndReached={() => {}}
   />  : <PageLoading />
    }
  </View>
 );
}

_renderItem(rowData){
  return(

   <View style={styles.cellItem}>
     <TouchableOpacity onPress={ () =>this._onCellItemClick(rowData) }>
       <Image style={{width:theme.screenWidth - 20,height:150}} source={{uri:rowData.pic}} />
       <View style={styles.imgContainer}>
        <Text style={styles.titleText}>{rowData.title}</Text>
        <Text style={styles.numText}>{rowData.users + '人参与'}</Text>
      </View>
     </TouchableOpacity>
   </View>

);
}

_onCellItemClick(rowData){

  MainPage.switchToCommandDetailPage(rowData.id);

}

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  cellItem:{
    width:theme.screenWidth - 40 ,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20,
    marginLeft:20,
    marginTop:10,
    marginBottom:10
  },
  titleText:{
    textAlign:'center',
    fontSize:15,

  },
  numText:{
    paddingTop:5,
    textAlign:'center',
    fontSize:12,
    color:"#BFBFBF"
  },
  imgContainer:{
    marginTop:10,
    backgroundColor:null,
    justifyContent:'center',
    alignItems:'center'
  }

})
