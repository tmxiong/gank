/**
 * Created by timxiong on 2017/7/4.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';

import cfn from '../../commonFun/commonFun'

import NavBar from '../navBar'
import more from '../../images/mine/more_icon.png'
import default_icon from '../../images/mine/default_icon.png';
import history_icon from '../../images/mine/history_icon.png';
import collection_icon from '../../images/mine/collection_icon.png';
import about_icon from '../../images/mine/about_icon.png';
import welcome_icon from '../../images/mine/welcome_icon.png';

import {connect} from 'react-redux';

class minePage extends Component {

    goToDetail(route ,params) {
        this.props.navigation.navigate(route, params);
    }

    render() {
        const {icon} = this.props;
        return (
            <View style={styles.container}>
                <NavBar
                middleText="我的"
                leftIcon={null}
                />
                <View >
                    <View style={{width:cfn.deviceWidth(),
                        height:cfn.picHeight(250),backgroundColor:'#fff',
                        alignItems:'center',
                        borderBottomColor:'#eee',
                        justifyContent:'center',
                        borderBottomWidth:1,}}>
                        <View style={{
                            width:cfn.picWidth(100),
                            height:cfn.picWidth(100),
                            borderRadius:cfn.picWidth(50),
                            alignItems:'center',
                            justifyContent:'center',
                            overflow:'hidden',
                        }}>
                            <Image
                                source={icon == '' ? default_icon : {uri:icon}}
                                style={{
                                width:cfn.picWidth(150),
                                height:cfn.picWidth(150),
                            }}/>
                        </View>
                        {/*<Text style={{fontSize:20,marginTop:cfn.picWidth(10)}}>干货集中营</Text>*/}
                        <Text style={{fontSize:12,marginTop:cfn.picWidth(20),color:'#888'}}>小而美的第三方gank.io客户端</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.goToDetail('History')}
                        style={[styles.itemContainer,{marginTop:cfn.picHeight(50),}]}>
                        <Image
                            source={history_icon}
                            style={{width:cfn.picWidth(40),resizeMode:'contain',
                                marginLeft:cfn.picWidth(50),marginRight:cfn.picWidth(50)
                            }}
                        />
                        <Text>阅读记录</Text>
                        <Image
                            style={{width:cfn.picWidth(40),
                                resizeMode:'contain',position:'absolute',right:cfn.picWidth(50)}}
                            source={more}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.goToDetail('Collection')}
                        style={styles.itemContainer}>
                        <Image
                            source={collection_icon}
                            style={{width:cfn.picWidth(40),resizeMode:'contain',
                                marginLeft:cfn.picWidth(50),marginRight:cfn.picWidth(50)
                            }}
                        />
                        <Text>我的收藏</Text>
                        <Image
                            style={{width:cfn.picWidth(40),
                                resizeMode:'contain',position:'absolute',right:cfn.picWidth(50)}}
                            source={more}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.goToDetail('Welcome',{showWebView:false,url:'h'})}
                        style={[styles.itemContainer,{marginTop:cfn.picHeight(50),}]}>
                        <Image
                            source={welcome_icon}
                            style={{width:cfn.picWidth(40),resizeMode:'contain',
                                marginLeft:cfn.picWidth(50),marginRight:cfn.picWidth(50)
                            }}
                        />
                        <Text>我的欢迎页</Text>
                        <Image
                            style={{width:cfn.picWidth(40),
                                resizeMode:'contain',position:'absolute',right:cfn.picWidth(50)}}
                            source={more}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>Alert.alert('反馈邮箱：','2439151289@qq.com')}
                        style={[styles.itemContainer,{marginTop:cfn.picHeight(50),}]}>
                        <Image
                            source={about_icon}
                            style={{width:cfn.picWidth(40),resizeMode:'contain',
                                marginLeft:cfn.picWidth(50),marginRight:cfn.picWidth(50)
                            }}
                        />
                        <Text>我要反馈</Text>
                        <Image
                            style={{width:cfn.picWidth(40),
                                resizeMode:'contain',position:'absolute',right:cfn.picWidth(50)}}
                            source={more}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    itemContainer: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(100),backgroundColor:'#fff',
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        flexDirection:'row'
    }
});

function setIcon(store) {
    return {
        icon: store.mine.icon
    }
}
export default connect(setIcon)(minePage)
