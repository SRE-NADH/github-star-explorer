import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "./Slices/reposSlice";
import createSagaMiddleWare from 'redux-saga';
import watchFetchRepos from "./resduxSaga/repoSaga";

const sagaMiddleware = createSagaMiddleWare();


export default configureStore({
    reducer:{
        repos:reposReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(watchFetchRepos);