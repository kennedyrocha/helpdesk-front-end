import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private toast: ToastrService) {

    }

    ngOnInit(): void {

    }

    creds: Credenciais = {
        email: '',
        senha: ''
    }

    email = new FormControl(null, Validators.email);
    senha = new FormControl(null, Validators.minLength(3));

    logar() {
        this.toast.error('Usuário e/ou Senha Inváldio', 'Login');
        this.creds.senha = '';
    }

    validaCampos(): boolean {
        return this.email.valid && this.senha.valid;
    }
}
