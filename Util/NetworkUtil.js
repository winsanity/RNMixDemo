'use strict';
import React ,{Component} from 'react';

export default class NetworkUtil extends Component {
  //post请求
  /**
  *url :请求地址
  *data:参数
  *callback:回调函数
  */
  static postForm(url,data,callback){
    var fetchOptions = {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body:'data'+data+''
    };
    fetch(url,fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      callback(JSON.parse(responseText));
    }).done();
  }

  /**
  *url :请求地址
  *data:参数(Json对象)
  *callback:回调函数
  */

  static postJson(url,data,callback){
    var fetchOptions = {
      method:'POST',
      headers:{
        'Accept': 'application/json',
        //json形式
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    };
    fetch(url,fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      callback(JSON.parse(responseText));
    }).done();
  }

  //get请求
    /**
    *url :请求地址
    *callback:回调函数
    */
    static get(url,params,callback){
      if (params) {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&');
        }else{
          url += '&'+paramsArray.join('&')
        }
      }
      var fetchOptions = {
        method:'GET'
      };
      fetch(url,fetchOptions)
      .then((response) => response.text())
      .then((responseText) => {
        callback(JSON.parse(responseText));
      }).done();
    }
}
