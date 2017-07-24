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

} from 'react-native';
import NavBar from '../../navBar'
import cfn from '../../../commonFun/commonFun'
import donation from '../../../images/donation.jpg'

export default class aboutMe extends Component{

    goBack() {
        this.props.navigation.goBack();
    }

    goToDetail(route,params) {
        this.props.navigation.navigate(route,params);
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    leftText="返回"
                    leftFn={()=>this.goBack()}
                    middleText="关于"
                />
                <View style={styles.itemContainer}>
                    <Text style={{fontSize:21}}>本app基于react-native + redux开发</Text>
                    <Text style={{fontSize:21}}>适配android与iOS</Text>
                    <Text style={styles.textStyle}>精美图片，精彩视频，满满干货，满足充满好奇的你！</Text>
                    <Text style={styles.textStyle}>* 感谢干货集中营，数据均来自api/gank.io</Text>

                    <Text style={styles.textStyle}>* 如果你有好的意见或建议，欢迎联系我</Text>
                    <Text style={styles.textStyle}>* 如果本代码对你有所帮助，欢迎Start和Fork</Text>
                    <Text style={styles.textStyle}>* 同时，也不妨捐赠一下，请我喝杯可乐。</Text>

                    <Image source={donation} style={{width:cfn.deviceWidth() - 40,height:(cfn.deviceWidth() - 40)/4.55,
                        marginTop:20,marginBottom:20
                    }}/>
                    <Text style={[styles.textStyle,{color:'#000'}]}>邮箱: tmxiong@foxmail.com</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.goToDetail('Detail',{
                            title:"干果源码",
                            url:'https://github.com/tmxiong/gank',
                        })}
                    >
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.textStyle,{color:'#000'}]}>项目: </Text>
                            <Text style={[styles.textStyle,{color:'#00f',textDecorationLine:'underline'}]}>github.com/tmxiong/gank</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        width:cfn.deviceWidth() - cfn.picWidth(30),
        backgroundColor:'#fff',
        alignSelf: 'center',
        justifyContent:'center',
        borderRadius:5,
        marginTop:cfn.picHeight(20),
        padding:10
    },
    textStyle: {
        color:'#888',
        fontSize: 15,
        marginTop:10,
    },
});