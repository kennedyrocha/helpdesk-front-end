import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent {
    constructor(
        private service: ClienteService,
        private toast: ToastrService,
        private router : Router,
        private activatedRoute: ActivatedRoute){}
    
    ngOnInit(): void {
        this.cliente.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.findById();
    }

    cliente: Cliente = {
        id: '',
        nome: '',
        cpf: '',
        email: '',
        senha: '',
        perfis: [],
        dataCriacao: ''
    }

    findById(): void {
        this.service.findById(this.cliente.id).subscribe(resposta => {
            resposta.perfis = [];
            this.cliente = resposta;
        });
    }

    delete() {
        this.service.delete(this.cliente.id).subscribe(resposta => {
            this.toast.success('Cliente deletado com sucesso', 'Deletado');
            this.router.navigate(['clientes']);
        }, ex => {
            if (ex.error.errors) {
                ex.error.errors.forEach(element => {
                    this.toast.error(element.message);
                });
            }
            else {
                this.toast.error(ex.error.message);
            }
        });
    }
}