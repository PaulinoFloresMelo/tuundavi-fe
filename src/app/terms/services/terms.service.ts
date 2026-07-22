import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Term, TermsResponse } from '../interfaces/term.interface';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options{
    limit?: number;
    offset?: number;
    category?: string;
}

const emptyTerm: Term = {
    id: 'new',
    content: '',
    meaning: '',
    category: '',
    imageUrl: '',
    audioUrl: '',
    example: [],
    translationExample:'',
    user: {
        id: '',
        username: '',
        paternalName: '',
        maternalName: '',
    },
    variant:{
        id: 1,
        name: '',
        description: '',
        localityName: '',
    },
};

@Injectable({providedIn: 'root'})
export class TermsService {
    
    private http = inject(HttpClient);
    private termsCache = new Map<string,TermsResponse>();
    private termCache = new Map<string,Term>();

    getTermById(id: string): Observable<Term>{
        if (id === 'new') {
            return of(emptyTerm);
        }

        if (this.termCache.has(id)) {
            return of(this.termCache.get(id)!);
        }

        return this.http
            .get<Term>(`${baseUrl}/terms/${id}`)
            .pipe(tap((term) => this.termCache.set(id, term))
        );
    }

    updateTermCache(term: Term) {
        const termId = term.id;

        this.termCache.set(termId, term);

        this.termsCache.forEach((termResponse) => {
        termResponse.terms = termResponse.terms.map(
            (currentTerm) =>
            currentTerm.id === termId ? term : currentTerm
        );
        });

        console.log('Caché actualizado');
    }

    createTerm(
        termLike: Partial<Term>,
        imageFileList?: FileList
    ): Observable<Term> {
        return this.http
        .post<Term>(`${baseUrl}/terms`, termLike)
        .pipe(tap((term) => this.updateTermCache(term)));
    }

    updateTerm(
        id: string,
        termLike: Partial<Term>,
        imageFileList?: FileList
    ): Observable<Term> {
        const currentImages = termLike.imageUrl ?? [];

        return this.uploadImages(imageFileList).pipe(
        map((imageNames) => ({
            ...termLike,
            images: [...currentImages, ...imageNames],
        })),
        switchMap((updatedTerm) =>
            this.http.patch<Term>(`${baseUrl}/terms/${id}`, updatedTerm)
        ),
        tap((term) => this.updateTermCache(term))
        );

        // return this.http
        //   .patch<Product>(`${baseUrl}/products/${id}`, productLike)
        //   .pipe(tap((product) => this.updateProductCache(product)));
    }

    // Tome un FileList y lo suba
    uploadImages(images?: FileList): Observable<string[]> {
        if (!images) return of([]);

        const uploadObservables = Array.from(images).map((imageFile) =>
        this.uploadImage(imageFile)
        );

        return forkJoin(uploadObservables).pipe(
        tap((imageNames) => console.log({ imageNames }))
        );
    }

    uploadImage(imageFile: File): Observable<string>{
        const formData = new FormData();
        formData.append('image', imageFile);

        return this.http.post<{fileName:string}>(`${baseUrl}/images/upload`, formData)
        .pipe(
            map( resp => resp.fileName)
        )
    }
}