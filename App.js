import React, { useState } from 'react';
import firebase from 'firebase';
import {combineReducers,createStore,applyMiddleware} from 'redux';

import {firebaseConfig} from './Screens/config';
import TaskReducer  from './Store/Reducers/TaskReducer';
import ReduxThunk from "redux-thunk";
import { Provider } from 'react-redux';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}

const rootReducer = combineReducers({
  tasker: TaskReducer
});

const store =  createStore(rootReducer,applyMiddleware(ReduxThunk));

import NavigationContainer from "./Navigation/NavigationContainer";

export default function App() {
   return (
    <Provider store = {store}>
     <NavigationContainer/>
    </Provider>
  );
}


