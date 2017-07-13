/**
 * Created by timxiong on 2017/7/10.
 */
import React,{Component} from 'react'
import {Provider} from 'react-redux';
import configureStore from './app/store/ConfigureStore';
import Router from './routers';

const store = configureStore();

export default class app extends Component {
    render() {
        return(
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}