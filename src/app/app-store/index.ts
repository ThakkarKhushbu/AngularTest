import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import { environment } from '../../environments/environment';
  import * as trnsactionreducer from './reducers/transaction.reducer';
  
  export interface State {
    transaction: trnsactionreducer.State;
  }
  
  export const reducers: ActionReducerMap<State> = {
    transaction: trnsactionreducer.reducer,
  };
  
  const reducerKeys = ['user', 'todo'];
  
  // console.log all actions
  export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
      console.log('state', state);
      console.log('action', action);
  
      return reducer(state, action);
    };
  }
  
  
  export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
  
  
  
  // Transaction reducers Begin
  
  export const TransactionState = createFeatureSelector<trnsactionreducer.State>('transaction');
  
  export const getTransactionList = createSelector(
    TransactionState,
    trnsactionreducer.TransacionList
  );
  