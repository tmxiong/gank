/**
 * Created by timxiong on 2017/7/10.
 */
'use strict';
import * as types from '../constants/ActionTypes';
const initialState={
    isCollected: false,
};

export default function setCollection(state=initialState, action) {
    switch (action.type) {
        case types.SET_COLLECTION_TRUE:
            return {isCollected: true};
        case types.SET_COLLECTION_FALSE:
            return {isCollected: false};
        default:
            return state;
    }
}