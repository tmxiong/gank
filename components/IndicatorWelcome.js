/****
 * 指示器
 * ****/
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import commonFun from '../commonFun/commonFun'

export default class ReportPage extends PureComponent {
    componentWillMount() {
        this.initActivePointPosition();
    }

    constructor(props) {
        super();
        this.state = {

        };

        this.pointWidth = commonFun.picWidth(16);
        this.pointMargin = commonFun.picWidth(16);
    };

    static defaultProps = {
        pointCount: 6,
        activePointColor: '#fff',
        bottomPointsColor: 'rgba(255,255,255,0.6)',
    };

    initActivePointPosition() {
        this.rightX = commonFun.deviceWidth()/2 + (this.props.pointCount * 2 - 1)* this.pointWidth / 2 - this.pointWidth
        // this.rightX = this.props.pointCount * this.pointWidth + (this.props.pointCount - 1) * this.pointMargin
    }
    renderActivePoint() {
        return (<View
            style={[
                styles.pointStyle,
                styles.activePoint,
                {right: this.rightX,backgroundColor: this.props.activePointColor}
                ]}
            ref={(ref)=> {
                this.indecator = ref
            }}
        />);
    }

    renderBottomPoints() {
        let points = [];
        for (let i = 0; i < this.props.pointCount; i++) {
            points.push(<View key={i} style={[styles.pointStyle, {backgroundColor: this.props.bottomPointsColor}]}/>)
        }
        return points;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderBottomPoints()}
                {this.renderActivePoint()}
            </View>
        );
    }
}


module.exports = ReportPage;
const styles = StyleSheet.create({
    container: {
        width: commonFun.deviceWidth(),
        height: commonFun.picHeight(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'transparent',
        bottom: commonFun.picHeight(50),
        //right: commonFun.picWidth(10),
        //paddingRight: commonFun.picWidth(16),
    },
    pointStyle: {
        width: commonFun.picWidth(16),
        height: commonFun.picWidth(16),
        borderRadius: commonFun.picWidth(8),
        margin: commonFun.picWidth(8),
    },
    activePoint: {
        position: 'absolute',
        margin:0,
    }
});