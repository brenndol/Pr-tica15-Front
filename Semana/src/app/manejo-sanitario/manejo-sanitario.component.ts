import { Component, OnInit } from '@angular/core';
import { SuinoService } from '../services/suino.service';
import { ToastrService } from 'ngx-toastr';
import { SuinoViewModel } from '../models/Suino/SuinoViewModel';
import { SessaoViewModel } from '../models/Suino/SessaoViewModel';

@Component({
  selector: 'app-manejo-sanitario',
  templateUrl: './manejo-sanitario.component.html',
  styleUrl: './manejo-sanitario.component.css'
})
export class ManejoSanitarioComponent implements OnInit {
  animaisDisponiveis: SuinoViewModel[] = [];
  historicoSessoes: SessaoViewModel [] = [];

  novaSessao: any = {
    data: null,
    descicao: '',
    animais: [],
    atividades: ''
  };
  sessaoService: any;

  

  constructor(private suinoService: SuinoService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.carregarAnimaisDisponiveis();
    this.cadastrarHistoricoSessoes();
    
  }

  carregarAnimaisDisponiveis(): void {
    this.suinoService.getAll().subscribe(
      (suinos: SuinoViewModel[]) => {
        this.animaisDisponiveis = suinos;
      },
      (error: any) => {
        console.error('Erro ao carregar animais disponíveis:', error);
      }
    );
  }

  cadastrarHistoricoSessoes(): void {
    this.sessaoService.getALL().subscribe(
      (sessoes: SessaoViewModel[]) => {
        this.historicoSessoes = sessoes;
      },
    (error: any) => {
      console.error('Erro ao carregar histórico de sessões:', error);
    }
   );
  }

  cadastrarNovaSessao(): void {
    this.suinoService.cadastrarSessao(this.novaSessao).subscribe(() => {
      this.toastr.success('Nova sessão cadastrada com sucesso!', 'Sucesso');
      //Limpar os campos após o cadastro
      this.novaSessao = {
        data: null,
        descricao: '',
        animais: [],
        atividades: ''
      };
    }, (error) => {
      this.toastr.error('Ocorreu um erro ao cadastrar a nova sessão.', 'Erro');
      console.error(error);
    });
  }

}
