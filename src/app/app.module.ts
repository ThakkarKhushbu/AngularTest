import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTableModule } from '@angular/material/table';
import { CoreHttpService } from './services/core-http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// ngrx related imports
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './app-store';
import { EffectsModule } from '@ngrx/effects';
import { transactionEffects } from './app-store/effects/transaction.effects';
import { Store } from '@ngrx/store'

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollingModule,
    MatTableModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
      // ngrx related imports
      StoreModule.forRoot(reducers, {
        metaReducers
      }),
  ],
  providers: [CoreHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
