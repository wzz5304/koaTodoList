import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import reducer from '../reducers';
import api from '../reducers/api';

export const store = createStore(
    combineReducers({
        reducer,
        api
    })
);