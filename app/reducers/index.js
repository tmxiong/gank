/**
 * Created by timxiong on 2017/7/10.
 */
'use strict';
import {combineReducers} from 'redux';

import mine from './minePage';
import detail from './detailPage';

const rootReducer = combineReducers({
    mine,
    detail
});

export default rootReducer;