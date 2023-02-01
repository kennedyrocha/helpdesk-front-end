import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent {
    chamado: Chamado = {
        dataFechamento:'',
        prioridade:     '',
        status:         '',
        titulo:         '',
        observacoes:      '',
        tecnico:        ',',
        cliente:        '',
        nomeCliente:    '',
        nomeTecnico:    ''
    }
    constructor(
        private clienteService: ClienteService,
        private tecnicoService: TecnicoService,
        private chamadoService: ChamadoService,
        private toastService: ToastrService,
        private routerService: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.chamado.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.findById(this.chamado.id);
        this.findAllClientes();
        this.findAllTecnicos();
    }

    findById(id: any): void {
        this.chamadoService.findById(id).subscribe(resposta => {
            this.chamado = resposta;
        })
    }

    update(): void {
        this.chamadoService.create(this.chamado).subscribe(resposta => {
            this.toastService.success('Chamado editado com Sucesso!', 'Novo Chamado');
            this.routerService.navigate(['chamados']);
        },
        ex => {
            this.toastService.error(ex.error.error);
        });
    }


    clientes: Cliente[] = [];
    tecnicos: Tecnico[] = [];

    prioridade: FormControl = new FormControl(null, Validators.required);
    status: FormControl = new FormControl(null, Validators.required);
    titulo: FormControl = new FormControl(null, Validators.required);
    observacoes: FormControl = new FormControl(null, Validators.required);
    tecnico: FormControl = new FormControl(null, Validators.required);
    cliente: FormControl = new FormControl(null, Validators.required);

    findAllClientes(): void {
        this.clienteService.findAll().subscribe(resposta => {
            this.clientes = resposta;
        });
    }

    findAllTecnicos(): void {
        this.tecnicoService.findAll().subscribe(resposta => {
            this.tecnicos = resposta;
        });
    }

    validadeCampos(): boolean {
        return this.prioridade.valid
                && this.status.valid
                && this.titulo.valid
                && this.observacoes.valid
                && this.tecnico.valid
                && this.cliente.valid;
    }

    retornaStatus(status: any): string {
        switch (status) {
            case 0 : {
                return 'Aberto';
                break; 
            }
            case 1 : {
                return 'Andamento';
                break; 
            }
            case 2 : {
                return 'Encerrado';
                break; 
            }
            default:  {
                return '';
            }
        }
    }

    retornaPrioridade(prioridade: any): string {
        switch (prioridade) {
            case 0 : {
                return 'Baixa';
                break; 
            }
            case 1 : {
                return 'Média';
                break; 
            }
            case 2 : {
                return 'Alta';
                break; 
            }
            default:  {
                return '';
            }
        }
    }
}
