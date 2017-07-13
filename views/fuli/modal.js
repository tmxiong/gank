/**
 * Created by timxiong on 2017/7/4.
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Modal,
    TouchableOpacity,
    Platform
} from 'react-native';

import NavBar from '../navBar'
import cfn from '../../commonFun/commonFun'

export default class minePage extends PureComponent {

    static defaultProps={

    };

    constructor(props){
        super(props);

        this.state={
            sortNew: true
        }
    }

    closeModal(type) {
        if(type == 'new') {
            this.setState({sortNew:true})
        }else {
            this.setState({sortNew:false})
        }
        this.props.closeModal();
        this.props.setBaseUrl(type);
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {}}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>this.props.closeModal()}
                    style={styles.container}>
                    <View
                        style={{width:cfn.picWidth(180),
                            height:cfn.picHeight(180),
                            alignItems:"center",
                            justifyContent:'center',
                            borderRadius:5,
                            marginTop: Platform.OS == 'ios' ? cfn.picHeight(150) : cfn.picHeight(100),
                            marginRight: cfn.picWidth(20),
                            backgroundColor:'#fff',zIndex:3}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.itemContent}
                            onPress={()=>this.closeModal('new')}
                        >
                            <Text style={[styles.itemText,{color: this.state.sortNew ? '#0f88ee' : '#888'}]}>
                                最新
                            </Text>
                        </TouchableOpacity >
                        <View style={{width:cfn.picWidth(130),borderBottomColor: '#888',borderBottomWidth: 1}}/>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.itemContent}
                            onPress={()=>this.closeModal('random')}
                        >
                            <Text style={[styles.itemText,{color: this.state.sortNew ? '#888' : '#0f88ee'}]}>
                                随机
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    itemContent: {
        width:cfn.picWidth(160),
        height: cfn.picHeight(80),
        alignItems: 'center',
        justifyContent:'center'
    },
    itemText: {
        textAlign: 'center',
        alignSelf:'center',
        color:'#888'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
