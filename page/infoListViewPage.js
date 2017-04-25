import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  AlertIOS,
  TouchableOpacity,
  Image,
  RefreshControl,
  ListView
} from 'react-native';
import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';
import ImageButton from '../component/ImageButtonWithText';
import MainPage from './MainPage';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import PageLoading from '../component/pageLoadingView';

const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2) => r1 !== r2
});

export default class InfoListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:ds,
      comments:0,
      views:0,
      user:{
        nickname:null,
        avatar:null
      },
      loadedData:false,
      title:null,
      desc:null
    }

  }

  render(){
    return(
      <View style={styles.container}>
      <View style={styles.toolbar}>
        <ImageButton icon="ios-arrow-back" color="#BFBFBF" imgSize={25} btnStyle={styles.imgBtn} onPress={() => MainPage.pageBack(this)}/>
        <Button
          containerStyle={{marginRight:20, height:20, overflow:'hidden', borderRadius:4, backgroundColor: 'red'}}
          style={{fontSize:12, color: 'white',paddingTop:3,paddingLeft:3,paddingRight:3}}
         onPress={() => this._commentsBtnHandlePress()}>
         {this.state.comments ? this.state.comments + '评论' : '0评论'}
       </Button>
      </View>
      <View style={{width:theme.screenWidth,height:0.5,backgroundColor:'#BFBFBF'}}></View>
      {
          !this.state.loadedData  ?  <PageLoading />
          :
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            renderHeader={this._renderHeader.bind(this)}
            enableEmptySections={true}
            >
          </ListView>
      }
      </View>


    );
  }
  _itemClickCallback(rowData){
    alert(rowData.title);
  }

  _renderItem(rowData){
   return(
        this._renderItemContent(rowData)
     );
  }

  _renderItemContent(rowData){

    return(
      <View style={styles.item}>
        <View style={styles.topView}>
          <View style={styles.yellowLine}></View>
          <Text style={styles.titleText}>{rowData.title}</Text>
        </View>
        <Text style={styles.desc}>{rowData.desc}</Text>
        {
          rowData.pics.map((item,i) => {
            return(
            <TouchableOpacity key={i}>
              <Image style={{width:theme.screenWidth-30,height:theme.screenWidth-30,marginLeft:15,marginTop:10}} source={{uri:item.url}} />
            </TouchableOpacity>
            )
          })
        }

      </View>
    )

  }
  _renderHeader(){
    return(
      <View style={{flex:1,marginTop:20}}>
        <Text style={styles.title} numberOfLines={2}>{this.state.title}</Text>
        <View style={styles.headTop}>
          <View style={styles.headLeft}>
            <Image source={{uri:this.state.user.avatar}} style={{width:18,height:18,borderRadius:9}}/>
            <Text style={{paddingLeft:10,paddingTop:2,fontSize:14}}>{this.state.user.nickname}</Text>
          </View>
          <View style={styles.headRight}>
            <Icon name={'ios-eye-outline'} size={20} color='gray'></Icon>
            <Text style={styles.views}>{this.state.views}</Text>
          </View>
        </View>
        <Text style={styles.headDesc}>{this.state.desc}</Text>
      </View>
    )
  }



  componentDidMount(){
    this._onGetListData();
  }

  _onGetListData(){
    var that = this;
    let data = theme.BaseRequestData;
    data.id = this.props.data.type === 'topic_detail' ? this.props.data.topic.id : this.props.data.id ;
    var url =theme.kBaseURL + 'topic/newInfo';
    NetworkUtil.get(url,data,function(set){
      var jsonData = set.data;
      var user = jsonData.user;
      var comments = jsonData.comments;
      var listContents = [ ];
      var title = jsonData.title;
      var desc = jsonData.desc;
      var views = jsonData.views;

    if (jsonData.product_list) {
      for (var i = 0; i < jsonData.product_list.length; i++) {
           var product = jsonData.product_list[i];
           listContents.push(product);
      }
    }else {
      AlertIOS.alert('数据不一致');
    }

      that.setState({
        loadedData:true,
        dataSource:ds.cloneWithRows(listContents),
        user:user,
        comments:comments,
        title:title,
        desc:desc,
        views:views
      });
    })

  }



}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  toolbar:{
      height:theme.actionBar.height,
      width:theme.screenWidth,
      backgroundColor:theme.actionBar.backgroundColor,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingTop:20,
    },
    imgBtn:{
      width:49,
      height:49
    },
    title:{
      marginLeft:15,
      marginRight:15,
      fontSize:16,
      fontFamily: 'Verdana',
      fontWeight:'bold',
    },
    headTop:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:20
    },
    headLeft:{
      flexDirection:'row',
      marginLeft:15
    },
    headRight:{
      flexDirection:'row',
      marginRight:20
    },
    item:{
      width:theme.screenWidth,
    },
    topView:{
      flexDirection:'row',
      marginTop:20,
      justifyContent:'flex-start',
    },
    headDesc:{
      marginLeft:15,
      marginRight:15,
      marginTop:15

    },
    views:{
      fontSize:12,
      paddingLeft:5,
      color:'#BFBFBF',
      paddingTop:3
    },
    yellowLine:{
      width:5,
      height:15,
      marginLeft:20,
      backgroundColor:'yellow',
      marginTop:2
    },
    titleText:{
      paddingLeft:10,
      fontSize:15,
      fontFamily: 'Verdana',
      fontWeight:'bold'
    },
    desc:{
      paddingLeft:20,
      fontSize:15,
      fontFamily: 'Verdana',
      paddingRight:20,
      paddingTop:10
    }
})
