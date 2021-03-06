import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTreeModule, MatButtonModule, MatIconModule, MatCardModule, MatTabsModule, MatMenuModule, MatToolbarModule,
  MatSortModule, MatProgressSpinnerModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule,
  MatCheckboxModule, MatProgressBarModule, MatSlideToggleModule, MatAutocompleteModule, MatChipsModule, MatButtonToggleModule,
  MatDialogModule, MatGridListModule, MatTooltipModule, MatRadioModule, MatTableModule, MatPaginatorModule, MatRippleModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { HomepageComponent } from './homepage/homepage.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AdminComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatGridListModule,
    MatTooltipModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
