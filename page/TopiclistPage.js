import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  ScrollView,
  RefreshControl
} from 'react-native';

import CommonNavBar from '../component/commonNavBar';
import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';
import HomePageListView from '../ListView/homePageListView';
import MainPage from './MainPage';

export default class TopiclistPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadedData:false,
      Topiclist:[]
    }
  }

  render(){
   const data = this.props.data;
    return(
      <View style={styles.container}>
        <CommonNavBar title={data.title} needBack={true} backOnPress={() => MainPage.pageBack()} />
        {this._renderListView()}
      </View>
    );
  }

  _renderListView(){

    var self = this;
    AlertIOS.alert(self.state.Topiclist);
    return(
      <HomePageListView listContents={self.state.Topiclist} />
    )
  }
  componentDidMount(){
    this._getTopicListData();
  }

  _getTopicListData(){
    AlertIOS.alert('paole');
    var that = this;
    let data = theme.BaseRequestListData;
    data.ids = this.props.data.extend;
    var url =theme.kBaseURL + 'topics/topic/listByIds';
    var topListArr = [ ];
   NetworkUtil.get(url,data,function(set){
    that.setState({
      Topiclist:topListArr,
      loadedData:true
  });
  });

  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  }
});
