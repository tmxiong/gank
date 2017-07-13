/**
 * Created by timxiong on 2017/7/10.
 */
import * as types from '../constants/ActionTypes';

export function setMineIcon(url) {
    return dispatch => {
        dispatch(setIcon(url))
    }
}

function setIcon(url) {
    return{
        type: types.SET_MINE_ICON,
        icon: url,
    }
}