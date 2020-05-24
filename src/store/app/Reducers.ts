import {SET_BREADCRUMBS, SET_IS_LOGGED} from './Actions';
import { Reducer, AnyAction } from 'redux';
import { Breadcrumb } from './AppStore';

export const breadcrumbsReducer: Reducer<Breadcrumb[], AnyAction> = (state = [], action) => {
    switch (action.type) {
        case SET_BREADCRUMBS:
            return action.payload;
        default:
            return state;
    }
}

export const isLoggedReducer: Reducer<boolean, AnyAction> = (state = false, action) => {
    switch (action.type){
        case SET_IS_LOGGED:
            return action.payload;
        default:
            return state;
    }
}