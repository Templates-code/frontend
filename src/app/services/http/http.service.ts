import { HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const BYPASS_AUTH = new HttpContextToken<boolean>(()=> false);

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }
}
