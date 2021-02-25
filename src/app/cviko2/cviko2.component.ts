import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cviko2',
  templateUrl: './cviko2.component.html',
  styleUrls: ['./cviko2.component.css']
})
export class Cviko2Component implements OnInit {

  file: any;

  km: number[];

  penalization: number;

  constructor() { }

  ngOnInit(): void {
  }

  readFile(e): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.km = this.convertToKM(fileReader.result);
        this.penalization = this.dynamicProg(this.km);
      }
    };
    fileReader.readAsText(this.file);
  }

  convertToKM(text: string): number[] {
    const matrixString = text.split('\n').filter(el => el.length > 0 && !Number.isNaN(el)).map(el => parseInt(el, 10));
    return matrixString;
  }

  dynamicProg(towns: number[]): number {
    const ideal = 50;
    const pen = [];
    const skuska = [];

    towns.forEach( (town, index) => { // v 604
      pen.push(Math.pow(ideal - town, 2)); // 400 - 602 = power -> 40 804
      for (let pIndex = 0; pIndex < index; pIndex++) {
        const dif = towns[index] - towns[pIndex];
        const poss = pen[pIndex] + Math.pow(ideal - dif, 2);
        if (poss < pen[index]) {
          pen[index] = poss;
          skuska.push(pIndex);
        }
      }
    });

    return pen.pop();
  }

}
