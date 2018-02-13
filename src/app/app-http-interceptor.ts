import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor() { }
    //get api end proints from angular environment file
    private apiUrl = environment.API_ENDPOINT;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Assume your authorization token is aleady saved in localstorage
        let token = localStorage.getItem('token') == undefined ? '' : localStorage.getItem('token');
        //check token is available or not in localstorage
        if (token) {
            //set token in request header without bearer token
            req = req.clone({ headers: req.headers.set('Authorization', token) });
            //set token in request header with bearer token
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
        }
        //set Content-Type if headers has no Content Type
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }
        //Set/Specify certain media types which are acceptable for the response
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        //Set API end points with request url
        req = req.clone({
            url: `${this.apiUrl}${req.url}`,
        });
        return next.handle(req).do(event => {
            //place for handling web app logger
            if (event instanceof HttpResponse) {
              // this.logger.logDebug(event);
            }
          })
            .catch(err => {
             //Handle Unauthorized Responses
              if(err.status==401){
                this.logout();
              }
              console.log('Caught error', err);
              return Observable.throw(err.error);
            });
        }
        logout(){
          //clear the local storage and navigate to login page
          localStorage.clear();
        }
      }