
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
        width:commonFun.picWidth(100),
        height:commonFun.picWidth(100),
        justifyContent:'center',
        alignItems:'center',
        //top:commonFun.picWidth(20)
    },
    ImageStyle: {
        width:commonFun.picWidth(60),
        height:commonFun.picWidth(50),
        alignSelf:'center'

    },
    TextStyle: {
        fontSize: 18,
        //top:commonFun.picWidth(20)
    },
});