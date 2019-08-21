import {  BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import {  AppRoutingModule } from './app-routing.module';
import {  AppComponent } from './app.component';
import {  BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {  TeamnameService } from './Service/teamname.service';
import {  HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {  MaterialModule} from './material/material.module';
import {  MatPaginatorModule} from '@angular/material/paginator';
import {  MatDialogModule} from '@angular/material/dialog';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  ImportedDataComponent } from './dialogs/imported-data/imported-data.component';
import {  OutputDataTableComponent } from './output-data-table/output-data-table.component';
import { LoginComponent } from './login/login.component';
import { RouterModule} from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import { RouterGuard } from './router.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RouterguardGuard } from './routerguard.guard';
import { ProgressbarComponent } from '../app/progressbar/progressbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IterationDetailComponent } from './iteration-detail/iteration-detail.component';
import {MatTabsModule} from '@angular/material/tabs';
import { OutputDatatableComponent } from './output-datatable/output-datatable.component';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ImportedDataComponent,
    OutputDataTableComponent,
    LoginComponent,
    ProgressbarComponent,
    IterationDetailComponent,
    OutputDatatableComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule  ,
    MaterialModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTabsModule,
    MatExpansionModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LoginComponent,
          canActivate : [RouterguardGuard]
        },
        {
          path: 'outputData',
         component: OutputDataTableComponent,
         canActivate : [RouterGuard]
        },
        {
        path: 'loginpage',
        component: LoginComponent,
        },
        {
        path: 'progressbar',
        component: ProgressbarComponent,
       },
       {
        path: 'itr',
        component: IterationDetailComponent,
       },
       {
        path: 'vinoth',
        component: OutputDatatableComponent,
       }

      ]
    )
  ],
  entryComponents: [ImportedDataComponent],
  providers: [TeamnameService,
    ,
    {
     provide : HTTP_INTERCEPTORS,
     useClass : AuthInterceptor,
     multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
