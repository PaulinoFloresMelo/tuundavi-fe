import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

@Pipe({
    name: 'termImage'
})

export class TermImagePipe implements PipeTransform {
    
    transform(value: string | string[]  ): string {
        
        if ( typeof value === 'string' ) {
            return `${baseUrl}/images/${value}`;
        }
        console.log({ value });

        // const image = value.at(0);
        const image = value;

        console.log({ image });
        
        if ( !image ) {
            return './assets/images/no-image.jpg'
        }

        return `${baseUrl}/images/${image}`;
    }
}