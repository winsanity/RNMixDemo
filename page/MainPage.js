'use strict';

import React,{Component} from 'react';
import {Text,View,AlertIOS,DeviceEventEmitter,NativeModules} from 'react-native';
import TabBar from '../component/TabBar';
import WebViewPage from './WebViewPage';
// import SplashScreen from '../native_modules/SplashScreen';
import TopiclistPage from './TopiclistPage';
import BannerDetailOne from  './BannerDetailOne';
import InfoListViewPage from './infoListViewPage';
import ExpertChart from './expertChartView';
import ArticleChart from './articleChartView';
import ShineListChart from './shineListChartView';
import AllCommandsPage from './allCommandsPage';
import CommandDetailPage from './commandDetailListPage';
import AllActivitiesPage from './allActivitiesPage';
import ChangeInfoPage from './changePersonalInfoPage';
import FansAndAttentionPage from './fansAndAttenionPage';
import SearchPage from './searchPage';
import SearchItemPage from './searchItemDetailPage';
import ActivityDetailPage from './activityDetailListPage';

var O2cRnUtil = NativeModules.O2cRnUtil;

export default class MainScene extends Component {
  constructor(props) {
    super(props);
    MainScene.switchToWebViewPageWithHTML = MainScene.switchToWebViewPageWithHTML.bind(this);
    MainScene.switchToToplistPage = MainScene.switchToToplistPage.bind(this);
    MainScene.switchToBannerDetailPageOne = MainScene.switchToBannerDetailPageOne.bind(this);
    MainScene.pageBack = MainScene.pageBack.bind(this);
    MainScene.switchToInfoListPage = MainScene.switchToInfoListPage.bind(this);
    MainScene.switchToExpertChartView = MainScene.switchToExpertChartView.bind(this);
    MainScene.switchToArticleChartView = MainScene.switchToArticleChartView.bind(this);
    MainScene.switchToShineListChartView = MainScene.switchToShineListChartView.bind(this);
    MainScene.switchToAllCommandsPage = MainScene.switchToAllCommandsPage.bind(this);
    MainScene.switchToCommandDetailPage = MainScene.switchToCommandDetailPage.bind(this);
    MainScene.switchToAllActivitiesesPage = MainScene.switchToAllActivitiesesPage.bind(this);
    MainScene.switchToChangeInfoPage = MainScene.switchToChangeInfoPage.bind(this);
    MainScene.switchToFansAndAttentionsPage = MainScene.switchToFansAndAttentionsPage.bind(this);
    MainScene.switchToSearchPage = MainScene.switchToSearchPage.bind(this);
    MainScene.swithchToSearchItemPage = MainScene.swithchToSearchItemPage.bind(this);
    MainScene.switchToActivityDetailPage = MainScene.switchToActivityDetailPage.bind(this);
  }

//跳到网页页面  原生处理
  static switchToWebViewPageWithHTML(self,html){
    O2cRnUtil.switchToPageView('http://www.baidu.com','网页');
  }

//跳到相册页
static switchToImagePicker(){
  O2cRnUtil.switchToImagePicker();
}

//首页轮播图详情页
  static switchToBannerDetailPageOne(self,data){
    self.props.navigator.push({
      component:BannerDetailOne,
      params:{data:data}
    });
  }

//首页topic详情页
  static switchToInfoListPage(self,data){
     this.props.navigator.push({
      component:InfoListViewPage,
      params:{data:data}
    });
  }
//达人排行榜
  static switchToExpertChartView(){
       this.props.navigator.push({
        component:ExpertChart
      });
    }
//文章排行榜
  static switchToArticleChartView(){
         this.props.navigator.push({
          component:ArticleChart
        });
      }
//晒单排行榜
  static switchToShineListChartView(){
             this.props.navigator.push({
                component:ShineListChart
              });
        }
//全部小组
static switchToAllCommandsPage(){
  this.props.navigator.push({
    component:AllCommandsPage
  });
}

//每个小组的详情
static switchToCommandDetailPage(extend){
  this.props.navigator.push({
    component:CommandDetailPage,
    params:{extend:extend}
  });
}

static switchToActivityDetailPage(id){
  this.props.navigator.push({
    component:ActivityDetailPage,
    params:{id:id}
  })
}

//全部活动
static switchToAllActivitiesesPage(){
  this.props.navigator.push({
    component:AllActivitiesPage
  });
}

//修改昵称和个性签名
static switchToChangeInfoPage(){
  this.props.navigator.push({
    component:ChangeInfoPage
  });
}

//关注和粉丝页面
static switchToFansAndAttentionsPage(type){
  this.props.navigator.push({
    component:FansAndAttentionPage,
    params:{type:type}
  });
}

//跳到搜索页面
static switchToSearchPage(){
  this.props.navigator.push({
    component:SearchPage
  });
}

//搜索页每个item点击的跳转
static swithchToSearchItemPage(item){
  this.props.navigator.push({
    component:SearchItemPage,
    params:{item:item}
  });
}

  static switchToWebViewPageWithData(self,data){
    self.props.navigator.push({
      component:WebViewPage,
      params:{data:data}
    });
  }


  static switchToToplistPage(self,data){
    this.props.navigator.push({
      component:TopiclistPage,
      params:{data:data}
    });
  }

  static pageBack(self){
    self.props.navigator.pop();
  }

  render(){
      return(
        <View style={{flex:1,justifyContent:'flex-end'}}>
          <TabBar navigator={this.props.navigator}/>
        </View>
      )
}
}
