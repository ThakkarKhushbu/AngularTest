import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TableVirtualScrollStrategy } from '../../transaction-list/table-vs-strategy.service';
import * as transactionActions from '../actions/transactionlist.actions';
@Injectable()
export class transactionEffects {

    constructor(
        private actions$: Actions,
        private appService: TableVirtualScrollStrategy
      ) {}

      FetchTransaction$ = createEffect(() =>
      this.actions$.pipe(
        ofType(transactionActions.FeatchTransactionData),
        exhaustMap(action =>
          this.appService.getTransactionData().pipe(
            map(response => transactionActions.transactionSuccess(response))))));
       
    }