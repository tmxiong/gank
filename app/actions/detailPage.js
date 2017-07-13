/**
 * Created by timxiong on 2017/7/10.
 */
import * as types from '../constants/ActionTypes';

export function setCollection(boolean) {
    if(boolean){
        return dispatch => {
            dispatch(setTrue(boolean))
        }
    }else {
        return dispatch => {
            dispatch(setFalse(boolean))
        }
    }

}
function setTrue(boolean) {
    return{
        type:types.SET_COLLECTION_TRUE,
        isCollected: boolean
    }
}
function setFalse(boolean) {
    return{
        type:types.SET_COLLECTION_FALSE,
        isCollected: boolean
    }
}