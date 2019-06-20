import {  BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import {  AppRoutingModule } from './app-routing.module';
import {  AppComponent } from './app.component';
import {  BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {  TeamnameService } from './Service/teamname.service';
import {  HttpClientModule} from '@angular/common/http';
import {  MaterialModule} from './material/material.module';
import {  MatPaginatorModule} from '@angular/material/paginator';
import {  MatDialogModule} from '@angular/material/dialog';
import {  FormsModule,ReactiveFormsModule } from '@angular/forms';
// import {  ExpectedDataOutputComponent } from './expected-data-output/expected-data-output.component';
import {  ImportedDataComponent } from './dialogs/imported-data/imported-data.component';
import {  OutputDataTableComponent } from './output-data-table/output-data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    // ExpectedDataOutputComponent,
    ImportedDataComponent,
    OutputDataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule  ,
    MaterialModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[ImportedDataComponent],
  providers: [TeamnameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
