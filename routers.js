import {StackNavigator} from "react-navigation";
import MainPage from './views/mainPage';
import DetailPage from './views/home/detailPage'
import MyCollectionPage from './views/mine/children/myCollection';
import ReadHistoryPage from './views/mine/children/readHistory';
import AboutMePage from './views/mine/children/aboutMe';

const routers = StackNavigator({
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
    }


});
module.exports = routers;