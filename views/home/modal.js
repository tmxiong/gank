/**
 * Created by timxiong on 2017/7/4.
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableOpacity,
    Platform
} from 'react-native';

import NavBar from '../navBar'
import cfn from '../../commonFun/commonFun'
import {connect} from 'react-redux'
//import {setCollection} from '../../app/actions/detailPage';

import collection_1 from '../../images/home/collection_icon_1.png';
import collection from '../../images/mine/collection_icon.png';
import share from '../../images/home/share_icon.png';

class modal extends PureComponent {

    static defaultProps={

    };

    constructor(props){
        super(props);

    }


    closeModal(type) {

        if(type == 'collection') {

            if(this.props.isCollected) {
                this.props.deleteCollection();
            } else {
                this.props.addCollection();
            }
        }
        this.props.closeModal();


    }

    render() {

        const {isCollected} = this.props;

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
                            onPress={()=>this.closeModal('collection')}
                        >
                            <Image source={isCollected ? collection_1 : collection}
                                   style={{width:cfn.picWidth(40),resizeMode:'contain', marginRight:cfn.picWidth(10)}}
                            />
                            <Text style={[styles.itemText,{color: isCollected ? '#0f88ee' : '#888'}]}>
                                收藏
                            </Text>
                        </TouchableOpacity >
                        <View style={{width:cfn.picWidth(130),borderBottomColor: '#888',borderBottomWidth: 1}}/>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.itemContent}
                            onPress={()=>this.closeModal('random')}
                        >
                            <Image source={share}
                                   style={{width:cfn.picWidth(40),resizeMode:'contain', marginRight:cfn.picWidth(10)}}
                            />
                            <Text style={[styles.itemText,{color:'#8a8a8a'}]}>
                                分享
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
        justifyContent:'center',
        flexDirection:'row'
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
function setCollection(store) {
    return {
        isCollected: store.detail.isCollected
    }
}
export default connect(setCollection)(modal);