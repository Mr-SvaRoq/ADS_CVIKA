import { Component, OnInit } from '@angular/core';

interface Lecture {
  id: number;
  value: number;
  weight: number;
  fragile: boolean;
}

@Component({
  selector: 'app-zadanie2',
  templateUrl: './zadanie2.component.html',
  styleUrls: ['./zadanie2.component.css']
})

export class Zadanie2Component implements OnInit {

  file: any;

  result: any;

  knapsack: any;

  lectures: Lecture[];

  sumLectures: number;

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
        this.lectures = this.convertTextToLectures(fileReader.result);

        // console.log(this.sumLectures);
        // console.log(this.maxWeight);
        // console.log(this.maxFragile);
      }
    };
    fileReader.readAsText(this.file);
  }

  convertTextToLectures(text: string): Lecture[] {
    const lectures = [];
    const lectureRows = text.split('\n').filter(el => el.length > 0);
    this.sumLectures = parseInt(lectureRows.shift(), 10);
    this.maxWeight = parseInt(lectureRows.shift(), 10);
    this.maxFragile = parseInt(lectureRows.shift(), 10);
    lectureRows.forEach((row, index) => {
      const rowString = row.split(' ').filter(el => el.length > 0);
      const lecture: Lecture = {
        id: parseInt(rowString[0].trim(), 10),
        value: parseInt(rowString[1].trim(), 10),
        weight: parseInt(rowString[2].trim(), 10),
        fragile: parseInt(rowString[3].trim(), 10) === 1
      };

      lectures.push(lecture);
    });
    return lectures;
  }

  dynamicProg( lectures: Lecture[]): Promise<Lecture[]> {
    return new Promise(resolve => {

      resolve([]);
    });
  }
}
