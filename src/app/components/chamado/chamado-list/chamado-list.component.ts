import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent {

    ELEMENT_DATA: Chamado[] = []
    FILTERED_ELEMENT_DATA: Chamado[] = []

    displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
    dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private service: ChamadoService) { }

    ngOnInit(): void {
        console.log('entrou aqui');
        this.findAll();
    }

    findAll(): void{
        this.service.findAll().subscribe(resposta => {
            this.ELEMENT_DATA = resposta;
            this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
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

    orderByStatus(status: any): void {
        let list: Chamado[] = [];

        this.ELEMENT_DATA.forEach(element => {
            if (element.status == status) {
                list.push(element);
            }
        });
        this.FILTERED_ELEMENT_DATA = list;
        this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
    }
}
