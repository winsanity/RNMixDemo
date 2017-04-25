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
import CommonNavBar from '../component/commonNavBar';
import MainPage from './MainPage';

var activities = [ ];

export default class AllActivitiesPage extends Component {
  constructor(porps) {
    super(porps);
    this.state={
      loadedData:false,
      data:[ ],
    }
  }

  componentDidMount(){
    this._getListData(0);
  }

  _getListData(index){
    var that = this;
    let data = theme.BaseRequestListData;
    data.page = 0;
    var url =theme.kBaseURL + 'activity/activity/list'
    NetworkUtil.get(url,data,function(set){
      var jsonData = set.data;
      for (var i = 0; i < jsonData.length; i++) {
          var activity = jsonData[i];
          activities.push(activity);
      }
      that.setState({
        data:activities,
        loadedData:true
      })
    })
  }

  render(){
    return(
      <View style={styles.container}>
         <CommonNavBar title='全部活动' needBack={true} backOnPress={() => MainPage.pageBack(this)} />
         {
           this.state.loadedData ?
           <ScrollView>
           <View style={styles.activityContainer}>
               {
               this.state.data.map((item,i) => {
                 return(
                 <View style={styles.singleActivity} key={i}>
                     <TouchableOpacity>
                      <Image style={{width:(theme.screenWidth-30)/2,height:120}} source={{uri:item.pic}} />
                     </TouchableOpacity>
                     <Text style={styles.titleText}>{item.title}</Text>
                     <Text style={styles.numText}>{item.users + '人参与'}</Text>
                 </View>
               )

              })
              }
         </View>
      </ScrollView>
         :<PageLoading />
      }
      </View>




    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  activityContainer:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    marginLeft:5,
    marginRight:5,
    marginTop:5,
    marginBottom:5
  },
  singleActivity:{
    marginTop:5,
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    height:160

  },
  titleText:{
    paddingTop:5,
    textAlign:'center'
  },
  numText:{
    paddingTop:5,
    textAlign:'center',
    fontSize:13,
    color:theme.baseColor
  }
})
