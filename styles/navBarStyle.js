

import {StyleSheet,} from 'react-native';
import commonFun from '../commonFun/commonFun'

module.exports = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: commonFun.deviceWidth(),
        height: commonFun.deviceHeight(),
        justifyContent: 'center'
    },
    content: {
        position: 'absolute',
        width:commonFun.picWidth(150),
        height:commonFun.picWidth(100),
        justifyContent:'center',
        alignItems:'center',
    },
    ImageStyle: {
        width:commonFun.picWidth(40),
        height:commonFun.picWidth(40),
        alignSelf:'center',
        resizeMode:'contain'

    },
    TextStyle: {
        fontSize: 14,
        backgroundColor:'transparent'
        //top:commonFun.picWidth(20)
    },
});