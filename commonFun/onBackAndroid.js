import {
    BackHandler,
    Platform,
    ToastAndroid,
}from 'react-native'
/**
 * 安卓返回键处理
 * */
function OnBackAndroid() {

}
OnBackAndroid.prototype = {
    //监听
    bindHardwareBackPress: function () {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onHomeBackPress.bind(this));
        }
    },

    //点击返回按键
    onHomeBackPress: function (obj) {

        // let name = obj.props.navigation.state.routeName;
        //
        // //如果不是主页，跳转至上一页
        // if (name != "home") {
        //     obj.props.navigation.goBack();
        //     return true;
        // }
        //如果是主页，再按一次退出
        this.handleHomeBackPress();
        return true;
    },

    handleHomeBackPress: function () {
        if (Platform.OS === "android") {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                this.exitApp();
                return;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    },

    exitApp: function () {

        BackHandler.removeEventListener('hardwareBackPress', this.onHomeBackPress.bind(this));

        BackHandler.exitApp();
    }
};

module.exports = new OnBackAndroid();
