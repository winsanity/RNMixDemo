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
  ScrollView

} from 'react-native';

import theme from '../config/theme';
import PageLoading from '../component/pageLoadingView';
import NetworkUtil from '../Util/NetworkUtil';
import MainPage from './MainPage';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import CacheableImage from 'react-native-cacheable-image';
import CommonNavBar from '../component/commonNavBar';
import ActivityCollectionView from './activityCollectionView';

const tabNames = ["最新","最热"];

export default class ActivityDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      topScale:1,
      loadedData:false,
      navOpacity:0,
      topData:{},
      isfollow:null,
      postArray1:[ ],
      postArray2:[ ],
    }
  }

  render(){
    return(
    !this.state.loadedData ?
     <PageLoading />
     :
     <View style={styles.container}>
     <ScrollView
       ref="scrollview"
      scrollEventThrottle={5}
      onScroll={ (e)=> this.onAnimationEnd(e)}
      onScrollAnimationEnd={() => this.setState({marginTop:0,imgH:180})}
      automaticallyAdjustContentInset={false}
      snapToAlignment='start'
      >
        <View style={styles.topView}>
          <Image style={{width:theme.screenWidth,height:180}} source={{uri:this.state.topData.pic}}></Image>
          <Text style={styles.titleText}>{this.state.topData.title}</Text>
          <Text style={styles.numText}>{this.state.topData.users + '人已参与'}</Text>
          <View style={styles.top_attention}>
            <Text style={this.state.isfollow ? styles.attentioned : styles.attention } onPress={() => this._attentionBtnClick()}>{this.state.isfollow ? '已关注' :'＋ 关注'}</Text>
          </View>
          <View style={styles.backBtn}>
           <Icon name='ios-arrow-back' size={25} color='white' />
          </View>
          <View style={styles.shareBtn}>
           <Icon name='ios-share-alt' size={25} color='white' />
          </View>
        </View>
        <View style={{backgroundColor:'white'}}>
         <Text style={styles.content} numberOfLines={2}>{this.state.topData.content}</Text>
         <View style={styles.seperateView}></View>
        </View>
        <ScrollableTabView
                       renderTabBar={() => <ScrollableTabBar />}
                       tabBarBackgroundColor='white'
                       tabBarActiveTextColor="red"
                       tabBarInactiveTextColor="black"
                       tabBarTextStyle={{fontSize:theme.scrollView.fontSize}}
                       tabBarUnderlineStyle={theme.scrollView.underlineStyle}>
                       {tabNames.map((item, i) => {
                           return(
                             <ActivityCollectionView tabLabel={item} id={this.props.id} key={i} sortType={i}></ActivityCollectionView>
                           );
                       })
                     }
         </ScrollableTabView>
         <View style={{width:theme.screenWidth,height:theme.screenHeight,backgroundColor:'white'}}></View>
    </ScrollView>
    <View style={[styles.navView,{opacity:this.state.navOpacity >= 1 ? 1 : this.state.navOpacity}]}>
      <CommonNavBar title={this.state.topData.title} needBack={true} backOnPress={() => MainPage.pageBack(this)}  rightStyle={ <TouchableOpacity><Icon name='ios-share-alt' size={25} color={theme.baseColor} style={{marginRight:20}}/></TouchableOpacity>}/>
    </View>
  </View>
  );
  }

  componentDidMount(){
      this._getListData();
  }

  _getListData(){
    var that = this;
    let data = theme.BaseRequestListData;
    data.id = this.props.id;
    data.is_night = 0;
    var url =theme.kBaseURL + 'activity/activity/info';

    NetworkUtil.get(url,data,function(set){
      var jsonData = set.data;
      that.setState({
        topData:jsonData,
        loadedData:true,
        isfollow:jsonData.isfollow
      });
    })

}



_attentionBtnClick(){
  this.setState({
    isfollow : !this.state.isfollow,
  });
}

onAnimationEnd(e){
  var offSetY = e.nativeEvent.contentOffset.y;
    var  opacity = offSetY / 64;
    this.setState({
      navOpacity:opacity
    });

}

}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  navView:{
    width:theme.screenWidth,
    height:64,
    backgroundColor:'white',
    position:'absolute',
    zIndex:0,
    top:0,
    opacity:0
  },
  numText:{
    position:'absolute',
    bottom:20,
    left:20,
    color:'white',
    fontSize:13
  },
  titleText:{
    position:'absolute',
    bottom:40,
    left:20,
    color:'white',
    fontSize:16
  },
  top_attention:{
    position:'absolute',
    bottom:20,
    right:20,
    backgroundColor:'white',
  },
  attention:{
    color:'red',
    textAlign:'center',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    paddingBottom:5
  },
  attentioned:{
    color:theme.baseColor,
    textAlign:'center',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    paddingBottom:5
  },
  navAttention:{
    marginRight:20,
    color:'red'
  },
  navAttentioned:{
    marginRight:20,
    color:theme.baseColor
  },
  top_t:{
    flexDirection:'row',
    justifyContent:'space-between',
    position:'absolute',
    top:0,
    zIndex:1,
    alignItems:'center'
  },
  backBtn:{
    position:'absolute',
    top:30,
    left:20
  },
  shareBtn:{
    position:'absolute',
    top:30,
    right:20
  },
  content:{
    marginTop:10,
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    fontSize:16,
    lineHeight:25
  },
  seperateView:{
    width:theme.screenWidth,
    height:5,
    backgroundColor:theme.baseColor,
    marginTop:5
  }

})
