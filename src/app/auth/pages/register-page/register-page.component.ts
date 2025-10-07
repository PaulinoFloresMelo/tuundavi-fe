import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { RegisterService } from "../../services/register.service";

@Component({
    selector: 'register-page-component',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './register-page.component.html'
})

export class RegisterPageComponent {

    fb = inject(FormBuilder);

    hasError = signal(false);
    isPosting = signal(false);
    router = inject(Router)

    registerService = inject(RegisterService)

    registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', [Validators.required]],
        maternalName: ['', [Validators.required]],
        paternalName: ['', [Validators.required]],
    });

    onSubmit(){
        if ( this.registerForm.invalid ) {
            this.hasError.set(true);
            setTimeout(() => {
                this.hasError.set(false);
            }, 2000);
            return;
        }

        const { 
            email = '', 
            password = '', 
            firstName= '', 
            maternalName = '', 
            paternalName = '' } = this.registerForm.value;

        this.registerService
        .register(email!, password!, firstName!, maternalName!, paternalName!)
        .subscribe((isAuthenticated) => {
            
            if (isAuthenticated) {
                this.router.navigateByUrl('/')
                return;
            }

            this.hasError.set(true);
            setTimeout(() => {
                this.hasError.set(false);
            }, 2000);
        });     
    }
}