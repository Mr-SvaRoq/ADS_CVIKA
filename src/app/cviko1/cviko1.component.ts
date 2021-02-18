import {Component, OnInit} from '@angular/core';
import {element} from 'protractor';


@Component({
  selector: 'app-cviko1',
  templateUrl: './cviko1.component.html',
  styleUrls: ['./cviko1.component.css']
})
export class Cviko1Component implements OnInit {

  constructor() {
  }

  something = 0;
  file: any;

  rowColumns: string[];
  matrixString: string[];

  matrix: any[] = [];
  sum: number;


  ngOnInit(): void {
  }

  readFile(e): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.matrix = this.convertTextToMatrix(fileReader.result);
        this.greedAlgo(this.matrix);
      }
    };
    fileReader.readAsText(this.file);
  }

  greedAlgo(matrix: any[]): any {
    console.log(matrix.length);
    this.sum = 456;
  }

  convertTextToMatrix(text: string): any[] {
    const matrixToCreate = [];
    const matrixString = text.split('\n').filter( el => el.length > 0);
    this.rowColumns = matrixString.splice(0, 2);
    matrixString.forEach( (row) => {
      const rowString = row.split(' ').filter( el => el.length > 0);
      matrixToCreate.push(rowString);
    });
    return matrixToCreate;
  }


}
