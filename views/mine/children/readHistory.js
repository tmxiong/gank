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
    Platform,
    Alert,
} from 'react-native';
import NavBar from '../../navBar'
import cfn from '../../../commonFun/commonFun'
import Global from '../../../commonFun/global';



export default class readHistory extends Component{

    constructor (props){
        super(props);
        this.state={
            ds: new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2}),
            data:[],
        };

    }

    componentDidMount() {
        this.getReadHistory();
    }

    goToDetail(route,params) {
        this.props.navigation.navigate(route,params);
    }

    getReadHistory() {
        // 获取某个key下的所有数据
        Global.storage.getAllDataForKey('readHistory').then((data) => {
            this.setData(data);
        });

    }

    setData(data) {
        this.setState({
            data:data,
            ds:this.state.ds.cloneWithRows(data)
        })
    }

    goBack() {
        this.props.navigation.goBack();
    }

    _renderRow(rowData) {
        let bgColor = cfn.getBgColor(rowData.type);
        return(
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{marginTop:cfn.picHeight(15),
                        marginBottom:cfn.picHeight(15),width:cfn.deviceWidth()}}
                    onPress={()=>this.goToDetail('Detail',{
                        title:rowData.desc,
                        url:rowData.url,
                        data: rowData,
                    })}
                >
                    <View style={{flexDirection:'row',width:cfn.deviceWidth()-cfn.picWidth(70)}}>
                        <View style={[styles.point,{backgroundColor:bgColor}]}/>
                        <Text style={{color:'#333',flexWrap:'wrap',
                            marginLeft:cfn.picWidth(10),}}>
                            {rowData.desc}
                        </Text>
                    </View>

                    <View  style={{flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'flex-start',
                        marginTop:cfn.picHeight(15),marginLeft:cfn.picWidth(60)}}>
                        <Text style={styles.textStyle}>{rowData.who == null || rowData.who == 'undefined' ? '匿名 ' : rowData.who} </Text>
                        <Text style={styles.textStyle}>{rowData.publishedAt.substring(0,10)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    clearData() {
        if (this.state.data.length == 0) {
            return Alert.alert( '提示',
                '没有历史记录',
                [
                    {text: '确定', onPress: ()=> {}},
                ]);
        }
        Alert.alert( '清除历史记录',
            '确定要清除历史记录？',
            [
                {text: '确定', onPress: ()=> this.clearAllOk()},
                {text: '取消', onPress: ()=> {}}
            ]);
    }

    clearAllOk() {
        Global.storage.clearMapForKey('readHistory');
        this.getReadHistory();
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    leftText="返回"
                    leftFn={()=>this.goBack()}
                    middleText="阅读记录"
                    rightText="清除记录"
                    rightFn={()=>this.clearData()}
                />
                <ListView
                    style={{width:cfn.deviceWidth(),}}
                    dataSource={this.state.ds}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                />
                {this.state.data.length == 0 ? <Text style={{position:'absolute',color:'#ddd'}}>暂无阅读记录</Text> : null}
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
        backgroundColor:'#fff',
        alignSelf: 'center',
        minHeight:cfn.picHeight(80),
        justifyContent:'center',
        borderBottomColor:'#ddd',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    textStyle: {
        color:'#888',
        fontSize: 10,
        lineHeight:10
    },
    point: {
        width:cfn.picWidth(40),
        height:cfn.picWidth(40),
        backgroundColor:'#f90',
        borderRadius:cfn.picWidth(20),
        marginLeft:cfn.picWidth(10)
    }
});