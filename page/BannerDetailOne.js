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
import CommonNavBar from '../component/commonNavBar';
import MainPage from './MainPage';
import PageLoading from '../component/pageLoadingView';

const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2) => r1 !== r2
});

export default class BannerDetailOne extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataSource:ds,
      loadedData:false,
      isRefreshing:true,
    }
  }
  componentDidMount(){
      this._getListData(0);
  }

  _getListData(pageIndex){

    var that = this;
    let data = theme.BaseRequestListData;
    data.ids = this.props.data.extend;
    var url =theme.kBaseURL + 'topics/topic/listByIds';
    var listContents = [ ];
   NetworkUtil.get(url,data,function(set){
      var jsonData = set.data;
      for (var i = 0; i < jsonData.topic.length; i++) {
        var item = jsonData.topic[i];
          listContents.push(item);
      }
      that.setState({
        loadedData:true,
        dataSource:ds.cloneWithRows(listContents),
        isRefreshing:false
      })

   })
  }

  _itemClickCallback(rowData){
    MainPage.switchToInfoListPage(this,rowData);
  }

  _renderItem(rowData){
   return(
      <View>
        {this._renderItemContent(rowData)}
      </View>
     );
  }

  _renderItemContent(rowData){
    return(
      <View style={styles.item}>
        <View style={styles.lineView}></View>
        <TouchableOpacity
          onPress={this._itemClickCallback.bind(this, rowData)}
          activeOpacity={theme.btnActiveOpacity}
        >
         <Image style={{width:theme.screenWidth-20,height:180,marginTop:10}} source={{uri:rowData.pic}}/>
         </TouchableOpacity>
        <Text style={styles.titleText}>{rowData.title}</Text>
        <View style={styles.bottom}>
          <Text style={{fontSize:12}}>{rowData.user.nickname}</Text>
          <View style={styles.smallLine}></View>
          <Icon name={'ios-eye-outline'} size={20} color='gray'></Icon>
          <Text style={{fontSize:11,color:'gray',marginLeft:5,marginRight:5}}>{rowData.views}</Text>
          <Icon name={'md-heart-outline'} size={15} color='gray'></Icon>
          <Text style={{fontSize:11,color:'gray',marginLeft:5,marginRight:5}}>{rowData.likes}</Text>
        </View>
      </View>
    );
  }

  render(){
    return(
      !this.state.loadedData ?
      <PageLoading />
      :
      <View style={styles.container}>
        <CommonNavBar title={this.props.data.title} needBack={true} backOnPress={() => MainPage.pageBack(this)} />
        <ListView
          refreshControl={
           <RefreshControl
             refreshing={this.state.isRefreshing}
             onRefresh={() => {this._getListData(0)}}
             tintColor="#ff0000"
             title="加载中..."
             titleColor="#ff0000"
             colors={['#ff0000', '#00ff00', '#0000ff']}
             progressBackgroundColor="#ffff00"
           />
         }
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          renderHeader={null}
       />
      </View>


   );
  }

}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  item:{
    width:theme.screenWidth,
    height:250,
    justifyContent:'center',
    alignItems:'center'
  },
  titleText:{
    width:theme.screenWidth,
    height:30,
    paddingTop:5,
    textAlign:'center',
    fontSize:16,
    color:'black'
  },
  numText:{
    width:theme.screenWidth,
    height:20,
    textAlign:'center',
    fontSize:13,
    color:'gray'
  },
  lineView:{
    width:theme.screenWidth,
    height:0.3,
    backgroundColor:'gray',
    opacity:0.7
  },
  bottom:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  smallLine:{
    height:10,
    width:1,
    backgroundColor:'gray',
    marginLeft:5,
    marginRight:5
  }
});
