import { Component, OnInit } from '@angular/core';
import {element} from 'protractor';

@Component({
  selector: 'app-zadanie3',
  templateUrl: './zadanie3.component.html',
  styleUrls: ['./zadanie3.component.css']
})
export class Zadanie3Component implements OnInit {

  file: any;

  clauses: number[][] = [];

  nbvar: number;

  nbclauses: number;

  visited: boolean[];

  cnfForm: any[] = [];
  graph: any[] = [];
  reverseGraph: any[] = [];
  order: any[] = [];
  components: any[] = [];

  sat = true;

  result = '';

  tfArray = [];

  constructor() { }

  ngOnInit(): void {
  }

  readFile(e): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.clauses = this.convertTextToMatrix(fileReader.result);
        this.foo(this.clauses);
      }
    };
    fileReader.readAsText(this.file);
  }

  convertTextToMatrix(text: string): number[][] {
    const matrixToCreate = [];
    const matrixString = text.split('\n').filter(el => el.length > 0 && !Number.isNaN(el));
    const foo = matrixString.splice(0, 1)[0].split(' ').filter(el => el.length > 0 && !Number.isNaN(el));
    this.nbvar = parseInt(foo[0], 10);
    this.nbclauses = parseInt(foo[1], 10);
    matrixString.forEach((row) => {
      const rowString = row.split(' ').filter(el => el.length > 0 && !Number.isNaN(el));
      matrixToCreate.push(rowString.map( el => parseInt(el, 10)));
    });
    return matrixToCreate;
  }

  foo(clauses: number[][]): any {

    // create object
    this.graph = this.createObject(this.nbvar, () => []);
    this.reverseGraph = this.createObject(this.nbvar, () => []);
    this.visited = this.createObject(this.nbvar, () => false);
    clauses.forEach(c => {
      const tmp = [];

      c.forEach(t => {
        if (t !== 0) {
          tmp.push(t);
        }
      });

      if (tmp.length === 1) {
        tmp.push(tmp[0]);
      }

      this.cnfForm.push(tmp);
    });

    // const size = this.nbclauses * 2;

    // stavanie tych grafovm, konjuktivna normalova forma - sa da prepisat na implikaciu ... disjunkcia na implikicaciu
    this.cnfForm.forEach((el) => {
      // AvB = !A -> B v !B -> A
      const [a, b] = el;
      this.graph[-a].push(b);
      this.graph[-b].push(a);
      this.reverseGraph[a].push(-b);
      this.reverseGraph[b].push(-a);
    });

    for (let i = 0; i < this.nbvar; i++) {
      // hladanie z predu a odzadu
      this.dfs1(i + 1);
      this.dfs1(- (i + 1)); // !C !B !A 0 A B C
    }

    this.visited = this.createObject(this.nbvar, () => false);

    // stack -> vytvorenie componentov
    this.components = this.order.reverse().map( vertex => this.dfs2(vertex, {}));

    this.sat = true;

    // kontrola, ci -1 -> 1 a 1 -> -1 (T -> F, F -> T), v jednom komponente sa nemozu nachadzat A && !A ... T implikacia F = F (T -> F = F)
    this.components.forEach(component => {

      for (const [[vertex, _]] of Object.entries(component)) {
        const parsedVertexNeg = -(parseInt(vertex, 10)) + '';
        if (component[parsedVertexNeg]) {
          this.sat = false;
          break;
        }
      }
    });

    if (this.sat) {
      console.log('splnitelna');
      this.result = 'Splnitelna';
      const values = {};

      // componenst su zavisle od seba, preto ide od konca/reverse, priradzujem hodnotu, ci je true false
      this.components.reverse().forEach(component => {
        Object.entries(component).forEach(([vertex, _]) => {
          const parsedVertex = Math.abs(parseInt(vertex, 10));

          if (typeof values[parsedVertex] === 'undefined') {
            values[parsedVertex] = parsedVertex === parseInt(vertex, 10);
          }
        });
      });

      Object.entries(values).forEach(([vertex, value]) => {
        console.log(vertex, value);
        this.tfArray.push({vertex, value});
      });
      console.log(this.tfArray);
    } else {
      console.log('Nesplnitelna');
      this.result = 'Nesplnitelna';
    }
    return;
  }

  // zistujes postupnost vrcholov, ktore idu do stacku
  dfs1(vertex): any{
    if (this.visited[vertex]) { return; }

    this.visited[vertex] = true;
    // check all neighbours
    this.graph[vertex].forEach(u => {
      this.dfs1(u);
    });

    // pushuvanoe do stacku
    this.order.push(vertex);
  }

  // vytvaranie komponentov
  dfs2(v: number, com: {}): any {
    if (this.visited[v]) {
      return com;
    }

    this.visited[v] = true;

    // checkovanie, ci dane cislo NIE je uz v komponente
    if (!com[v]) {
      com[v] = true;
    }

    // checkucjem susedov
    this.reverseGraph[v].forEach(u => {
      this.dfs2(u, com);
    });

    return com;
  }

  createObject(count, createValue): any {
    const obj = {};

    this.range(-count, count).forEach( num  => {
      if (num === 0) { return; }
      obj[num] = createValue();
    });

    return obj;
  }

  range(min, max): any {
    return Array(max - min + 1)
      .fill(0)
      .map((_, i) => i + min);
  }
}
