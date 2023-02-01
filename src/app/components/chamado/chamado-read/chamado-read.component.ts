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
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent {
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
        private chamadoService: ChamadoService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.chamado.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.findById(this.chamado.id);
    }

    findById(id: any): void {
        this.chamadoService.findById(id).subscribe(resposta => {
            this.chamado = resposta;
        })
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
