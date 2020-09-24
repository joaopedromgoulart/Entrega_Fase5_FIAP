import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  // ----- Variaveis para o controle de seleção
  texto = "SORTEAR !";
  container: HTMLElement;

  public form = [
    { val: 'Pizza de Calabreza', isChecked: false, preco: "30,50" },
    { val: 'Pizza de Milho com Bacon', isChecked: false, preco: "20,50" },
    { val: 'Pizza 4 Queijos', isChecked: false, preco: "25,50"  },
    { val: 'Espaguete ao alho e óleo', isChecked: false, preco: "15,50"  },
    { val: 'Espaguete à bolonhesa', isChecked: false, preco: "20,50"  },
    { val: 'Espaguete Carbonara', isChecked: false, preco: "35,50"  },
    { val: 'Lazanha à bolonhesa', isChecked: false, preco: "30,50"  },
  ];

  constructor() {}
  public myVar;
  public checkeds = 0;
  public limit = 5;
  public podecheck = true;
  public full_price = 0;
  public txtreponse = "Preço médio: R$0,00"; 
  public precomedio = "0";
  public media = 0;
  public randonsort = 0;
  public TIME_IN_MS = 100;
  public rodando = false;

  public selecionados =[];

  // ----- Variaveis para o controle de seleção

  progress:any = 0;
  overallProgress:any = 0;
  percent: number = 0;
  radius: number = 100;
  minutes: number = 1;
  seconds: any = 100;
  timer: any = false;

  overallTimer: any = false;
  countDownTimer: any = false;
  
  // ----- Função para seleção de opções
  check(entry) {
    if (!entry.isChecked){
      this.checkeds++;
      this.full_price = this.full_price + Number(entry.preco.replace(",", "."));
      this.selecionados.push(entry.val)
    } else {
      this.checkeds--;
      this.full_price = this.full_price - Number(entry.preco.replace(",", "."));
      this.selecionados.splice(this.selecionados.indexOf(entry.val),1);
    }
  this.precomedio = Math.round(this.full_price/this.checkeds).toFixed(2);
  if (isNaN(Number(this.precomedio))){
    this.txtreponse = "Preço médio: R$0,00"; 
  }else{
  this.txtreponse = "Preço médio: R$" + this.precomedio.replace(".", ",");
  }
  console.log(this.selecionados);
  }

  // ----- Função fazer o sorteio dentro das funções selecionadas

  ngAfterViewInit() {         
    this.container = document.getElementById("last-row");           
    this.container.scrollTop = this.container.scrollHeight;     
  }  

  clicksorteio() {
    if (this.checkeds < 2){
      this.texto = "Selecione mais itens para o sorteio";
    }else{
      
      this.ngAfterViewInit()

      this.rodando = true;
      this.timer = false;
      this.percent = 0;
      this.progress = 0;

      let totalSeconds = 10;

      this.timer = setInterval(() =>{
        if(this.percent > this.radius){
          console.log("PAAAAAAAAAAAAASSSSSSSSSSSSSSSOOOOOOOOOU");
          clearInterval(this.timer);
        }
        this.percent =  Math.floor((this.progress / totalSeconds) * 100);
        this.progress = this.progress + 1;
        this.TIME_IN_MS++;
        this.randonsort = Math.floor(Math.random() * this.selecionados.length);
        console.log(this.randonsort);
        this.texto = this.selecionados[this.randonsort];
        console.log(this.texto) ;
      }, this.TIME_IN_MS)
    }
  }
}
