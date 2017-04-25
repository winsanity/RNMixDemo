import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  RefreshControl
} from 'react-native';

import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';
import Swiper from 'react-native-swiper';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import FindListView from '../ListView/findPageListView';
import MainPage from './MainPage';
import CacheableImage from 'react-native-cacheable-image';

import PageLoading from '../component/pageLoadingView';

var tabNames = [
  "最新","热门","关注"
];

export default class FindPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerArr:[],
      activity_list:[],
      subject_list:[],
      loadedData:false,
      showSearchBar:true,
      isRefreshing:false,
      navOpacity:0
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
     refreshControl={
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={() => {this._refreshGetData()}}
        tintColor="#ff0000"
        title="加载中..."
        titleColor="#ff0000"
        colors={['#ff0000', '#00ff00', '#0000ff']}
        progressBackgroundColor="#ffff00"
      />
    }
    scrollEventThrottle={5}
    onScroll={ (e)=> this.onAnimationEnd(e)}
    >
     <Swiper
       height={180}
       loop={true}
       index={0}
       autoplay={true}
       activeDot={<View style={{backgroundColor:'white',width:15,height:5,borderRadius:5,marginLeft:3,marginRight:3,marginTop:3,marginRight:3}}></View>}
       dot = {<View style={{backgroundColor:'white',width:5,height:5,borderRadius:2.5,marginLeft:3,marginRight:3,marginTop:3,marginRight:3}}></View>}
       activeDotColor='#eb4f38'
       autoplayTimeout={3}
     >
       {
         this.state.bannerArr.map((item,i) => {
           return(
           <TouchableOpacity onPress={() => {this._onBannerItemClickCallback(i)}} key={i}>
            <CacheableImage style={styles.swipeImage} source={{uri:item.photo}}/>
          </TouchableOpacity>
         );
         })
       }
     </Swiper>
     <View style={styles.command}>
       <Text style={styles.leftText}>推荐小组</Text>
       <Text style={styles.rightText} onPress={() => this.allCommandBtnClick()}>查看全部</Text>
     </View>

     <ScrollView
       horizontal={true}
       showsHorizontalScrollIndicator={false}
       >
       {
         this.state.subject_list.map((item,i) => {
           return(
             <TouchableOpacity key={i} onPress={() => this.commandItemClick(item)}>
               <CacheableImage source={{uri:item.photo}} style={{width:80,height:80,marginTop:10,marginLeft:10,marginRight:10}}></CacheableImage>
               <Text style={{fontSize:12,color:'#BFBFBF',textAlign:'center',paddingTop:10}}>{item.title}</Text>
             </TouchableOpacity>
           )
         })
       }
     </ScrollView>
     <View style={{width:theme.screenWidth,height:5,backgroundColor:'#EEEEEE',marginTop:10}}></View>
     <View style={styles.command}>
       <Text style={styles.leftText}>热门活动</Text>
       <Text style={styles.rightText} onPress={() => this.allHotBtnClick()}>查看全部</Text>
     </View>
     <View style={styles.activityContainer}>
       {
         this.state.activity_list.map((item,i) => {
           return(
             <View style={styles.singleActivity} key={i}>
               <TouchableOpacity onPress={ () => this._onActivityItemClick(item)}>
               <View style={{width:theme.screenWidth/2,height:0.5,backgroundColor:'#BFBFBF'}}></View>
               <View style={{flexDirection:'row'}}>
                 <CacheableImage source={{uri:item.icon}} style={{width:50,height:50,marginTop:20}}/>
                 <View style={{marginTop:30,marginLeft:10}}>
                   <Text>{item.title}</Text>
                   <Text style={{fontSize:13,color:'#BFBFBF',paddingTop:10}}>{item.users + '人参与'}</Text>
                 </View>
                <View style={{width:0.5,height:100,backgroundColor:'#BFBFBF',position:'absolute',right:0.5}}></View>
               </View>
               </TouchableOpacity>
             </View>
           )
         })
       }
     </View>
     <View style={{width:theme.screenWidth,height:5,backgroundColor:'#EEEEEE'}}></View>

     <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarBackgroundColor='white'
                    tabBarActiveTextColor="red"
                    tabBarInactiveTextColor="black"
                    tabBarTextStyle={{fontSize:theme.scrollView.fontSize}}
                    tabBarUnderlineStyle={theme.scrollView.underlineStyle}>
                    {tabNames.map((item, i) => {
                        return(
                           <FindListView tabLabel={item} id={i} key={i}/>
                        );
                    })
                  }

      </ScrollableTabView>
   </ScrollView>
   {this.state.showSearchBar ?
   <TouchableOpacity style={styles.searchBar} onPress={ () => MainPage.switchToSearchPage()}>
   <View style={{flexDirection:'row',alignItems:'center'}}>
     <Icon name='ios-search' size={16} color='#BFBFBF'/>
     <Text style={{paddingLeft:5,fontSize:13,color:'#BFBFBF'}}>搜索值得买的好物</Text>
   </View>
 </TouchableOpacity> :null
}
{<View style={[styles.navView,{opacity:this.state.navOpacity >= 1 ? 1 : this.state.navOpacity}]}></View>}
</View>

    );
  }

  allCommandBtnClick(){
     MainPage.switchToAllCommandsPage();
  }
  commandItemClick(item){

    MainPage.switchToCommandDetailPage(item.extend);
  }

  allHotBtnClick(){
    MainPage.switchToAllActivitiesesPage();
  }

  _onActivityItemClick(item){
    MainPage.switchToActivityDetailPage(item.id);
  }

  onAnimationEnd(e){
    var offSetY = e.nativeEvent.contentOffset.y;
     var  opacity = offSetY / 64;
     this.setState({
       navOpacity:opacity
     });
  }



  componentDidMount(){
    this._getListPostData();
  }

  _refreshGetData(){
    this._getListPostData();
    this.setState({
      showSearchBar:false
    })

  }
  _onBannerItemClickCallback(i){
    switch (i) {
      case 0:
        MainPage.switchToExpertChartView();
        break;
      case 1:
        MainPage.switchToArticleChartView();
        break;
      case 2:
        MainPage.switchToShineListChartView();
        break;
    }
  }

