/**
 * Created by timxiong on 2017/7/4.
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Platform,
    RefreshControl,
} from 'react-native';

import cfn from '../../../commonFun/commonFun'
import Global from '../../../commonFun/global';

const BASE_URL = 'http://gank.io/api/data/';
// const IMAGE_VIEW = '?imageView2/1/w/'+ cfn.picHeight(80) +'/h/' + cfn.picWidth(150);

export default class webPage extends PureComponent {

    constructor (props){
        super(props);
        this.state={
            ds: new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2}),
            isRefreshing: false,
        };

        this.canLoadMore = true;
        this.data = [];
        this.type = null;
        this.page = 1;
    }

    componentWillMount() {
        this.getData(this.props.tabLabel);
    }

    componentWillReceiveProps(props) {
    }



    getData(type){
        fetch(BASE_URL + type + '/20/' + this.page)
            .then((res)=>(res.json()))
            .then((data)=>{
                this.setData(data.results);
                //console.log(data.results);
            }).catch((err)=>{
            alert(err);
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

    setData(data) {
        this.data = this.data.concat(data);
        this.setState({ds: this.state.ds.cloneWithRows(this.data)})
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.data = [];
        this.getData(this.props.tabLabel);

        setTimeout(()=>{
            this.setState({isRefreshing: false});
        },1500)

    }
    _onEndReached() {

        if(!this.canLoadMore) return;

        this.canLoadMore = false;

        this.page ++;

        this.getData(this.props.tabLabel);

        setTimeout(()=>{
            this.canLoadMore = true;
        },1500);
    }

    renderRow(rowData) {
        return(
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>this.goToDetail('Detail',{
                        title:rowData.desc,
                        url:rowData.url,
                        data: rowData,
                    })}
                >
                    <Text
                        style={{width: Platform.OS == 'ios' ?
                            cfn.deviceWidth() - cfn.picWidth(30) :
                            cfn.deviceWidth() - cfn.picWidth(60),
                            color:'#333'

                    }}>
                        {rowData.desc}
                        </Text>
                    <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',marginTop:cfn.picHeight(15),}}>
                        <Text style={styles.textStyle}>{rowData.who == null || rowData.who == 'undefined' ? '匿名 ' : rowData.who} </Text>
                        <Text style={styles.textStyle}>{rowData.publishedAt.substring(0,10)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.data.length == 0 ?
                    <View style={{position:'absolute',}}>
                        <Text style={{color:'#888'}}>正在加载...</Text>
                    </View>
                    : null}
                <ListView
                    style={{width:cfn.deviceWidth(),}}
                    dataSource={this.state.ds}
                    renderRow={this.renderRow.bind(this)}
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
                    onEndReached={this._onEndReached.bind(this)}
                />
            </View>
        );
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
        fontSize: 10,
        lineHeight:10
    },
});
