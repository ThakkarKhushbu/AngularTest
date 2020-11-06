import { Component, OnInit ,ChangeDetectionStrategy, Inject, ViewChild, ChangeDetectorRef} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { TableVirtualScrollStrategy } from './table-vs-strategy.service';
import { CdkVirtualScrollViewport, VIRTUAL_SCROLL_STRATEGY } from "@angular/cdk/scrolling";
import { map,takeUntil,tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as transactionActions from '../app-store/actions';
import * as fromRoot from '../app-store';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: VIRTUAL_SCROLL_STRATEGY,
    useClass: TableVirtualScrollStrategy,
  }]
})
export class TransactionListComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  displayedColumns = ['row_id', 'time','type','sender','volume'];
  gridHeight = 400;
  static BUFFER_SIZE = 3;
  rowHeight = 48;
  headerHeight = 56;
  limit = 10;
  batch = 20;
  theEnd = false;

  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;

  dataSource: MatTableDataSource<Element>;
  constructor(@Inject(VIRTUAL_SCROLL_STRATEGY) private readonly scrollStrategy: TableVirtualScrollStrategy
  ,private changeDetectorRefs: ChangeDetectorRef,private readonly store: Store) {
    this.store.select(fromRoot.getTransactionList).pipe
    (takeUntil(this.destroy$)).subscribe(
      response =>{
        debugger
        this.rows=response
      }
    )
  }

  ngOnInit(): void {
    this.getTransaction();
  }
  destroy$: Subject<boolean> = new Subject<boolean>();
  rows :any=[];
   // Get Transaction detail from api
   getTransaction(): any {
     debugger
    // this.scrollStrategy.getTransactionData().subscribe(
    //     response => {
    //            this.rows = response;
    //             const range = Math.ceil(this.gridHeight / this.rowHeight) + TransactionListComponent.BUFFER_SIZE;
    //             this.scrollStrategy.setScrollHeight(this.rowHeight, this.headerHeight);
    //             this.dataSource = new MatTableDataSource < Element > (response)
    //             } );
    this.store.dispatch(transactionActions.FeatchTransactionData());

   }
    nextTransaction(e, offset) {
      debugger
      if (this.theEnd) {
        return;
      }
      const end = this.viewport.getRenderedRange().end;
      const total = this.viewport.getDataLength();
      console.log(`${end}, '>=', ${total}`);
      if (end === total) {
        this.offset.next(offset);
      }
      if(offset)
      { 
             this.scrollStrategy.getNextTransactionData(offset).subscribe( response => {
                debugger
                this.changeDetectorRefs.detectChanges();
                let resp = response
                this.rows= this.rows.concat(response);
                this.dataSource=this.rows;
      });
      }
    }
    ngOnDestroy() {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }


