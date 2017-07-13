/**
 * Created by timxiong on 2017/7/4.
 */


//large':'原图','mw690':'中等尺寸','small':'小图','thumbnail':'缩略图'


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    Platform,
    ListView,
    RefreshControl,
    StatusBar,
    Modal,
    CameraRoll,
    ToastAndroid
} from 'react-native';

import {connect} from 'react-redux';

import ImageViewer from 'react-native-image-zoom-viewer';
import cfn from '../../commonFun/commonFun'
import NavBar from '../navBar';
import SortModal from './modal'

import find_icon from '../../images/find/find_icon.png'
import sort_icon from '../../images/find/sort_icon.png'

const IMAGE_VIEW = '?imageView2/2/w/' + cfn.deviceWidth() - cfn.picWidth(30);
const BASE_URL_NEW = 'http://gank.io/api/data/福利/20/';
const BASE_URL_RANDOM = 'http://gank.io/api/random/data/福利/';

import RNFetchBlob from 'react-native-fetch-blob'


import {setMineIcon} from '../../app/actions/minePage';


class fuliPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
        this.ds = ds;

        this.state = {
            ds,
            isRefreshing: false,
            sortVisible: false,
            imageVisible: false,
            imageUrl: '',

        };

        this.page = 1;

        this.canLoadMore = true;
        this.data = [];
        this.BASE_URL = BASE_URL_NEW;
        this.type = 'new';
    }

    componentDidMount() {
        this.findListener = DeviceEventEmitter.addListener('find', ()=> {
            this.props.navigation.navigate('FindDetail');
        });

        this.getData();
    }

    componentWillUnmount() {
        this.findListener.remove();
    }

    setBaseUrl(type) {
        this.data = [];
        this.page = 1;
        this._scrollTotop();
        if (type == 'new') {
            this.type = 'new';
            this.BASE_URL = BASE_URL_NEW;
        } else {
            this.type = 'random';
            this.BASE_URL = BASE_URL_RANDOM;
        }
        this.setData([]);
        this.getData();
    }

    getData() {
        if (this.state.isRefreshing) this.page = 1;

        if (this.type == 'random') {
            this.page = 20;
        }

        fetch(this.BASE_URL + this.page)
            .then((res)=> res.json())
            .then((data)=> {
                //console.log(data);
                this.setMineIcon(this.formateUrl(data.results[0].url,'small'));
                this.setData(data.results);
            })
            .catch((err)=> {
                alert(err);
            })
    }

    setMineIcon(url) {
        if (!this.icon) {
            this.icon = url;
            this.props.dispatch(setMineIcon(this.icon))
        }
    }

    setData(data) {
        if (this.state.isRefreshing) this.data = [];
        this.data = this.data.concat(data);
        this.setState({ds: this.state.ds.cloneWithRows(this.data)});

    }

    setImageModalVisible(visible, url) {
        this.setState({
            imageVisible: visible,
            imageUrl: url,
        })
    }

    setSortModalVisible(visible) {
        this.setState({sortVisible: visible});
    }

    formateUrl(url,type) {
        //type = 'large','mw690','small','thumbnail'
        //https://ws1.sinaimg.cn/large/610dc034ly1ffv3gxs37oj20u011i0vk.jpg
        let newUrl = url;
        let splitUrl = url.split('/');

        if(splitUrl[3] == 'large') {
            splitUrl[3] = type;
            newUrl = splitUrl.join('/');
        }

        return newUrl;
    }

    downloadImage(url) {
        Platform.OS == 'ios' ? this.downloadImageIOS(url) : this.downloadImageAndroid(url);
    }
    downloadImageAndroid(url) {
        let dirs = RNFetchBlob.fs.dirs;
        let picName = url.split('/')[4];

        let  imageLocation = dirs.DCIMDir + '/' + picName;
        ToastAndroid.show('正在保存...',ToastAndroid.LONG);
        RNFetchBlob
            .fetch('GET', url)
            .then((res)=> {
                let base64Str = res.base64();
                //或者
                //let base64Str = res.data;
                console.log('The file saved to ', res);
                console.log(dirs);
                //Save image
                RNFetchBlob.fs.writeFile(imageLocation, base64Str, 'base64');
                console.log("FILE CREATED!!");

                //刷新相册图片，否则图片不可见
                RNFetchBlob.fs.scanFile([{path: imageLocation}])
                    .then(() => {
                        //console.log("scan file success")
                        ToastAndroid.show('保存成功！',ToastAndroid.SHORT);
                    })
                    .catch((err) => {
                        //console.log("scan file error")
                        ToastAndroid.show('保存失败！请重试！',ToastAndroid.SHORT);
                    })
            });

    }

    downloadImageIOS(url) {

        var promise = CameraRoll.saveToCameraRoll(url,'photo');
        promise.then(function(result) {
            alert('保存成功！');
        }).catch(function(error) {
            alert('保存失败！\n' + error);
        });

    }


    renderRow(rowData) {
        let img_width = cfn.deviceWidth() - cfn.picWidth(30);
        let img_height = cfn.picHeight(800);
        let url = this.formateUrl(rowData.url,'mw690');
        //console.log(url);
        return (
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: cfn.picHeight(10),
                    marginBottom: cfn.picHeight(10),
                    overflow:'hidden'
                }}
                activeOpacity={0.8}
                onPress={()=>this.setImageModalVisible(true, rowData.url)}
            >
                <Image
                    source={{uri: url}}
                    style={{
                        width: img_width,
                        minHeight: img_height,
                        //flex: 1,
                        //resizeMode: 'contain',
                        borderRadius: 5,
                        alignSelf: 'center'
                    }}
                />
            </TouchableOpacity>
        )
    }

    _onRefresh() {
        this.setState({
            isRefreshing: true
        }, ()=> {
            this.getData();

            setTimeout(()=> {
                this.setState({
                    isRefreshing: false
                });
            }, 1500);

        });

    }

    _onEndReached() {

        if (!this.canLoadMore) return;

        this.canLoadMore = false;

        this.page++;
        this.getData();

        setTimeout(()=> {
            this.canLoadMore = true;
        }, 1500);
    }

    _scrollTotop() {
        this._listView.scrollTo({y: 0, animated: false})
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor='transparent' barStyle='light-content'/>
                <SortModal
                    visible={this.state.sortVisible}
                    closeModal={()=>this.setSortModalVisible(false)}
                    setBaseUrl={this.setBaseUrl.bind(this)}
                />
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.imageVisible}
                    onRequestClose={() => {
                    }}
                >
                    <ImageViewer
                        imageUrls={[{url: this.state.imageUrl}]}
                        onClick={()=> {
                            this.setImageModalVisible(false, '')
                        }}
                        loadingRender={()=><Text style={{color:'#fff'}}>别着急，妹纸马上就来...</Text>}
                        onSave={(url)=>{this.downloadImage(url)}}
                        style={{
                            width: cfn.deviceWidth(),
                            height: cfn.deviceHeight(),
                        }}
                    />
                </Modal>
                <NavBar
                    middleText="福利"
                    rightIcon={sort_icon}
                    rightFn={()=>this.setSortModalVisible(true)}
                    middleFn={()=>this._scrollTotop()}
                />

                {this.data.length == 0 ?
                    <View style={{position:'absolute',}}>
                        <Text style={{color:'#888'}}>一大波妹纸正在路上...</Text>
                    </View>
                    : null}

                <ListView
                    style={{width: cfn.deviceWidth(),}}
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
                    ref={(ref)=>this._listView = ref}
                />
            </View>
        );
    }
}

function goToDetail() {
    DeviceEventEmitter.emit('find');
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1
    },
    itemContainer: {
        width: cfn.deviceWidth() - cfn.picWidth(30),
        backgroundColor: '#fff',
        alignSelf: 'center',
        minHeight: cfn.picHeight(80),
        justifyContent: 'center',
        borderBottomColor: '#dedede',
        borderBottomWidth: 1,
        alignItems: 'flex-end',
        paddingTop: cfn.picHeight(15),
        paddingBottom: cfn.picHeight(15),
    },
    textStyle: {
        color: '#888',
        fontSize: 10,
        lineHeight: 10
    },
});

export default connect()(fuliPage) //需要用到this.props.dispatch或接收参数的地方，就需要connect()