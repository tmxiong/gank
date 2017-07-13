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
import Storage from 'react-native-storage';
import Global from '../../commonFun/global';

import more_icon from '../../images/home/more.png'

/*
*
* _id: "592cf7ce421aa92c7be61b70"
 createdAt: "2017-05-30T12:40:46.990Z"
 desc: "一个可以下载离线阅读gitbook的简单iOS App"
 images: Array[1]
 publishedAt: "2017-06-01T14:35:22.88Z"
 source: "web"
 type: "iOS"
 url: "https://github.com/KrisYu/Octobook"
 used: true
 who: "Xue Yu"
* */

const BASE_URL = 'http://gank.io/api/data/';
const PAGE_TYPE = ['Android', 'iOS', '前端', '休息视频', '瞎推荐', '拓展资源'];
export default class homePage extends Component {

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state={
            data:null
        };

        this.showPages=[];
        this.page = 1;

    }

    componentDidMount() {
        this.initStorage();
    }

    initStorage() {
        Global.storage = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,

            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,

            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            defaultExpires: null,

            // 读写时在内存中缓存数据。默认启用。
            enableCache: true,

            // 如果storage中没有相应数据，或数据已过期，
            // 则会调用相应的sync方法，无缝返回最新数据。
            // sync方法的具体说明会在后文提到
            // 你可以在构造函数这里就写好sync的方法
            // 或是写到另一个文件里，这里require引入
            // 或是在任何时候，直接对storage.sync进行赋值修改
            sync: require('../../data/sync')  // 这个sync文件是要你自己写的
        })
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
                console.log(currentType);
            }

        }

    }

    renderChildPage() {
        let pages = [];
        for(let i = 0; i < PAGE_TYPE.length; i++) {
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
                <TouchableOpacity
                    style={{
                        position:'absolute',
                        right:cfn.picWidth(0),
                        top: cfn.picHeight(65),
                        width:cfn.picWidth(70),
                        height:cfn.picHeight(70),
                        alignItems:'center',
                        justifyContent:'center',
                        zIndex:2,
                    }}>
                    <Image source={more_icon}
                           style={{width:cfn.picWidth(30),height:cfn.picHeight(25),
                           }}/>
                </TouchableOpacity>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar style={{paddingRight:cfn.picWidth(70),}}/>}
                    onChangeTab={(obj)=> this.getIndex(obj)}
                    tabBarBackgroundColor='#0F88EE'
                    tabBarActiveTextColor='#fff'
                    tabBarInactiveTextColor='#fff'
                    tabBarUnderlineStyle={{backgroundColor:'#fff'}}
                    tabBarTextStyle={{fontSize: 13}}

                >
                    {this.renderChildPage()}
                </ScrollableTabView>
            </View>
        );
    }
}


