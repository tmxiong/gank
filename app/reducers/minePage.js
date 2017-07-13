/**
 * Created by timxiong on 2017/7/10.
 */
'use strict';
import * as types from '../constants/ActionTypes';
const initialState={
  icon: '',
};

export default function setMineIcon(state=initialState, action) {
    switch (action.type) {
        case types.SET_MINE_ICON:
            return {icon: action.icon};
        default:
            return state;
    }
}