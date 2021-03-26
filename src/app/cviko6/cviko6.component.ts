import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cviko6',
  templateUrl: './cviko6.component.html',
  styleUrls: ['./cviko6.component.css']
})

export class Cviko6Component implements OnInit {

  file: any;

  tokens: number[] = [];

  result = 0;

  constructor() { }

  ngOnInit(): void {
  }

  readFile(e): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.tokens = this.convertTextToTokens(fileReader.result);
        console.log(this.tokens);
        // const arrayik = [ 5, 9, 3, 7 ];
        this.blackMagic(this.tokens).then(value => {
          this.result = value;
        });
      }
    };
    fileReader.readAsText(this.file);
  }

  convertTextToTokens(text: string): number[] {
    const tokensToCreate = [];
    let text2 = text.trim();
    for (let i = 0; i < text2.length; i++) {
      tokensToCreate.push(parseInt(text2.charAt(i), 10));
    }
    return tokensToCreate;
  }

  blackMagic(coins: number[]): Promise<number> {
    return new Promise(resolve => {
      // vopred vypocitane hondnoty, lebo idem bottom up
      const result = new Array(coins.length).fill(0).map(() => new Array(coins.length).fill(0));
      for (let interval = 0; interval < coins.length; interval++) {
        for (let i = 0, j = interval; j < coins.length; i++, j++) {
          let a = 0, b = 0, c = 0;
          let op1 = 0, op2 = 0;

          // beriem i, krupier i + 1 ..... apson 3 tokens
          if (i + 2 <= j) {
            a = result[i + 2][j];
          }

          // beriem i, krupier j  / beriem j, super i
          if (i + 1 <= j - 1) {
            b = result[i + 1][j - 1];
          }

          // beriem j, krupier j - 1
          if (i <= j - 2) {
            c = result[i][j - 2];
          }

          // krupier pre pripad ze zoberiem i
          if (i + 1 <= j) {
            op1 = coins[i + 1] > coins[j] ? a : b;
          }

          // krupier pre pripad, ze zoberiem j
          if (i <= j - 1) {
            op2 = coins[i] > coins[j - 1] ? b : c;
          }

          result[i][j] = Math.max(coins[i] + op1, coins[j] + op2);
          // console.log(result);
        }
      }
      resolve(result[0][coins.length - 1]);
    });

  }


}
