/**
 * Created by timxiong on 2017/7/4.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    Image,
    Platform,
    StatusBar,
    AsyncStorage,
} from 'react-native';

import cfn from '../../commonFun/commonFun'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import ChildPage from '../home/children/childPage'
import ZonghePage from '../home/children/zonghePage';
import Storage from 'react-native-storage';

import search_icon from '../../images/home/search_icon.png'

const BASE_URL = 'http://gank.io/api/data/';
const PAGE_TYPE = ['综合', 'iOS', 'Android',  '前端', '休息视频', '瞎推荐', '拓展资源'];

// 每日数据 http://gank.io/api/day/2015/08/06
// 发过干货的日期 http://gank.io/api/day/history

export default class homePage extends Component {

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state={
            data:null,
        };

        this.showPages=[];
        this.page = 1;

    }

    getIndex(obj) {
        let currentType = null;
        let len = this.showPages.length;
        if(len == 0) {
            //this.getData(PAGE_TYPE[0], 0);
        }else{

            if(this.showPages.indexOf(obj.i) == -1) {
                //📃页面未曾被加载
                currentType = PAGE_TYPE[obj.i];
                //this.getData(currentType, obj.i);
                //console.log(currentType);
            }

        }

    }

    renderChildPage() {
        let pages = [
            <ZonghePage
                key={0}
                tabLabel={PAGE_TYPE[0]}
                navigation={this.props.navigation}
            />
        ];
        for(let i = 1; i < PAGE_TYPE.length; i++) {
            pages.push(
                <ChildPage
                    key={i}
                    tabLabel={PAGE_TYPE[i]}
                    navigation={this.props.navigation}
                />
            )
        }
        return pages;
    }
    render() {
        return (
            <View style={{width:cfn.deviceWidth(),height:cfn.deviceHeight(),backgroundColor:'#fff'}}>
                <StatusBar backgroundColor="transparent" barStyle="light-content"/>
                <View style={{width:cfn.deviceWidth(), height:cfn.picHeight(50), backgroundColor:'#0F88EE'}}/>
                {/*<TouchableOpacity*/}
                    {/*style={{*/}
                        {/*position:'absolute',*/}
                        {/*right:cfn.picWidth(0),*/}
                        {/*top: cfn.picHeight(65),*/}
                        {/*width:cfn.picWidth(70),*/}
                        {/*height:cfn.picHeight(70),*/}
                        {/*alignItems:'center',*/}
                        {/*justifyContent:'center',*/}
                        {/*zIndex:2,*/}
                    {/*}}>*/}
                    {/*<Image source={search_icon}*/}
                           {/*style={{width:cfn.picWidth(40),height:cfn.picHeight(40),resizeMode:'contain'*/}
                           {/*}}/>*/}
                {/*</TouchableOpacity>*/}
                <ScrollableTabView
                    //renderTabBar={() => <ScrollableTabBar style={{paddingRight:cfn.picWidth(70),}}/>}
                    renderTabBar={() => <ScrollableTabBar/>}
                    onChangeTab={(obj)=> this.getIndex(obj)}
                    tabBarBackgroundColor='#0F88EE'
                    tabBarActiveTextColor='#fff'
                    tabBarInactiveTextColor='#fff'
                    tabBarUnderlineStyle={{backgroundColor:'#fff'}}
                    tabBarTextStyle={{fontSize: 13}}

                >
                    {this.renderChildPage()}
                </ScrollableTabView>
                <View style={{height: 50}}/>
            </View>
        );
    }
}


