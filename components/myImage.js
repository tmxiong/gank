/**
 * Created by timxiong on 2017/9/29.
 */
import React, { PureComponent } from 'react';
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

import cfn from '../commonFun/commonFun'


export default class myImage extends PureComponent {


    static defaultProps={
        uri: '',
    };

    constructor(props){
        super(props);
        this.state={
            imgHeight: cfn.picHeight(800),
            imgWidth: cfn.deviceWidth() - cfn.picWidth(30),
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _onLoad(uri) {
        Image.getSize(uri, (width, height) => {
            //this.setState({width, height});
            //console.log('w:' + width + ' ,h:' + height)
            this.formatImageSize(width, height);
        });
    }

    formatImageSize(w,h) {
        let bili = w/h;
        let newImageHeight = this.state.imgWidth / bili;
        this.setState({imgHeight: newImageHeight});
    }

    render() {

        const {uri} = this.props;

        return (
            <View style={[styles.container,{width: this.state.imgWidth,
                minHeight: this.state.imgHeight,}]}>
                <Text style={{position:'absolute',color:'#ddd'}}>别着急，妹纸马上就来～</Text>
                <Image
                    source={{uri: uri}}
                    onLoad={(e)=>this._onLoad(uri)}
                    style={{
                        width: this.state.imgWidth - 15,
                        minHeight: this.state.imgHeight -15,
                        //flex: 1,
                        //resizeMode: 'contain',
                        borderRadius: 10,
                        alignSelf: 'center',
                        overflow:'hidden'
                    }}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        borderRadius: 10,
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'#ddd'
    }
});

