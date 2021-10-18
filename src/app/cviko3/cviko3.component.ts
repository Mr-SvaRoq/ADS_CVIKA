import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cviko3',
  templateUrl: './cviko3.component.html',
  styleUrls: ['./cviko3.component.css']
})
export class Cviko3Component implements OnInit {
  file: any;

  km: number[];

  rowColumns: string[];

  matrix: number[][] = [];

  penalization: number;

  constructor() { }

  ngOnInit(): void {
    this.penalization = 0;
    console.log('hacktoberfest-accepted, ups I had to fixed it, tp run it');
    if (this.penalization === 0) {
      console.log('ups');
    }
  }

  readFile(e): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.matrix = this.convertTextToMatrix(fileReader.result);
        this.dynamicProg(this.matrix).then(value => {
          this.penalization = value;
        });
      }
    };
    fileReader.readAsText(this.file);
  }

  convertTextToMatrix(text: string): number[][] {
    const matrixToCreate = [];
    const matrixString = text.split('\n').filter(el => el.length > 0 && !Number.isNaN(el));
    // this.rowColumns = matrixString.splice(0, 2);
    matrixString.forEach((row) => {
      const rowString = row.split(' ').filter(el => el.length > 0 && !Number.isNaN(el));
      matrixToCreate.push(rowString.map( el => parseInt(el, 10)));
    });
    return matrixToCreate;
  }

  // pre kazde mesto hlada idealne "cestu" s najmensou penalizaciou
  // a ak chcem zistit idealne penalizaciu dalsieho mesta, tak prejdem vsetky mesta uz s najdenymi idealnymi penalmi a zistim,
  //      s akym mestom je najmensia penalizacia
  // 2154
  dynamicProg(matrix: number[][]): Promise<number> {
    return new Promise(resolve => {
      const damage = [];

      matrix.forEach( (value, index) => {
        damage.push([...value]);

        if (index === 0) { return; }

        damage[index].forEach( (damageValue, damageIndex) => {
          const pom = [];
          pom.push(damageValue + damage[index - 1][damageIndex - 1]);
          pom.push(damageValue + damage[index - 1][damageIndex]);
          pom.push(damageValue + damage[index - 1][damageIndex + 1]);
          damage[index][damageIndex] = Math.min(...pom.filter(p => !isNaN(p)));

        });
      });
      resolve(Math.min(...damage.reverse()[0]));

    });

  }
}
