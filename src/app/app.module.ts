import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_helpers/auth.interceptor'

import { ServerErrorInterceptor } from './_helpers/error.interceptor';
import { GlobalErrorHandler } from './_services/global-error-handler.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { FormsModule } from '@angular/forms';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieAddComponent as MovieAddComponent } from './components/movie-add/movie-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HearthButtonModule } from './favourite-button/hearth/hearth.module';
import { MovieEditComponent as MovieEditComponent } from './components/movie-edit/movie-edit.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';
import { ActorEditComponent } from './components/actor-edit/actor-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    MovieAddComponent,
    MovieEditComponent,
    ActorDetailsComponent,
    ActorEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HearthButtonModule,
    SlickCarouselModule
  ],


  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: ServerErrorInterceptor,
      multi: true 
    },
    { provide: ErrorHandler, 
      useClass: GlobalErrorHandler
    },
    {
      provide: AppComponent
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


