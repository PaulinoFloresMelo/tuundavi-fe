import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Observable, of } from "rxjs";
import { Alert } from "@/shared/components/alert/alert-error";
import { AlertService } from "@/shared/components/alert/alert.service";

@Component({
    selector: 'login-page-component',
    imports: [
        RouterLink, 
        ReactiveFormsModule,
        Alert
    ],
    templateUrl: './login-page.component.html'
})

export class LoginPageComponent {
    fb = inject(FormBuilder);

    hasError = signal(false);
    isPosting = signal(false);
    router = inject(Router)

    authService = inject(AuthService)
    alertService      = inject(AlertService);

    alertMessage      = signal('');

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    onSubmit(){
        if ( this.loginForm.invalid ) {
            this.hasError.set(true);
            setTimeout(() => {
                this.hasError.set(false);
            }, 2000);
            return;
        }

        const { email = '', password = '' } = this.loginForm.value;

        // this.authService
        // .login(email!,password!)
        // .subscribe((isAuthenticated) => {
            
        //     if (isAuthenticated) {
        //         this.router.navigateByUrl('/')
        //         return;
        //     }

        //     this.hasError.set(true);
        //     setTimeout(() => {
        //         this.hasError.set(false);
        //     }, 2000);
        // });     
        this.authService.mutate({email:email!,password:password!},{
            onSuccess: () => {
                this.router.navigate(['/']);
            },
            onError: (error) =>{
                this.alertMessage.update(() => error.message)
                this.alertService.showAlert(this.alertMessage(), 'error');
            }
        })
    }

    // Registro

    // Logout
}