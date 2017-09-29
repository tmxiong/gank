/*****
 * 导航栏
 * *****/
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    InteractionManager,
    StatusBar,
    Platform
} from 'react-native';
import styles from'../styles/navBarStyle';
import cfn from '../commonFun/commonFun'
export default class navBar extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            leftView : null,
            rightView: null,
        };
    };

    static defaultProps = {
        bgColor: '#0F88EE',
        bgImg: null,
        leftText: null,
        leftIcon: require('../images/navbar_back.png'),
        middleText: null,
        middleView: null,
        rightText: null,
        rightIcon: null,
        textColor: '#fff',
        leftFn: ()=>{},
        rightFn: ()=>{},
        middleFn: ()=>{},
        modalState: false,
        isFloat: false,
        navBarHeight: Platform.OS == 'ios' ? cfn.picHeight(200) : cfn.picHeight(200),// 导航栏 的高度

    };

    initSetState() {
        this.mountable = true;
        let oldSetState = this.setState;
        this.setState = function(obj, callback) {
            if(this.mountable) {
                oldSetState.call(this,obj)
            }
        };
    }

    componentDidMount() {
        this.initSetState();
        this.renderLeft();
        this.renderRight();
    }

    componentWillUnmount() {
        this.mountable = false;
    }

    renderLeft() {
        let props = this.props;
        let leftView = null;
        if(props.leftIcon != null){
            leftView = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.content,{left:5,}]}
                    onPress={()=>props.leftFn()}>
                    <View style={[styles.content,{left:5}]}>
                        <Image style={[styles.ImageStyle,{alignSelf:'flex-start'}]} source={props.leftIcon}/>
                    </View>
                </TouchableOpacity>);
        }else if(props.leftText != null){
            leftView = (<TouchableOpacity
                activeOpacity={0.8}
                style={[styles.content,{left:5}]}
                onPress={()=>props.leftFn()}
            >
                <Text style={[styles.TextStyle,{color:props.textColor},{alignSelf:'flex-start'}]}>{props.leftText}</Text>
            </TouchableOpacity>);
        }

        this.setState({leftView: leftView})
    }
    renderRight() {
        let props = this.props;
        let rightView = null;
        if(props.rightIcon != null){
            rightView = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.content,{right:5,}]}
                    onPress={()=>props.rightFn()}>
                    <View style={[styles.content,{right:5}]}>
                        <Image style={[styles.ImageStyle,{alignSelf:'flex-end'}]} source={props.rightIcon}/>
                    </View>
                </TouchableOpacity>
            )
        }else if(props.rightText != null){
            rightView = (<TouchableOpacity
                activeOpacity={0.8}
                style={[styles.content,{right:5,}]}
                onPress={()=>props.rightFn()}>
                <Text style={[styles.TextStyle,{color:props.textColor},{alignSelf:'flex-end'}]}>{props.rightText}</Text>
            </TouchableOpacity>)
        }
        this.setState({rightView: rightView})
    }
    renderMiddle() {
        let props = this.props;
        let middle = null;
        if(props.middleText != null){
            middle = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>props.middleFn()}>
                    <Text style={[styles.TextStyle,{color:props.textColor}]}>
                        {props.middleText}
                    </Text>
                </TouchableOpacity>
            )
        } else if (props.middleView != null){
            middle = (
                <View style={{alignSelf:'center',
                    //top:commonFun.picWidth(10)
                }}>
                    {props.middleView}
                </View>
            )
        }
        return middle;
    }
    render() {
        let props = this.props;
        let statusBarHeight = Platform.OS == 'ios' ? cfn.picHeight(46) : StatusBar.currentHeight;
        const{navBarHeight}=this.props;
        if(this.props.modalState && Platform.OS == 'android') statusBarHeight = 0;
        return (
            <View
                style={[
                    {backgroundColor: props.bgColor,width:cfn.deviceWidth(),
                        height:cfn.picHeight(navBarHeight) + statusBarHeight,
                        justifyContent:'flex-end'
                    },
                ]}>
                <StatusBar hidden={false}  translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <View style={{height:cfn.picHeight(navBarHeight),width:cfn.deviceWidth(),
                    flexDirection: 'row',alignItems:'center',justifyContent:'center'}}>

                    {this.state.leftView}
                    {this.renderMiddle()}
                    {this.state.rightView}

                </View>

            </View>
        );
    }
}