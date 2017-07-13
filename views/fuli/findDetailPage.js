/**
 * Created by timxiong on 2017/7/5.
 */
/**
 * Created by timxiong on 2017/7/4.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    TextInput,
    Platform
} from 'react-native';

import cfn from '../../commonFun/commonFun'
import NavBar from '../navBar'

import find_icon from '../../images/find/find_icon.png'

export default class findDetailPage extends Component {

    static defaultProps={

    };

    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount() {
        this.findListener = DeviceEventEmitter.addListener('findDetail',()=>{
            this.props.navigation.navigate('FindDetail');
        })
    }

    componentWillUnmount() {
        this.findListener.remove();
    }
    getData() {

    }

    setData() {

    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.welcome}>
                    search
                </Text>
            </View>
        );
    }
}

function goToDetail() {
    DeviceEventEmitter.emit('findDetail');
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
});









{/*<NavBar*/}
{/*middleView={*/}
{/*<TouchableOpacity*/}
{/*onPress={()=>goToDetail()}*/}
{/*activeOpacity={0.9}*/}
{/*style={{backgroundColor:'#fff',*/}
{/*width:cfn.deviceWidth()-cfn.picWidth(30),*/}
{/*height: Platform.OS == 'ios' ? cfn.picHeight(60) : cfn.picHeight(70),*/}
{/*alignSelf:'center',*/}
{/*alignItems:'center',*/}
{/*justifyContent:'center',*/}
{/*borderRadius: 5,*/}
{/*flexDirection:'row'*/}
{/*}}>*/}
{/*<Image*/}
{/*source={find_icon}*/}
{/*style={{width:cfn.picWidth(35),height:cfn.picWidth(35)}}*/}
{/*/>*/}
{/*<Text style={{color: '#8a8a8a',marginLeft: cfn.picWidth(15)}}>搜索</Text>*/}
{/*</TouchableOpacity>*/}
{/*}*/}
{/*/>*/}





{/*<NavBar*/}
    {/*leftText='返回'*/}
    {/*middleView={*/}
        {/*<View style={{width:cfn.deviceWidth(),height:cfn.picHeight(60),*/}
            {/*flexDirection:'row',alignItems:'center',*/}
            {/*justifyContent:'flex-end'}}>*/}
            {/*<View*/}
                {/*onPress={()=>goToDetail()}*/}
                {/*activeOpacity={0.9}*/}
                {/*style={{backgroundColor:'#fff',*/}
                    {/*width:cfn.deviceWidth()-cfn.picWidth(120),*/}
                    {/*height: cfn.picHeight(60),*/}
                    {/*alignItems:'center',*/}
                    {/*justifyContent:'center',*/}
                    {/*borderRadius: 5,*/}
                    {/*flexDirection:'row',*/}
                    {/*marginRight:cfn.picWidth(20)*/}
                {/*}}>*/}
                {/*<Image*/}
                    {/*source={find_icon}*/}
                    {/*style={{width:cfn.picWidth(35),height:cfn.picWidth(35)}}*/}
                {/*/>*/}
                {/*<TextInput*/}
                    {/*style={{*/}
                        {/*color: '#8a8a8a',marginLeft: cfn.picWidth(15),*/}
                        {/*width:cfn.deviceWidth()-cfn.picWidth(180),*/}
                        {/*alignSelf:'center',*/}
                        {/*height:Platform.OS == 'ios' ? cfn.picHeight(50) : cfn.picHeight(100),*/}
                    {/*}}*/}
                    {/*underlineColorAndroid="transparent"*/}
                    {/*autoCapitalize="none"*/}
                    {/*autoFocus={true}*/}
                    {/*placeholder="请输入..."*/}
                    {/*returnKeyType="search"*/}
                    {/*returnKeyLabel="搜索"*/}
                    {/*clearButtonMode="while-editing"*/}
                {/*/>*/}
            {/*</View>*/}
        {/*</View>*/}
    {/*}*/}
{/*/>*/}




