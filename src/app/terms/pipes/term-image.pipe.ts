import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

@Pipe({
    name: 'termImage'
})

export class TermImagePipe implements PipeTransform {
    
    transform(value: string | string[]  ): string {
        
        if ( typeof value === 'string' ) {
            return `${value}`
        }

        const image = value.at(0);

        if ( !image ) {
            return './assets/images/no-image.jpg'
        }

        return `${image}`
    }
}