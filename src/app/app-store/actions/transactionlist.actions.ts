import { createAction, props } from '@ngrx/store';

export const FEATCH_TRANSACTION = '[Transaction Page] FeatchTransactionData';
export const FEATCH_TRANSACTION_SUCCESS = '[Transaction  Page] FeatchTransactionData Success';
export const FeatchTransactionData = createAction(
    FEATCH_TRANSACTION,
  );
  export const transactionSuccess = createAction(
    FEATCH_TRANSACTION_SUCCESS,
    props<any>()
  ) 