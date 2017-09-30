import {StackNavigator} from "react-navigation";
import MainPage from './views/mainPage';
import DetailPage from './views/home/detailPage'
import MyCollectionPage from './views/mine/children/myCollection';
import ReadHistoryPage from './views/mine/children/readHistory';
import AboutMePage from './views/mine/children/aboutMe';
import LaunchPage from './views/launchPage';
import WelcomePage from './views/welcomePage';
import CpWebView from './views/cpWebView/CPWebViewPage';

import onBackAndroid from './commonFun/onBackAndroid'
onBackAndroid.bindHardwareBackPress();

const routers = StackNavigator({
    Launch: {
        screen: LaunchPage
    },
    Welcome: {
        screen: WelcomePage
    },
    Main: {
        screen: MainPage,
    },
    Detail: {
        screen: DetailPage,
        navigationOptions:{
            header:null
        }
    },
    Collection: {
        screen: MyCollectionPage,
        navigationOptions:{
            header:null
        }
    },
    History: {
        screen: ReadHistoryPage,
        navigationOptions:{
            header:null
        }
    },
    About: {
        screen: AboutMePage,
        navigationOptions:{
            header:null
        }
    },
    CPWebView: {
        screen: CpWebView
    }


});
module.exports = routers;