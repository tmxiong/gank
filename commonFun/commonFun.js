const picHeight = 1334;
const picWidth = 750;

const {width} = require('Dimensions').get('window');
const {height} = require('Dimensions').get('window');


module.exports = {

    /**
     * 获取切图的宽高
     * */
    picHeight(pixel) {
        return pixel / picHeight * height;
    },
    picWidth(pixel) {
        return pixel / picWidth * width;
    },


    /**
     * 获取手机设备的宽高
     * */
    deviceHeight() {
        return height;
    },
    deviceWidth() {
        return width;
    },
};