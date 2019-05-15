import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTreeModule, MatButtonModule, MatIconModule, MatCardModule, MatTabsModule, MatMenuModule, MatToolbarModule,
  MatSortModule, MatProgressSpinnerModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule,
  MatCheckboxModule, MatProgressBarModule, MatSlideToggleModule, MatAutocompleteModule, MatChipsModule, MatButtonToggleModule,
  MatDialogModule, MatGridListModule, MatTooltipModule, MatRadioModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Homepage1Component } from './homepage1/homepage1.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    Homepage1Component
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
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
