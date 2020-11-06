import { Action, createReducer, on } from '@ngrx/store';
import * as transactionActions from '../actions/transactionlist.actions';
import * as storage from '../state/storage';
import { Transaction } from '../entity/Transaction';
export interface State {
  transaction: Array<Transaction>;
  result: any;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
}

export const initialState: State = {
  transaction:[],
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const transactionReducer = createReducer(
  initialState,
  on(transactionActions.FeatchTransactionData, (state) => ({...state, isLoading: true})),
  on(transactionActions.transactionSuccess, (state, result) => ({transaction: result, result, isLoading: false, isLoadingSuccess: true})),
);

export function reducer(state: State | undefined, action: Action): any {
    debugger
  return transactionReducer(state, action);
}


export const TransacionList = (state: State) => {
    debugger
  return {
    transaction: state.transaction,
    result: state.result,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  }
};