//广场的数据
  _getListPostData(){
    var that = this;
    let data = theme.BaseRequestListData;
    var url =theme.kBaseURL + 'post/index/index';
    NetworkUtil.get(url,data,function(set){
      var jsonData = set.data;

      var bannerArr = [];
      var activityList = [ ];
      var subjectList =[ ];
      for (var i = 0; i < jsonData.banner.length; i++) {
           var data =  jsonData.banner[i];
           bannerArr.push(data);
        }
      for (var i = 0; i < jsonData.subject_list.length; i++) {
            var subject =   jsonData.subject_list[i];
            subjectList.push(subject);
        }
      for (var i = 0; i < jsonData.activity_list.length; i++) {
              var activity =  jsonData.activity_list[i];
             activityList.push(activity);
          }
        that.setState({
          bannerArr:bannerArr,
          subject_list:subjectList,
          activity_list:activityList,
          showSearchBar:true,
          loadedData:true
        })
    })

  }



}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  searchBar:{
    width:theme.screenWidth-40,
    height:28,
    backgroundColor:'#DADFE1',
    zIndex:1,
    top:28,
    borderRadius:2,
    left:20,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute'
  },
  navView:{
    width:theme.screenWidth,
    height:64,backgroundColor:'white',
    position:'absolute',
    zIndex:0,
    top:0,
    opacity:0
  },
  swipeImage:{
    height:180,
    width:theme.screenWidth
  },
  command:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  leftText:{
    paddingLeft:10,
    paddingTop:10,
    fontSize:13
  },
  rightText:{
    paddingRight:10,
    paddingTop:10,
    fontSize:13,
    color:'#BFBFBF'
  },
  activityContainer:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:5
  },
  singleActivity:{
    width:theme.width/2,
    height:100
  }
})
