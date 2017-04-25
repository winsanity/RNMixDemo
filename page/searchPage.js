import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  ScrollView,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';

var SINGLEW = (theme.screenWidth - 75)/3 ;

import theme from '../config/theme';
import NetworkUtil from '../Util/NetworkUtil';
import MainPage from './MainPage';
import ImageButton from '../component/ImageButtonWithText';
import Icon from 'react-native-vector-icons/Ionicons';
import PageLoading from '../component/pageLoadingView';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      listsArr:[ ],
      isShowCommon:true,
      searchText:null,
      showingContent:[ ],
      selectedIndex:0,
      loadedData:false,
      contents:[ ]
    }
  }

  componentDidMount(){
    this._getListData();
  }

  _getListData(){
    var that = this;
    let data = theme.BaseRequestListData;
    data.is_new = 1;
    data.is_rec_cate = 1;
    var arrays = [ ];
    var url =theme.kBaseURL + 'category/list';
    NetworkUtil.get(url,data,function(set){
        var jsonData = set.data;
        for (var i = 0; i < jsonData.length; i++) {
          var single = jsonData[i];
          arrays.push(single);
        }
        that.setState({
          listsArr:arrays,
          loadedData:true,
          contents:jsonData[0].subclass
        })
    })
  }
  render(){
    return(

      !this.state.loadedData ?
      <PageLoading />
      :
      <View style={styles.conteiner}>
        <View style={styles.toolBar}>
           <ImageButton icon="ios-arrow-back" color="#BFBFBF" imgSize={25} btnStyle={styles.imgBtn} onPress={() => MainPage.pageBack(this)}/>
           <View style={styles.searchBar}>
             <Icon name='ios-search' size={16} color='#BFBFBF' style={{marginLeft:10}}/>
             <TextInput
               style={styles.textInput}
               onChangeText={(text) => this.setState({searchText:text}) }
               placeholder='搜索好物、文章、晒单、用户'
             />
           </View>
        </View>
        <View style={styles.lineView}></View>
         <ScrollView style={styles.scrollView}>
           {
             this.state.listsArr.map((item,i) => {
               return(
                 <TouchableOpacity
                   activeOpacity={theme.btnActiveOpacity}
                   key={i}
                   onPress={() => this.setState({selectedIndex:i,contents:item.subclass})}
                 >
                 {this._renderItemContent(item,i)}
                 </TouchableOpacity>
               )
             })
           }
         </ScrollView>
         <View style={styles.content}>
           <ScrollView style={styles.scrollView_c}>
           <View style={styles.mainContent}>
           {
             this.state.contents.map((item,i) => {
               return(
               <TouchableOpacity key={i} onPress={() => MainPage.swithchToSearchItemPage(item)}>
                 <View style={styles.singleActivity}>
                   <Image style={{width:40,height:40,marginTop:10}} source={{uri:item.icon}}></Image>
                   <Text style={{textAlign:'center',marginTop:5,fontSize:14,color:theme.baseColor}}>{item.name}</Text>
                 </View>
               </TouchableOpacity>
             );
             })
           }

          </View>
         </ScrollView>
        </View>
      </View>
    )
  }

  _renderItem(rowData,rowID){
     return(
       <TouchableOpacity
         activeOpacity={theme.btnActiveOpacity}
       >
       {this._renderItemContent(rowData,rowID)}
       </TouchableOpacity>

     );
  }
  _renderItemContent(rowData,rowID){
    return(
      this.state.selectedIndex === rowID ?
      <View style={[styles.cellBgView,{backgroundColor:'white'}]}>
        <View style={{width:5,height:15,backgroundColor:theme.baseColor,borderRadius:2,marginLeft:5}}></View>
        <Text style={[styles.title,{color:'red',width:50}]}>{rowData.name}</Text>
      </View>
      :
      <View style={styles.cellBgView}>
        <Text style={styles.title}>{rowData.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  toolBar:{
    width:theme.screenWidth,
    height:64,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'white'
 },
 imgBtn:{
   width:49,
   height:49,
   marginTop:20
 },
 searchBar:{
   backgroundColor:'#DADFE1',
   width:theme.screenWidth-70,
   height:28,
   marginRight:20,
   flexDirection:'row',
   alignItems:'center',
   marginTop:20
 },
 textInput:{
   marginLeft:10,
   height:28,
   width:theme.screenWidth-100,
   color:'gray',
   fontSize:13
 },
 lineView:{
   width:theme.screenWidth,
   height:0.5,
   backgroundColor:'#DADFE1'
 },
 cellBgView:{
   backgroundColor:theme.baseColor,
   flexDirection:'row',
   alignItems:'center'
 },
 scrollView:{
   backgroundColor:theme.baseColor,
   height:theme.screenHeight - 64.5
 },
 title:{
   paddingTop:20,
   paddingBottom:20,
   textAlign:'center',
   width:60
 },
 content:{
   flex:1,
   width:theme.screenWidth - 75,
   height:theme.screenHeight - 64.5,
   position:'absolute',
   left:75,
   top:64.5,
   backgroundColor:'white',
 },
 mainContent:{
   flexDirection:'row',
   flexWrap:'wrap',
   alignItems:'center'
 },
 singleActivity:{
   width:SINGLEW,
   height:SINGLEW,
   alignItems:'center'
 },
 scrollView_c:{
   height:theme.screenHeight - 64.5,

 }
})
