import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppInterceptor } from './app-http-interceptor';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    AppService,
    HttpClient

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
