/**
 * Created by xiongtm on 2017/9/7.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import cfn from '../commonFun/commonFun'
import Indicator from '../components/IndicatorWelcome'
import Global from '../commonFun/global'
import config from '../data/config'
export default class loadingModal extends Component {
    static navigationOptions = {header: null};

    static defaultProps={

    };

    constructor(props) {
        super(props);

        this.showWebView = this.props.navigation.state.params.showWebView;
        this.url = this.props.navigation.state.params.url;
    }

    componentDidMount() {

    }
    goToPage() {
        let route = this.showWebView ? 'CPWebView' : 'Main';
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: route, params:{url:this.url}})
            ]
        });

        Global.storage.save({
            key: 'welcome',  // 注意:请不要在key中使用_下划线符号!
            id: 'welcome', //获取所有数据时，id 必须写
            data: {isFirst:false},

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });

        this.props.navigation.dispatch(resetAction);
    }

    _onScroll(event) {
        let offsetX = event.nativeEvent.contentOffset.x;
        this.nextPage = Math.round(offsetX / cfn.deviceWidth());
        this.nextPagePixel = offsetX / cfn.deviceWidth();

        //指示器滚动效果--自动滚动
        // if (this.isAutoScroll) {
        //     this.ref.indecator.setNativeProps(
        //         {style: {right: this.ref.rightX - this.nextPage * commonFn.picWidth(24)}}
        //     )
        // } else {
            //指示器滚动效果--手动滑动
            this.ref.indecator.setNativeProps(
                {style: {right: this.ref.rightX  -
                this.nextPagePixel * this.ref.pointWidth * 2}}
            );
        //}
    }

    render() {

        return (
            <View>
                <StatusBar translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onScroll={this._onScroll.bind(this)}
                    //onTouchStart={()=>this.onTouchStart()}
                    //onScrollEndDrag={()=>this.startScroll()}
                    //onTouchEnd={()=>this.startScroll()}
                    ref={(ref)=>this._scrollView = ref}
                >
                    {/*<Image style={styles.img} source={config.welcomeImg[0]}/>*/}
                    <Image style={styles.img} source={config.welcomeImg[0]}/>
                    <Image style={styles.img} source={config.welcomeImg[1]}/>
                    <Image style={[styles.img,{alignItems:'center',justifyContent:'flex-end',}]}
                           source={config.welcomeImg[2]}>
                        <TouchableOpacity
                            onPress={()=>this.goToPage()}
                            activeOpacity={0.8}
                            style={styles.btn}
                        >
                            <Text style={styles.text}>马上开始</Text>
                        </TouchableOpacity>
                    </Image>
                </ScrollView>
                <Indicator
                    pointCount={config.welcomeImg.length}
                    ref={(ref)=>this.ref = ref}
                    activePointColor="#fff"
                    bottomPointsColor="rgba(0,0,0,0.2)"

                />
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
    btn: {
        width:cfn.picWidth(250),
        height:cfn.picHeight(80),
        borderRadius:cfn.picHeight(30),
        borderWidth:2,
        borderColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:cfn.picHeight(100),
        backgroundColor:'rgba(200,0,0,0.4)'
    },
    text: {
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
        backgroundColor:'transparent'

    }
});