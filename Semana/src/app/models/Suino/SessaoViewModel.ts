export class SessaoViewModel {
    data: Date;
    descricao: string;
    brinco: number[]; //animais sejam representados por seus IDs
    atividades: string;
    vacinaRaiva: boolean;
    vacinaRiniteAtrofica: boolean;
  
    constructor(data: Date, descricao: string, animais: number[], atividades: string, vacinaRaiva: boolean, vacinaRiniteAtrofica: boolean) {
      this.data = data;
      this.descricao = descricao;
      this.brinco = animais;
      this.atividades = atividades;
      this.vacinaRaiva = vacinaRaiva;
      this.vacinaRiniteAtrofica = vacinaRiniteAtrofica;
    }
  }
  