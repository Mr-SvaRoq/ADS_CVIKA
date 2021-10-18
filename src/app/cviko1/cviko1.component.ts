import {Component, OnInit} from '@angular/core';



@Component({
  selector: 'app-cviko1',
  templateUrl: './cviko1.component.html',
  styleUrls: ['./cviko1.component.css']
})
export class Cviko1Component implements OnInit {

  constructor() {
  }

  whileFlag = true;
  sumFlag = true;

  myVar = false;
  something = 0;
  file: any;
  rowColumns: string[];
  matrix: number[][] = [];
  result: number[][] = [];
  rowsAverage: number[];
  sum: number;
  iteration  = 0;

  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  ngOnInit(): void {
    console.log('print hckterbest');
    if (this.sumFlag) {
      console.log('i hope i got a tshirt');
    }
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

  convertTextToMatrix(text: string): number[][] {
    const matrixToCreate = [];
    const matrixString = text.split('\n').filter(el => el.length > 0 && !Number.isNaN(el));
    this.rowColumns = matrixString.splice(0, 2);
    matrixString.forEach((row) => {
      const rowString = row.split(' ').filter(el => el.length > 0 && !Number.isNaN(el));
      matrixToCreate.push(rowString.map( el => parseInt(el, 10)));
    });
    return matrixToCreate;
  }

  greedAlgo(matrix: number[][]): any {
    this.rowsAverage = this.getRowsAverageValue(matrix);
    this.matrix = this.appendColumn(this.matrix, this.rowsAverage);
    // @ts-ignore
    this.matrix = this.matrix.sort(this.sortFunction);
    this.matrix = this.removeColumn(this.matrix);
    this.sum = 0; // proximity to this -19137	-23959	36557	-37521 (last values)

    /***************************- SUM************************  -1628
    // minimum
    this.matrix.forEach( (row, matrixRowIndex) => {
      let tmpResult = [];
      tmpResult = row.map(num => Math.abs(this.sum + num));
      const forDebug = row[tmpResult.indexOf(Math.min(...tmpResult))];
      this.sum += row[tmpResult.indexOf(Math.min(...tmpResult))];
      this.result.push([this.sum, tmpResult.indexOf(Math.min(...tmpResult))]);
    });
    // ***********************************************************/

    /***************************+Num************************  -1628

     //  // https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array
    const closest = (inp, goal = 0) => inp.reduce((prev, curr) => (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev));
    const tmpResult = this.matrix[0].map(num => Math.abs(this.sum + num));
    this.sum = this.matrix[0][tmpResult.indexOf(Math.max(...tmpResult))];
    this.result.push([this.sum, tmpResult.indexOf(Math.max(...tmpResult))]);

    for (let i = 1; i < this.matrix.length ; i++ ) {

      const debMatrix = this.matrix[i];
      const close = closest(this.matrix[i], -this.sum);
      this.sum += close;
      this.result.push([this.sum, this.matrix[i].indexOf(close)]);


      // const tmpResult2 = this.matrix[i].map(num => Math.abs(-this.sum - num));
      // const debugget = this.matrix[i][tmpResult2.indexOf(Math.min(...tmpResult2))];
      // this.sum += this.matrix[i][tmpResult2.indexOf(Math.min(...tmpResult2))];
    }
     // ***********************************************************/


    // ++ this.iteration;
    // /* 0/45548**BRUTE FORCE*****************************************************************/
    this.iteration = 0;
    while (true) {
      // /******************************* max:-5201, min:  -7732

      // /*************************************WHILE - SUM***************************************
      //  // https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array
      const closest = (inp, goal = 0) => inp.reduce((prev, curr) => (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev));
      const tmpResult = this.matrix[0].map(num => Math.abs(this.sum + num));
      this.sum = this.matrix[0][tmpResult.indexOf(Math.max(...tmpResult))];
      this.result = [];
      this.result.push([this.sum, tmpResult.indexOf(Math.max(...tmpResult))]);

      for (let i = 1; i < this.matrix.length ; i++ ) {

        // const debMatrix = this.matrix[i];
        const close = closest(this.matrix[i], -this.sum);
        this.sum += close;
        this.result.push([this.sum, this.matrix[i].indexOf(close)]);
      }
      // ******************************************************************************/


      /**********************************WHILE + NUM*******************************************
      this.result = [];
      this.sum = 0;
      this.matrix.forEach( (row, matrixRowIndex) => {
        // tslint:disable-next-line:no-shadowed-variable
        let tmpResult = [];
        tmpResult = row.map(num => Math.abs(this.sum + num));
        const forDebug = row[tmpResult.indexOf(Math.min(...tmpResult))];
        this.sum += row[tmpResult.indexOf(Math.min(...tmpResult))];
        this.result.push([this.sum, tmpResult.indexOf(Math.min(...tmpResult))]);
      });
      //*****************************************************************************/


      ++this.iteration;
      if (this.sum  === 0 || this.iteration > 100000) {
        break;
      } else {
        this.matrix = this.shuffle(this.matrix);
        if (this.sum  >= -50 || this.sum <= 50) {
        }
      }
     }
  // ******************************************************************************/

  }

  getRowsAverageValue(matrix: number[][]): number[] {
    let rowsAverage = 0;
    const average = [];

    matrix.forEach(row => {
      let avg = 0;
      row.forEach(elNumber => {
        avg += elNumber;
        // console.log(parseInt(elNumber));
      });

      // avg = avg / 4;
      average.push(avg);
    });

    average.forEach(avg => {
      rowsAverage += avg;
    });

    // rowsAverage /= 100;
    // return rowsAverage;
    return average;
  }

  appendColumn(matrix: number[][], column: number[]): number[][] {
    const newMatrix = [];
    matrix.forEach( (row, index) => {
      newMatrix.push(row.concat(column[index]));
    });
    return newMatrix;
  }

  removeColumn(matrix: number[][]): number[][] {
    matrix.forEach( (row, index) => {
      row.pop();
    });
    return matrix;
  }

  sortFunction(a: number, b: number): number {
    if (a[4] === b[4]) {
      return 0;
    } else {
      return (Math.abs(a[4]) > Math.abs(b[4])) ? -1 : 1;
    }
  }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array: number[][]): number[][] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
