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
import MainPage from '../page/MainPage';
import CacheableImage from 'react-native-cacheable-image'

const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2) => r1 !== r2
});
export default class HomeListView extends Component{

  constructor(props) {
    super(props);

    this.state = {
      dataSource:ds,
      loadedData:false,
      isRefreshing:true,
      currentPage:0
    }
  }
  componentDidMount(){

    this._getListData(this.state.currentPage);

  }

  _getListData(pageIndex){
    var that = this;
    let data = theme.BaseRequestListData;
    var listContents = [];
    switch (this.props.type) {
        case 'topic_main':

        var url =theme.kBaseURL + 'recommend/index?' + 'page=' + pageIndex;
          NetworkUtil.get(url,data,function(set){
              let jsonData = set.data;
              //AlertIOS.alert(set);
              for (var i = 0; i < jsonData.topic.length; i++) {
                var data = jsonData.topic[i];
                listContents.push(data);
              }
              that.setState({
              dataSource:ds.cloneWithRows(listContents),
              loadedData:true,
              isRefreshing:false
              });

            })
          break;
          case 'topic_newest_list':
          data.page = 0;
          var url =theme.kBaseURL + 'recommend/newestTopic?';
            NetworkUtil.get(url,data,function(set){
                let jsonData = set.data;
                for (var i = 0; i < jsonData.topic.length; i++) {
                  var data = jsonData.topic[i];
                  listContents.push(data);
                }
                that.setState({
                dataSource:ds.cloneWithRows(listContents),
                loadedData:true,
                isRefreshing:false
                });

              })
            break;
            case 'topic_hot_list':
            data.page = 0;
            var url =theme.kBaseURL + 'recommend/hotTopicList?';
              NetworkUtil.get(url,data,function(set){
                  let jsonData = set.data;
                  for (var i = 0; i < jsonData.topic.length; i++) {
                    var data = jsonData.topic[i];
                    listContents.push(data);
                  }
                  that.setState({
                  dataSource:ds.cloneWithRows(listContents),
                  loadedData:true,
                  isRefreshing:false
                  });

                })
              break;
           default:
            var url2 =theme.kBaseURL + 'topics/topic/listByAttribute?';

            switch (this.props.id) {
             case '3':
             data.ids = 26;
             break;
             case '4':
             data.ids = 9;
             break;
             case '5':
             data.ids = 2;
             break;
             case '6':
             data.ids = 20;
             break;
             case '7':
             data.ids = 21;
             break;
             case '8':
             data.ids = 11;
             break;
             case '9':
             data.ids = 12;
             break;
             case '10':
             data.ids = 23;
             break;
             case '11':
             data.ids = 13;
             break;
             case '12':
             data.ids = 1;
             break;
             case '13':
             data.ids = 14;
             break;
             case '14':
             data.ids = 16;
             break;

}
             NetworkUtil.get(url2,data,function(set){
                 let jsonData = set.data;
                 for (var i = 0; i < jsonData.topic.length; i++) {
                   var data = jsonData.topic[i];
                   listContents.push(data);
                 }
                 that.setState({
                 dataSource:ds.cloneWithRows(listContents),
                 loadedData:true,
                 isRefreshing:false
                 });

               })
      }

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

        <TouchableOpacity
          onPress={() => {this._itemClickCallback(rowData)}}
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
        <View style={styles.lineView}></View>
      </View>
    );
  }

  render(){
    return(
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

   );
  }


};

const styles = StyleSheet.create({
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
    opacity:0.7,
    marginTop:7
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
