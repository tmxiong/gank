/**
 * Created by timxiong on 2017/7/10.
 */
/**
 * Created by timxiong on 2017/7/10.
 */
import React,{Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import NavBar from '../../navBar'
import cfn from '../../../commonFun/commonFun'


export default class aboutMe extends Component{

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return(
            <View style={{backgroundColor:'#fff',flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                <NavBar
                    leftText="返回"
                    leftFn={()=>this.goBack()}
                    middleText="关于作者"
                />
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={styles.textStyle}>邮箱: tmxiong@foxmail.com</Text>
                    <Text style={styles.textStyle}>项目: github.com/tmxiong</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1
    },
    itemContainer: {
        width:cfn.deviceWidth() - cfn.picWidth(30),
        backgroundColor:'#fff',
        alignSelf: 'center',
        minHeight:cfn.picHeight(80),
        justifyContent:'center',
        borderBottomColor:'#dedede',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingTop:cfn.picHeight(15),
        paddingBottom:cfn.picHeight(15),
    },
    textStyle: {
        color:'#888',
        fontSize: 20,
    },
});