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
    getBgColor(title) {
        var bgColor = '#fff';

        switch (title) {
            case 'iOS':
                bgColor = '#666666';
                break;
            case 'Android':
                bgColor = '#98BE48';
                break;
            case '前端':
                bgColor = '#D55F42';
                break;
            case '休息视频':
                bgColor = '#0F83BE';
                break;
            case '瞎推荐':
                bgColor = '#DCB361';
                break;
            case '拓展资源':
                bgColor = '#e7c';
                break;
            default:
                break;

        }

        return bgColor;
    }
};