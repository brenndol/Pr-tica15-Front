export class SessaoViewModel {
    data: Date;
    descricao: string;
    animais: number[]; // Suponha que os animais sejam representados por seus IDs
    atividades: string;
  
    constructor(data: Date, descricao: string, animais: number[], atividades: string) {
      this.data = data;
      this.descricao = descricao;
      this.animais = animais;
      this.atividades = atividades;
    }
  }
  