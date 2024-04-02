import { Component, OnInit } from '@angular/core';
import { SuinoService } from '../services/suino.service';
import { ToastrService } from 'ngx-toastr';
import { SuinoViewModel } from '../models/Suino/SuinoViewModel';
import { SessaoViewModel } from '../models/Suino/SessaoViewModel';

import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-manejo-sanitario',
  templateUrl: './manejo-sanitario.component.html',
  styleUrls: ['./manejo-sanitario.component.css']
})
export class ManejoSanitarioComponent implements OnInit {
  animaisDisponiveis: SuinoViewModel[] = [];
  historicoSessoes: SessaoViewModel[] = [];

  novaSessao: any = {
    data: null,
    descricao: '',
    animais: [],
    atividades: ''
  };

  constructor(private suinoService: SuinoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregarAnimaisDisponiveis();
    this.carregarHistoricoSessoes();
  }

  carregarAnimaisDisponiveis(): void {
    this.suinoService.getAll().pipe(
      catchError(error => {
        console.error('Erro ao carregar animais disponíveis:', error);
        throw error; // Re-throw the error
      })
    ).subscribe(
      (suinos: SuinoViewModel[]) => {
        this.animaisDisponiveis = suinos;
      }
    );
  }

  carregarHistoricoSessoes(): void {
    this.suinoService.getALLSessoes().pipe(
      catchError(error => {
        console.error('Erro ao carregar histórico de sessões:', error);
        throw error; // Re-throw the error
      })
    ).subscribe(
      (sessoes: SessaoViewModel[]) => {
        this.historicoSessoes = sessoes;
      }
    );
  }

  cadastrarNovaSessao(): void {
    this.suinoService.cadastrarSessao(this.novaSessao).pipe(
      catchError(error => {
        this.toastr.error('Ocorreu um erro ao cadastrar a nova sessão.', 'Erro');
        console.error(error);
        throw error; // Re-throw the error
      })
    ).subscribe(() => {
      this.toastr.success('Nova sessão cadastrada com sucesso!', 'Sucesso');
      this.novaSessao = {
        data: null,
        descricao: '',
        animais: [],
        atividades: ''
      };
    });
  }
}
