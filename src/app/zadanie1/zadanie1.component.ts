import { Component, OnInit } from '@angular/core';
import {root} from 'rxjs/internal-compatibility';

enum Key {
  NORMAL = 'NORMAL',
  DUMMY = 'DUMMY'
}

interface Word {
  id: number;
  frequency: number;
  label: string;
  pProbability: number;
  qProbability: number;
  type: Key;
}
//
// interface Node {
//   word: Word;
//   q: number;
// }


@Component({
  selector: 'app-zadanie1',
  templateUrl: './zadanie1.component.html',
  styleUrls: ['./zadanie1.component.css']
})

export class Zadanie1Component implements OnInit {

  file: any;

  dictionary: Word[] = [];

  keyWords: Word[] = [];

  treeValue: number;

  sumFrequency = 0;

  tree: Word[][] = null;

  // // //we dont use the 0th row and column, saving the keys right away so I can access more info
  // roots: Word[][]; //  @param roots of our optimal binary search tree :)) duh
  //
  // probabilitySums: number[][]; // w, not using the 0th row
  // expectedCost: number[][]; // e, -||-
  //
  // numberOfComparisons: number;
  private comparision = 0;

  constructor() { }

  ngOnInit(): void {
  }

  readFile(e): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.dictionary = this.convertTextToDictionary(fileReader.result);
        this.dictionary.sort( (a, b) => a.label.localeCompare(b.label));
        this.keyWords = this.extractKeysAndAddProbability(this.dictionary, this.sumFrequency);
        this.createTree(this.keyWords).then(tree => {
          this.tree = tree;
          const strings = ['of', 'for', 'the', 'another', 'even', 'door', 'vacation', 'slovensko'];
          strings.forEach( word => {
            console.log('Number of comparisons for word ' + word + ' is ' + this.pocetPorovnani(word) + '.');
            console.log('****************************************************');
          });
        });
      }
    };
    fileReader.readAsText(this.file);
  }

  convertTextToDictionary(text: string): Word[]{
    const minFrequency = 50000;
    const dictionary = [];
    this.sumFrequency = 0;
    const dictionaryRow = text.split('\n').filter(el => el.length > 0);
    dictionaryRow.forEach((row, index) => {
      const rowString = row.split(' ').filter(el => el.length > 0);
      const word: Word = {
        id: index,
        frequency: parseInt(rowString[0], 10),
        label: rowString[1],
        pProbability: -1,
        qProbability: -1,
        type: parseInt(rowString[0], 10) > minFrequency ? Key.NORMAL : Key.DUMMY,
      };
      this.sumFrequency += word.frequency;
      dictionary.push(word);
    });
    return dictionary;
  }

  extractKeysAndAddProbability(dictionary: Word[], sumFrequency: number): Word[] {
    let qSum = 0;
    const onlyKeyWords: Word[] = [];
    const pTmp = [];
    const wordTmp = [];

    pTmp.push(0.0);                      // actually non existing element! p0 doesnt exist!
    wordTmp.push('');

    let id = 0;
    // PRECO ?
    const emptyWord: Word = {
      id,
      frequency: 0,
      label: '',
      pProbability: 0,
      qProbability: 0,
      type: Key.DUMMY
    };

    onlyKeyWords.push(emptyWord);
    dictionary.forEach( word => {
      if (word.type === Key.NORMAL) {
        id += 1;
        word.id = id;
        word.pProbability = (word.frequency / sumFrequency);
        word.qProbability = (qSum / sumFrequency);
        qSum = 0;
        onlyKeyWords.push(word);
      } else {
        qSum += word.frequency;
      }
    });

    // onlyKeyWords.push();
    return onlyKeyWords;
  }

  // https://www.youtube.com/watch?v=FvdPo8PBQtc+
  createTree(probabilityTable: Word[]): Promise<Word[][]> {
    return new Promise(resolve => {
      const n = probabilityTable.length - 1; // freq > 50000 - 1, lebo extra 0th element

      // we dont use the 0th row and column, saving the keys right away so I can access more info
      const root: Word[][] = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));

      // w, not using the 0th row
      const probabilitySums = new Array(n + 2).fill(0).map(() => new Array(n + 1).fill(0));

      // e, not using the 0th row
      const expectedCosts = new Array(n + 2).fill(0).map(() => new Array(n + 1).fill(0));

      for (let i = 1; i <= n + 1; i++){          // we are filling up the tables from the 1st row
        probabilitySums[i][i - 1] = probabilityTable[i - 1].qProbability;
        expectedCosts[i][i - 1] = probabilityTable[i - 1].qProbability;
      }

      for (let i = 1; i <= n; i++) {
        for (let ii = 1; ii <= n - i + 1; ii++) {
          const j = i + ii - 1;
          expectedCosts[ii][j] = Number.MAX_SAFE_INTEGER;
          probabilitySums[ii][j] = probabilitySums[ii][j - 1] + probabilityTable[j].pProbability + probabilityTable[j].qProbability;
          for ( let iii = ii; iii <= j; iii++) {
            const t = expectedCosts[ii][iii - 1] + expectedCosts[iii + 1][j] + probabilitySums[ii][j];
            if (t < expectedCosts[ii][j]) {
              expectedCosts[ii][j] = t;
              root[ii][j] = probabilityTable[iii];
            }
          }
        }
      }

      // hodnota / cena stromu expectedCosts[1][150]
      this.treeValue = expectedCosts[1][151];
      resolve(root);
    });
  }

  findWord(roots: Word[][], start: number, end: number, findWord: string): string {

    this.comparision = 0;

    if (start > end || end < 1) {
      return null;
    }

    if (roots[start][end] == null){
      console.log('PROBLEM mojko');
      this.comparision++;
      return null;
    }

    const rootString = roots[start][end].label;
    const rootId = roots[start][end].id;

    // found key
    if (rootString == null || rootString.length === 0 || rootString === findWord) {
      this.comparision ++;
      return rootString;
    }

    // left tree
    if (findWord.localeCompare(rootString) > 0) {
      this.comparision ++;
      // @ts-ignore
      return  this.findWord(roots, start, rootId - 1, findWord);
    }

    if (findWord.localeCompare(rootString) < 0){
      // right tree

      this.comparision++;
      // @ts-ignore
      return  this.findWord(roots, start, rootId + 1, findWord);
    }

  }

  pocetPorovnani(findWord): number {
    this.comparision = 0;
    if (findWord.length > 0) {
      const foundKey = this.findWord(this.tree, 1, this.tree.length - 1, findWord);
      if (foundKey == null){
        console.log('Word ' + findWord + ' was not found.');
        console.log('Dummy key is located on level ' + (findWord + 1) + '.');
      }else{
        console.log('Word ' + findWord + ' was found.');
        console.log('Key is located on level ' + findWord + '.');
      }
    }

    return this.comparision;
  }

}
