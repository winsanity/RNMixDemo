'use strict';
import {PixelRatio, Dimensions, Platform} from 'react-native';

const globalTextColor = '#000';

module.exports = {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    themeColor: '#eb4f38',
    pageBackgroundColor: 'white',
    grayColor: '#c4c4c4',
    btnActiveOpacity: 0.7,
    actionBar: {
        height:64,
        backgroundColor: 'white',
        fontSize: 16,
        fontColor: 'black'
    },
    text: {
        fontSize: 15
    },
    scrollView: {
        fontSize: 13,
        underlineStyle: {
            backgroundColor: 'red',
            height:2,
        }
    },
    baseColor:'#BFBFBF',
    kBaseURL:'http://open3.bantangapp.com/',
    kIbantangURL:'http://m.ibantang.com/',

  BaseRequestData : {'app_id':'com.jzyd.BanTangPro','app_installtime':'1489714935','app_versions':'5.8.9','channel_name':'appStore','client_id':'bt_app_ios','client_secret':'9c1e6634ce1c5098e056628cd66a17a5','device_token':'591c9f49fea9c626f8e39cc77762bf78faf6ed09c7b90b2eae197754c654632a','os_versions':'10.2','screensize':750,'track_device_info':'iPhone9%2C1','track_device_uuid':'B2AEEDD4-0EEF-42EF-A1D9-39111F88642F','track_deviceid':'C032BEF0-9E43-4F60-B4B2-463B56848A88','v':25
  },
  BaseRequestListData : {'app_id':'com.jzyd.BanTangPro','app_installtime':'1489714935','app_versions':'5.8.9','channel_name':'appStore','client_id':'bt_app_ios','client_secret':'9c1e6634ce1c5098e056628cd66a17a5','device_token':'591c9f49fea9c626f8e39cc77762bf78faf6ed09c7b90b2eae197754c654632a','isfromhome':1,'last_get_time':'1490160596','os_versions':'10.2','screensize':750,'track_device_info':'iPhone9,1',
   'track_device_uuid':'B2AEEDD4-0EEF-42EF-A1D9-39111F88642F','track_deviceid':'C032BEF0-9E43-4F60-B4B2-463B56848A88','v':25,pagesize:20,'track_user_id':'2855572','oauth_token':'7b90319662134ded92eb76b7719b0a6a'
},
};
