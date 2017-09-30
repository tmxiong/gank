/**
 我们删除了所有可能导致侵权的文章，现在，所有的开奖号码和彩票资讯都是我们自己的。此app不售卖彩票，它只是一个展示彩票资讯和查询开奖号码的工具。
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    FlatList,
    Platform,
    StatusBar,
    Linking
} from 'react-native';
import cfn from '../../commonFun/commonFun';
import fetchp from '../../commonFun/fetch-polyfill';
export default class tipsDetailPage extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            html:'',
        };
        this.isFirstLoad = true;
        this.url = this.props.navigation.state.params.url;
        this.type = 'webView'; //download
        // https://apk-ing.zz-app.com/1.html  // 下载的
        // http://pc28.qq-app.com/apk-zd.html  // 浏览的

        // 下载地址：
        // "http://update.juw37xqo3x.com/apk/cp256.apk"
    }

    static defaultProps = {};

    componentDidMount() {
        // onBackAndroid.bindHardwareBackPress();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    _onLoadStart() {
        if(this.isFirstLoad) {
            this.isFirstLoad = false;
            this.setState({isLoading:true});
        }

    }
    _onLoadEnd() {
        this.isFirstLoad = false;
        this.setState({isLoading:false});
    }

    onNavigationStateChange(event){
        let url = event.url;
        if(url.match('.apk') && url.match('update')){
            this.type = 'download';
            Linking.openURL(url).catch(err => console.error('An error occurred', err));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <View style={styles.statusBar}/>

                <WebView
                    style={styles.webView}
                    source={{uri:this.url}}
                    //source={{uri:'https://google.com'}}
                    onLoadStart={()=>this._onLoadStart()}
                    onLoadEnd={()=>this._onLoadEnd()}
                    startInLoadingState={true}
                    //onNavigationStateChange={this.onNavigationStateChange}//在WebView中注册该回调方法
                    //scalesPageToFit={true}
                />
            </View>
            )
    }

}
const styles = StyleSheet.create({
    container: {
        height:cfn.deviceHeight(),
        width:cfn.deviceWidth(),
        alignItems:'center',
        justifyContent:'center'
    },
    webView: {
        flex:1,
        height:cfn.deviceHeight(),
        width:cfn.deviceWidth(),
    },
    statusBar: {
        height:cfn.picHeight(50),
        backgroundColor:'rgb(217,29,54)',
        width:cfn.deviceWidth()
    },
    isLoading: {
        position:'absolute',
        top:cfn.deviceHeight()/2,
        zIndex:5
    },
});