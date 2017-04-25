import React, { Component }from 'react';

import Storage from 'react-native-storage';

import { AsyncStorage,StyleSheet,Text } from 'react-native';

 export default class MainStorage {

   //获取
   static get(key) {
     return AsyncStorage.getItem(key).then((value) => {
       const jsonValue = JSON.parse(value);
       return jsonValue;
     });
   }

   //保存
   static save(key,value){
     return AsyncStorage.setItem(key,JSON.stringify(value));
   }

   //更新
   static updata(key,value){
     return MainStorage.get(key).then((item) => {
       value = typeof value === 'string' ? value : Object.assign({}, item, value);
       return AsyncStorage.setItem(key, JSON.stringify(value));
     });
   }

   //删除
   static delete(key){
     return AsyncStorage.removeItem(key);
   }
 }
