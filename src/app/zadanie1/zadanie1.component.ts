import { Component, OnInit } from '@angular/core';

interface Word {
  frequency: number;
  word: string;
}

@Component({
  selector: 'app-zadanie1',
  templateUrl: './zadanie1.component.html',
  styleUrls: ['./zadanie1.component.css']
})

export class Zadanie1Component implements OnInit {

  file: any;

  dictionary: Word[] = [];

  penalization: number;
  constructor() { }

  ngOnInit(): void {
  }

  readFile(e): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.dictionary = this.convertTextToDictionary(fileReader.result);
        console.log(this.dictionary);
        // this.dynamicProg(this.matrix).then(value => {
        //   this.penalization = value;
        // });
      }
    };
    fileReader.readAsText(this.file);
  }

  convertTextToDictionary(text: string): Word[]{
    const dictionary = [];
    const dictionaryRow = text.split('\n').filter(el => el.length > 0);
    dictionaryRow.forEach((row) => {
      const rowString = row.split(' ').filter(el => el.length > 0);
      const word: Word = {
        frequency: parseInt(rowString[0], 10),
        word: rowString[1]
      };
      dictionary.push(word);
    });
    return dictionary;
  }

  dynamicProg(matrix: number[][]): Promise<number> {
    return new Promise(resolve => {
      const maxCapacity = 2000;
      const knapsack = new Array(matrix.length + 1).fill(0).map(() => new Array(maxCapacity + 1).fill(0));

      for (let i = 1; i < matrix.length + 1; i++) {
        const item1 = matrix[i - 1][0];
        const weight1 = matrix[i - 1][1];

        const item2 = matrix[i - 1][2];
        const weight2 = matrix[i - 1][3];

        for (let ii = 1; ii < maxCapacity + 1; ii++) {
          if (weight1 > ii && weight2 > ii) {
            knapsack[i][ii] = knapsack[i - 1][ii];
          } else if (weight1 > ii && ii >= weight2) {
            knapsack[i][ii] = Math.max(item2 + knapsack[i - 1][ii - weight2], knapsack[i - 1][ii]);
          } else if (weight2 > ii && ii >= weight1) {
            knapsack[i][ii] = Math.max(item1 + knapsack[i - 1][ii - weight1], knapsack[i - 1][ii]);
          } else if ((weight2 < ii && weight1 < ii) || (ii === weight1 || ii === weight2) ) {
            const val1 = Math.max(item1 + knapsack[i - 1][ii - weight1], knapsack[i - 1][ii]);
            const val2 = Math.max(item2 + knapsack[i - 1][ii - weight2], knapsack[i - 1][ii]);
            knapsack[i][ii] = Math.max(val1, val2);
          }
        }
      }
      resolve(knapsack[matrix.length][maxCapacity]);
    });

  }

}
