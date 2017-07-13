/**
 * Created by timxiong on 2017/7/4.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';
import cfn from '../../commonFun/commonFun'
import NavBar from '../navBar'
import Modal from './modal'
import Global from '../../commonFun/global';
import {setCollection} from '../../app/actions/detailPage';
import {connect} from 'react-redux'

import more from '../../images/home/more_2.png'

class detailPage extends Component {

    constructor(props) {
        super(props);

        this.state={
            visible: false,
            //isCollected: this.getIsCollected(props),
        }
    }

    componentDidMount() {
        this.getIsCollected();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    setModalVisible(visible) {
        this.setState({visible: visible})
    }

    getIsCollected() {

        let rowData = this.props.navigation.state.params.data;
        Global.storage.getAllDataForKey('collection').then((data) => {
            if(data.length == 0) return;
            for (let i in data) {
                if(data[i]._id == rowData._id){
                    this.props.dispatch(setCollection(true));
                    break;
                }
            }
        });

        //return isCollected;
    }

    addCollection() {
        const {data} = this.props.navigation.state.params;
        Global.storage.save({
            key: 'collection',  // 注意:请不要在key中使用_下划线符号!
            id: data._id, //获取所有数据时，id 必须写
            data: data,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
        this.props.dispatch(setCollection(true))
    }

    deleteCollection() {
        const {data} = this.props.navigation.state.params;
        Global.storage.remove({
            key: 'collection',
            id: data._id
        });

        Global.storage.getAllDataForKey('collection').then((data) => {
            console.log(data);
        });

        this.props.dispatch(setCollection(false));
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.state.visible}
                    closeModal={()=>this.setModalVisible(false)}
                    addCollection={this.addCollection.bind(this)}
                    deleteCollection={this.deleteCollection.bind(this)}
                    //isCollected={this.state.isCollected}
                />
                <NavBar
                    leftText="返回"
                    leftFn={()=>this.goBack()}
                    middleText="文章详情"
                    rightIcon={more}
                    rightFn={()=>this.setModalVisible(true)}
                />
                <WebView
                    style={{width:cfn.deviceWidth(),height:cfn.deviceHeight()}}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: this.props.navigation.state.params.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    //onNavigationStateChange={this.onNavigationStateChange}
                    //onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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

export default connect()(detailPage);