import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class LoadersService {
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    display(value: boolean) {
        this.status.next(value);
    }
}
