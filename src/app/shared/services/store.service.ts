import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private state: BehaviorSubject<any> = new BehaviorSubject<any>({});
  state$: Observable<any> = this.state.asObservable();

  next (key: string, value: any) {
    const currentState = this.state.getValue();
    const updatedState = {
        ...currentState,
        [key]: value
    };
    this.state.next(updatedState);
  }

  constructor() { }
}
