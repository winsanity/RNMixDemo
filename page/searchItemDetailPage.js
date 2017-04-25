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
  ScrollView,
} from 'react-native';

import CommonNavBar from '../component/commonNavBar';

import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import MainPage from './MainPage';
import HomePageListView from '../ListView/homePageListView';
import CommonListView from '../ListView/commonListView';
import CommonCollectionView from './commonCollectionView';
import GoodThingCollectionPage from './goodThingCollectionView';
import ScrollItemBar from '../component/scrollItemBar';

var tabNames=['晒单','文章'];

export default class SearchItemPage extends Component {
  constructor(props) {
      super(props);
      this.state={
        loadedData:false,
        sortType:0,
        tabNames:this.props.item.type_id === 3 ?  ['晒单','文章'] : ['好物','晒单','文章'],
        categorys:[ ]
      }
  }

  render(){
    return(
      <View style={styles.container}>
        <CommonNavBar title={this.props.item.name} needBack={true} backOnPress={() => MainPage.pageBack(this)} />
        <ScrollableTabView
                       renderTabBar={() => <ScrollableTabBar />}
                       tabBarBackgroundColor='white'
                       tabBarActiveTextColor="red"
                       tabBarInactiveTextColor="black"
                       tabBarTextStyle={{fontSize:theme.scrollView.fontSize}}
                       tabBarUnderlineStyle={theme.scrollView.underlineStyle}>
                       {
                         this.props.item.type_id === 3
                         ?
                         this.state.tabNames.map((item, i) => {
                            return(
                              i === 0
                              ?
                              <CommonCollectionView item={this.props.item} key={i} tabLabel={item} />
                              :
                              <CommonListView item={this.props.item} key={i} tabLabel={item} />
                            )
                       })
                       :
                       this.state.tabNames.map((item,i) => {
                         switch (i) {
                           case 0:
                           return(
                             <GoodThingCollectionPage item={this.props.item} key={i} tabLabel={item} />
                           )
                             break;
                           case 1:
                             return(
                               <CommonCollectionView item={this.props.item} key={i} tabLabel={item} />
                             )
                             break;
                           case  2:
                             return(
                               <CommonListView item={this.props.item} key={i} tabLabel={item}/>
                             )
                             break;
                           default:

                         }
                       })
                     }

         </ScrollableTabView>
         {
           this.props.item.type_id !== 3
            ?
         <View style={styles.topView}>
           <ScrollItemBar items={this.state.categorys}/>
           <View style={{width:theme.screenWidth,height:0.5,marginBottom:0.5,backgroundColor:theme.baseColor}}></View>
         </View>
         :
         null
        }
      </View>
    )
  }

  componentDidMount(){

    this._getCategory();

  }

  _getCategory(){
    var that = this;
    let data = theme.BaseRequestListData;
    data.id = that.props.item.id;
    var url = theme.kBaseURL + 'category/info';
    NetworkUtil.get(url,data,function(get){
      var jsonData = get.data;
      var array= [ ];
      for (var i = 0; i < jsonData.subclass.length; i++) {
         array.push(jsonData.subclass[i])
      }
      var first = {'name':'全部','id':that.props.item.id};
      array.unshift(first);

      that.setState({
        categorys : array,
        loadedData:true
      })
    })


  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  topView:{
    position:'absolute',
    top:114,
    width:theme.screenWidth,
    height:40,
    backgroundColor:'white'
  }
})
