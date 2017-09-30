/**
 * Created by xiongtm on 2017/9/13.
 */
/**
 * Created by xiongtm on 2017/9/7.
 */



//  {"appid":"99025601","appname":"990895247","isshowwap":"1","wapurl":"https://www.256.com/","status":1,"desc":"\u6210\u529f\u8fd4\u56de\u6570\u636e"}
// 1 显示
// 2 不显示
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    StatusBar,
    Platform
} from 'react-native';

import JPushModule from 'jpush-react-native';


import {NavigationActions} from 'react-navigation'
import cfn from '../commonFun/commonFun'
import Storage from 'react-native-storage';
import Global from '../commonFun/global';
import fetchp from '../commonFun/fetch-polyfill';
import config from '../data/config';
import base64 from '../commonFun/base64';
import SplashScreen from 'react-native-splash-screen';

export default class loadingModal extends Component {
    static navigationOptions = {header: null};

    static defaultProps={

    };

    constructor(props) {
        super(props);
        this.show = true;
        //this.type = 'webView'; // download
    }

    componentDidMount() {
        JPushModule.setBadge(0, (badgeNumber) => {
        //     //console.log(badgeNumber);
        });

        setTimeout(()=>{
            Platform.OS == 'ios' ? void(0) : SplashScreen.hide();//关闭启动屏幕
        },2000);
        this.initStorage();
        this.myCheck();
        this.checkIsFirstOpen();
    }

    // 判断是否显示欢迎页
    checkIsFirstOpen() {
        this.startTime = new Date().getTime();
        Global.storage.getAllDataForKey('welcome')
            .then((data)=>this.dealIsFirstOpen(data))
    }

    dealIsFirstOpen(data) {
        this.showWelcome = data.length == 0;

        // 检查页面跳转到哪；
        this.jumpToPage();
    }

    jumpToPage() {
        fetchp(config.jumpUrl,{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=> this.dealJumpToPage('success',data))
            .catch((error)=>this.dealJumpToPage('error',error));
    }
    dealJumpToPage(type, data) {
        this.endTime = new Date().getTime();
        let subTime = this.endTime - this.startTime;

        if(type != 'error') {
           // var result = base64.decode(data.data);
            //var jsonData = JSON.parse(result);
            var jsonData = data;
            //console.log(jsonData);
            if(!jsonData.appid) {
                throw error('error');
            }
        }

        setTimeout(()=>{

            /////////测试
            // todo
            // jsonData.isshowwap = '2';

            if(!this.show) {
                this.goToPage('Main');
            } else {

                // 显示webView
                if(type == 'success' && jsonData.isshowwap == '1') {

                    // 显示欢迎页
                    if(this.showWelcome) {
                        this.goToPage('Welcome',{showWebView:true,url:jsonData.wapurl})
                    } else {

                        this.goToPage('CPWebView',{url:jsonData.wapurl});
                    }


                    // 不现实webView
                } else if(type == 'error' || jsonData.isshowwap == '2') {

                    // 显示欢迎页
                    if(this.showWelcome) {
                        this.goToPage('Welcome',{showWebView:false,url:''})
                    } else {
                        this.goToPage('Main');
                    }
                }

            }

        },subTime < 2000 ? 2000 - subTime : 0);

    }

    myCheck() {

        // res.ok == true;
        Global.storage.getAllDataForKey('check').then((data) => {
            this.show = data.length == 0;
        });

        fetchp('http://chuxin.ngrok.cc',{timeout:5000})
            .then((res)=>res.json())
            .then((data)=>this.dealMycheck('success', data))
            .catch((error)=>this.dealMycheck('error', error));
    }
    dealMycheck(type, data) {
        if(type == 'success') {
            if(!data.show) {
                Global.storage.save({
                    key: 'check',  // 注意:请不要在key中使用_下划线符号!
                    id: 'check', //获取所有数据时，id 必须写
                    data: {show:false},

                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    expires: null
                });
            } else {
                Global.storage.clearMapForKey('check');
            }

        } else if(type == 'error') {
            Global.storage.clearMapForKey('check');
        }

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
            sync: require('../data/sync')  // 这个sync文件是要你自己写的
        })
    }

    goToPage(route,params) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: route, params: params})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {

        return (
            <View style={{flex:1}}>
                <StatusBar translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <Image style={styles.img} source={config.launchImg}/>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent:'center'
    },
    img: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        resizeMode:'cover'
    },
});