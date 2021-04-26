import { Component, OnInit } from '@angular/core';

class Item {
  id: number;
  value: number;
  weight: number;
  fragile: number;
}

@Component({
  selector: 'app-zadanie2',
  templateUrl: './zadanie2.component.html',
  styleUrls: ['./zadanie2.component.css']
})

export class Zadanie2Component implements OnInit {

  file: any;

  result: number[];

  // knapsack: any;

  items: Item[];

  sumItems: number;

  maxWeight: number;

  maxFragile: number;

  constructor() { }

  ngOnInit(): void {
  }

  readFile(e): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.items = this.convertTextToItems(fileReader.result);
        this.items.unshift(new Item());
        this.dynamicProg(this.items).then( result => {
          this.result = result;
        });
      }
    };
    fileReader.readAsText(this.file);
  }

  convertTextToItems(text: string): Item[] {
    const items = [];
    const lectureRows = text.split('\n').filter(el => el.length > 0);
    this.sumItems = parseInt(lectureRows.shift(), 10);
    this.maxWeight = parseInt(lectureRows.shift(), 10);
    this.maxFragile = parseInt(lectureRows.shift(), 10);
    lectureRows.forEach((row, index) => {
      const rowString = row.split(' ').filter(el => el.length > 0);
      const item: Item = {
        id: parseInt(rowString[0].trim(), 10),
        value: parseInt(rowString[1].trim(), 10),
        weight: parseInt(rowString[2].trim(), 10),
        fragile: parseInt(rowString[3].trim(), 10)
      };

      items.push(item);
    });
    return items;
  }

  dynamicProg( items: Item[]): Promise<number[]> {
    return new Promise(resolve => {
      const knapsack = new Array(this.sumItems + 1).fill(0)
        .map(() => new Array(this.maxWeight + 1).fill(0)
          .map(() => new Array(this.maxFragile + 1).fill(0)));

      for (let i = 1; i < this.sumItems + 1; i++) {
        for (let w = 0; w < this.maxWeight + 1; w++) {
          for (let f = 0; f < this.maxFragile + 1; f++) {
            if (items[i].weight > w) {
              knapsack[i][w][f] = knapsack[i - 1][w][f];
            }  else if (items[i].fragile > f) {
              knapsack[i][w][f] = knapsack[i - 1][w][f];
            } else {
              const value1 =  knapsack[i - 1][w][f];
              const value2 =  knapsack[i - 1][w - items[i].weight][f - items[i].fragile] + items[i].value;
              knapsack[i][w][f] = Math.max(value1, value2);
            }
          }
        }
      }

      const result = [];
      // result.push(knapsack[this.sumItems][this.maxWeight][this.maxFragile]);
      let currentWeight = this.maxWeight;
      let currentFragile = this.maxFragile;
      for (let i = this.sumItems; i > 0; i --) {
        if (knapsack[i][currentWeight][currentFragile] > knapsack[i - 1][currentWeight][currentFragile]) {
          const item = items[i];

          result.push(item.id);
          currentFragile -= item.fragile;
          currentWeight -= item.weight;
        }
      }
      // @ts-ignore
      result.sort((a, b) => {
        return a - b;
      });
      result.splice(0, 0, knapsack[this.sumItems][this.maxWeight][this.maxFragile]); //  opt value
      result.splice(1, 0, result.length - 1); // cnt of items
      resolve(result);
    });
  }
}
