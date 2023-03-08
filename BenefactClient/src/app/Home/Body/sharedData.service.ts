import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class sharedService {
  mySubject = new Subject<any>();
  
  constructor() { }
} 