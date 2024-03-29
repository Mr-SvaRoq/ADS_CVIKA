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
    this.penalization = 0;
    if (this.penalization  === 12) {
      console.log('skusa lalala');
    }
    
    console.log('I am tshirt')
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
    const kmInteger = text.split('\n').filter(el => el.length > 0 && !Number.isNaN(el)).map(el => parseInt(el, 10));
    return kmInteger;
  }

  // pre kazde mesto hlada idealne "cestu" s najmensou penalizaciou
  // a ak chcem zistit idealne penalizaciu dalsieho mesta, tak prejdem vsetky mesta uz s najdenymi idealnymi penalmi a zistim,
  //      s akym mestom je najmensia penalizacia
  dynamicProg(towns: number[]): number {
    const ideal = 400;
    const pen = [];


    towns.forEach( (town, index) => {
      pen.push(Math.pow(ideal - town, 2));
      for (let pIndex = 0; pIndex < index; pIndex++) {
        const dif = towns[index] - towns[pIndex];
        const penWithStops = pen[pIndex] + Math.pow(ideal - dif, 2);
        if (penWithStops < pen[index]) {
          pen[index] = penWithStops;
        }
      }
    });

    return pen.pop();
  }

}
