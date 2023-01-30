import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    creds: Credenciais = {
        email: '',
        senha: ''
    }

    email = new FormControl(null, Validators.email);
    senha = new FormControl(null, Validators.minLength(3));

    validaCampos(): boolean {
        return this.email.valid && this.senha.valid;
    }
}
