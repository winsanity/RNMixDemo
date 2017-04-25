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
import BannerDetailOne from  './BannerDetailOne';
import Icon from 'react-native-vector-icons/Ionicons';
import CacheableImage from 'react-native-cacheable-image'

import CommonNavBar from '../component/commonNavBar';
import Swiper from 'react-native-swiper';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Spinner from 'react-native-loading-spinner-overlay'

import HomePageListView from '../ListView/homePageListView';
import MainPage from './MainPage';

import HomeTab from './HomeTab';


var listContents = [];

export default class HomePageMainView extends Component {
  constructor(props) {
    super(props);
     this.state = {
      bannerArr:[],
      entryList:[],
      listContents:[],
      refreshing:false,
      loadedData:false,
      currentPage:0,
      tabNames:[ ]
    }
  }

  render(){

    return(

    <View style={styles.container}>
      {
         this.state.bannerArr.length === 0 ?

      <View style={styles.navView}>
        <TouchableOpacity style={styles.searchBar} onPress = { () => {this._showSearchPage()}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Icon name='ios-search' size={16} color='#BFBFBF'/>
          <Text style={{paddingLeft:5,fontSize:13,color:'#BFBFBF'}}>搜索值得买的好物</Text>
        </View>
      </TouchableOpacity>

      </View>
      :
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
              <TouchableOpacity onPress={() => this._onBannerItemClickCallback(item)} key={i}>
               <CacheableImage style={styles.swipeImage} source={{uri:item.photo}}/>
             </TouchableOpacity>
            );
            })
          }
        </Swiper>
      }
         <ScrollableTabView
                        renderTabBar={() => <ScrollableTabBar />}
                        tabBarBackgroundColor='white'
                        tabBarActiveTextColor="red"
                        tabBarInactiveTextColor="black"
                        tabBarTextStyle={{fontSize:theme.scrollView.fontSize}}
                        tabBarUnderlineStyle={theme.scrollView.underlineStyle}>
                        {this.state.tabNames.map((item, i) => {

                            return(
                               <HomePageListView tabLabel={item.title} type={item.type} id={item.id} key={i}/>
                            );
                        })
                      }

          </ScrollableTabView>
    </View>

    );
  }

  componentDidMount(){
    this._getSwipeData();

  }

  _onBannerItemClickCallback(item){
     if (item.type === 'event_detail') {
      MainPage.switchToWebViewPageWithHTML(this,item);
     }else if (item.type === 'topic_list') {
     MainPage.switchToBannerDetailPageOne(this, item);
   }else if (item.type === 'topic_detail') {
     MainPage.switchToInfoListPage(this,item);
   }
}


  _onRefresh(){
    this.setState({refreshing:true});
    this._getSwipeData();
    this._getListData(0);
  }

  _getSwipeData(){
    var that = this;
    let data = theme.BaseRequestData;
    var url =theme.kBaseURL + 'recommend/operationElement';
    NetworkUtil.get(url,data,function(set){
      let jsonData = set.data;

      var bannerArr = [];
      var tabs = [];

      for (var i = 0; i < jsonData.banner.length; i++) {
           var data =  jsonData.banner[i];
           bannerArr.push(data);

        }
        for (var i = 0; i < jsonData.category_element.length; i++) {
          var tab = jsonData.category_element[i];
            tabs.push(tab);
        }

        that.setState({
          bannerArr:bannerArr,
          loadedData:true,
          tabNames:tabs

        });

    })
  }

  _renderListView(){
    if (!this.state.refreshing || this.state.loadedData) {
      return(
        <HomePageListView listContents={this.state.listContents} />
      );
    }
  }

  _showSearchPage(){
    MainPage.switchToSearchPage();
  }

};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: theme.pageBackgroundColor
  },
  swipeImage:{
    height:180,
    width:theme.screenWidth
  },
  entryImage:{
    marginTop:10,
    marginBottom:10,
    marginRight:5,
    marginLeft:5,
    width:80,
    height:80
  },
  navView:{
    width:theme.screenWidth,
    height:50,
    flexDirection:'row'
  },
  searchBar:{
    width:theme.screenWidth-40,
    height:28,
    backgroundColor:'#DADFE1',
    marginTop:20,
    borderRadius:2,
    marginLeft:20,
    alignItems:'center',
    justifyContent:'center',
  },

})
