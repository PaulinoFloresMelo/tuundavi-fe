import { inject, Injectable, linkedSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

@Injectable({providedIn: 'root'})
export class PaginationService {
    private activatedRoute = inject(ActivatedRoute);

    currentPage = toSignal(
        this.activatedRoute.queryParamMap.pipe(
            map( params => (params.get('page') ? +params.get('page')! : 1 )),
            map((page) => (isNaN(page) ? 1 : page))
        ),
        {
        initialValue: 1,
        }
    )

    private _currentCategory = toSignal(
        this.activatedRoute.queryParamMap.pipe(
            map( params => (params.get('category') ? params.get('category')! : '' )),
            map((category) => (category))
        ),
        {
        initialValue: '',
        }
    )

    public currentCategory = linkedSignal(this._currentCategory);


    private _letter = toSignal(
        this.activatedRoute.queryParamMap.pipe(
            map( params => (params.get('letter') ? params.get('letter')! : '' )),
            map((letter) => (letter))
        ),
        {
        initialValue: '',
        }
    )

    public letter = linkedSignal(this._letter);

}