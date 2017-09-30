/**
 * Created by timxiong on 2017/9/29.
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
    Platform,
    ScrollView,
    RefreshControl
} from 'react-native';

import cfn from '../../../commonFun/commonFun'
import Global from '../../../commonFun/global';

// 每日数据 http://gank.io/api/day/2015/08/06
// 发过干货的日期 http://gank.io/api/day/history
var day_url = 'http://gank.io/api/day/history';
var zonghe_url = 'http://gank.io/api/day/';
export default class zonghePage extends Component {

    static defaultProps={

    };

    constructor(props){
        super(props);
        this.state={
            imgUrl:'1',
            items: null,
            isRefreshing:false,
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {

    }
    getData() {
        fetch(day_url)
            .then((res)=>res.json())
            .then((data)=>fetch(zonghe_url + data.results[0].replace(/[-]/g,'/'))
                .then((res)=>res.json())
                .then((data)=>this.setData(data))
                .catch((error)=>{})
            )
            .catch((error)=>{})
    }

    setData(data) {
        //console.log(data);

        let keys = data.category;
        // 去除福利
        for(let i = 0; i < keys.length; i++) {
            if(keys[i] == '福利') {
                keys.splice(i,1);
                break;
            }
        }

        // 福利单独放置头部；
        let fuli = data.results['福利'];

        let items = this.renderView(keys,data);

        this.setState({
            imgUrl:fuli[0].url,
            items: items,
            isRefreshing:false,
        })
    }

    goToDetail(route,params) {
        this.props.navigation.navigate(route,params);
        this.setReadHistory(params.data);
    }

    setReadHistory(data) {
        Global.storage.save({
            key: 'readHistory',  // 注意:请不要在key中使用_下划线符号!
            id: data._id, //获取所有数据时，id 必须写
            data: data,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
    }

    renderSections(title,items) {
        var bgColor = cfn.getBgColor(title);

        return(
            <View
                key={bgColor}
                style={[styles.sections,{borderColor:bgColor}]}>
                <View style={[styles.section_title,{backgroundColor:bgColor}]}>
                    <Text style={styles.section_text}>{title}</Text>
                </View>
                {this.renderItems(items)}

            </View>
        )
    }

    renderItems(data) {
        let items = [];
        for(let i = 0; i < data.length; i++) {
            items.push(
                <TouchableOpacity
                    onPress={()=>this.goToDetail('Detail',{
                        title:data[i].desc,
                        url:data[i].url,
                        data: data[i],
                    })}
                    activeOpacity={0.8}
                    key={'i' + i}
                    style={styles.item}>
                    <Text style={styles.title_text}>{data[i].desc}</Text>
                    <View style={styles.author}>
                        <Text style={{color:'#888',fontSize:12}}>{data[i].who == null || data[i].who == 'undefined' ? '匿名 ' : data[i].who}</Text>
                        <Text style={{color:'#888',fontSize:12,marginLeft:cfn.picHeight(10)}}>{data[i].publishedAt.replace('T','  ')}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return items;

    }

    renderView(keys,data) {
        let sections = [];

        for(let i = 0; i < keys.length; i ++) {
            let datas = data.results[keys[i]];
            sections.push(this.renderSections(keys[i],datas));
        }

        return sections;
    }

    _onRefresh() {
        this.setState({isRefreshing:true});
        this.getData()
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#000"
                        title="正在刷新..."
                        titleColor="#000"
                        colors={['#000']}
                        progressBackgroundColor="#fff"
                    />
                }
            >
                <View  style={styles.container}>
                    <Image source={{uri:this.state.imgUrl}}
                           style={styles.titleImg}
                    />
                        {/*水印*/}
                        {/*<View style={{width:cfn.deviceWidth(),justifyContent:'center',*/}
                            {/*height:cfn.picHeight(70),alignItems:'center',*/}
                        {/*}}>*/}
                            {/*<Text>测试版</Text>*/}
                        {/*</View>*/}

                        {this.state.items}
                    </View>
                {!this.state.items ?
                    <View style={{position:'absolute',alignSelf:'center',top:cfn.deviceHeight()/2-cfn.picHeight(100)}}>
                        <Text style={{color:'#888'}}>正在加载...</Text>
                    </View>
                    : null}
                <View style={{height: 10}}/>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleImg: {
        width:cfn.deviceWidth(),
        height: cfn.picHeight(400)
    },
    sections: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        backgroundColor:'#fff',
        borderRadius:8,
        borderColor:'#eee',
        borderWidth:1,
        marginTop:cfn.picHeight(20),
        overflow:'hidden'
    },
    section_title: {
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        height:cfn.picHeight(70),
        justifyContent:'center',
        padding:cfn.picHeight(20),

    },
    section_text: {
      fontSize:20,
        color:'#fff'
    },
    title_text: {

    },
    item: {
      padding:cfn.picHeight(20),
        borderTopColor:'#eee',
        borderTopWidth:1
    },
    author: {
        flexDirection:'row',
        marginTop:cfn.picHeight(10)
    }
});

