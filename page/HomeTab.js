'use strict';

import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, RefreshControl,AlertIOS} from 'react-native';
import HomeListView from '../ListView/homePageListView';
import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';

export default class HomeTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            listContents:[ ],
        };
    }

    componentDidMount() {
        this._fetchData(0);
    }

    render() {
            return (
              <View style={{flex:1}}>

              <ScrollView
                refreshControl={<RefreshControl
                                 refreshing={this.state.refreshing}
                                 onRefresh={() => {this._onRefresh()}}
                                 colors={['red','#ffd500','#0080ff','#99e600']}
                                 tintColor={theme.themeColor}
                                 title="加载中..."
                                 titleColor={theme.themeColor}
                             />
                           }
                >
                  {<HomeListView listContents={this.state.listContents} />}

             </ScrollView>
           </View>
            );

    }

  _onRefresh() {
      this.setState({refreshing:true});
      this._fetchData(0);
  }

  _fetchData(page) {
    var that = this;
    let data = theme.BaseRequestListData;
    data.page = 0;
    var url =theme.kBaseURL + 'recommend/index';
      NetworkUtil.get(url,data,function(set){
          let jsonData = set.data;
          var listContents = [ ];
          for (var i = 0; i < jsonData.topic.length; i++) {
            var data = jsonData.topic[i];
            listContents.push(data);
          }

          that.setState({
            listContents : listContents,
            loadedData:true,
            refreshing:false
          });

      })
}



}
