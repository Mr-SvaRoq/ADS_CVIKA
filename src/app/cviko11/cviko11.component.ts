import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cviko11',
  templateUrl: './cviko11.component.html',
  styleUrls: ['./cviko11.component.css']
})
export class Cviko11Component implements OnInit {

  numberNodes = 0;

  original = 0;
  vojsic = 0;
  constructor() {
  }

  ngOnInit(): void {
  }


  findMe(nodes: number): void {
    console.log(nodes);
    this.original = this.f_cn(nodes);
    this.vojsic = this.f_cn_vojsic(nodes);
  }

  f_cn_vojsic(nodes: number): number {
    let Cn = 0;
    if (nodes === 0) // empty tree
    {
      return 1;
    }
    for (let i = 1; i < nodes + 1; i++)
    {
      if (i - 1 < 3) {
        Cn += this.f_cn_vojsic(0) * this.f_cn(nodes - i);
      } else {
        Cn += this.f_cn_vojsic(i - 1) * this.f_cn(nodes - i);
      }
    }
    return Cn;
  }

  f_cn(nodes: number): number {
    let Cn = 0;
    if (nodes === 0) // empty tree
    {
      return 1;
    }
    for (let i = 1; i < nodes + 1; i++)
    {
      Cn += this.f_cn(i - 1) * this.f_cn(nodes - i);
    }
    return Cn;
  }

}
