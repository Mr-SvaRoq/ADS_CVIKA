import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cviko5',
  templateUrl: './cviko5.component.html',
  styleUrls: ['./cviko5.component.css']
})
export class Cviko5Component implements OnInit {

  file: any;

  matrix: number[][] = [];

  result: number;

  rowColumns: string[];

  constructor() { }

  ngOnInit(): void {
  }

  readFile(e): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.matrix = this.convertTextToMatrix(fileReader.result);
        console.log(this.matrix);
        this.dynamicProg(this.matrix).then(value => {
          this.result = value;
        });
      }
    };
    fileReader.readAsText(this.file);
  }

  convertTextToMatrix(text: string): number[][] {
    const matrixToCreate = [];
    const matrixString = text.split('\n').filter(el => el.length > 0 && !Number.isNaN(el));
    this.rowColumns = matrixString.splice(0, 1);
    matrixString.forEach((row) => {
      const rowString = row.split(' ').filter(el => el.length > 0 && !Number.isNaN(el));
      matrixToCreate.push(rowString.map( el => parseInt(el, 10)));
    });
    return matrixToCreate;
  }

  dynamicProg(matrix: number[][]): Promise<number> {
    return new Promise(resolve => {
    });
  }
}
