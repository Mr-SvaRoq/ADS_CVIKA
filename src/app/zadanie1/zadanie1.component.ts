import {Component, OnInit} from '@angular/core';

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

  disabled = true;

  showResult = false;

  dummyKey = true;

  inputWord: string;

  dictionary: Word[] = [];

  keyWords: Word[] = [];

  treeValue: number;

  sumFrequency = 0;

  tree: Word[][] = null;

  private  comparison = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  findMe(): void {
    this.pocetPorovnani(this.inputWord);
    this.showResult = true;
  }

  readFile(e): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.dictionary = this.convertTextToDictionary(fileReader.result);
        this.dictionary.sort((a, b) => a.label.localeCompare(b.label));
        this.keyWords = this.extractKeysAndAddProbability(this.dictionary, this.sumFrequency);
        this.createTree(this.keyWords).then(tree => {
          this.tree = tree;
          this.disabled = false;
          // const strings = ['of', 'for', 'the', 'another', 'even', 'door', 'vacation', 'slovensko'];
          // strings.forEach(word => {
          //   this.pocetPorovnani(word);
          // });
        });
      }
    };
    fileReader.readAsText(this.file);
  }

  convertTextToDictionary(text: string): Word[] {
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
    let id = 0;

    // prvy 0th element
    const emptyWord: Word = {
      id,
      frequency: 0,
      label: '',
      pProbability: 0,
      qProbability: 0,
      type: Key.DUMMY
    };
    onlyKeyWords.push(emptyWord);

    dictionary.forEach(word => {
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

    return onlyKeyWords;
  }

  // https://www.youtube.com/watch?v=FvdPo8PBQtc+
  // 15.5 Optimal binary search trees
  createTree( keysTable: Word[]): Promise<Word[][]> {
    return new Promise(resolve => {

      // neberieme 0 element, pri elementoch, kde freq > 50 000
      const n =  keysTable.length - 1;

      // nepouzivame 0th row a column, ukladame kluce hned, aby sme mali viac info
      const root: Word[][] = new Array(n + 1)
        .fill(0)
        .map(() => new Array(n + 1)
          .fill(0));

      // w, nepouzivame 0th row
      const sums = new Array(n + 2)
        .fill(0)
        .map(() => new Array(n + 1)
          .fill(0));

      // e, nepouzivame 0th row, expectedCosts
      const  costs = new Array(n + 2)
        .fill(0)
        .map(() => new Array(n + 1)
          .fill(0));

      // vyplnenie arrays od 1st row
      for (let i = 1; i <= n + 1; i++) {
        sums[i][i - 1] =  keysTable[i - 1].qProbability;
        costs[i][i - 1] =  keysTable[i - 1].qProbability;
      }

      // black magic from 15.5 Optimal binary search trees
      for (let i = 1; i <= n; i++) {
        for (let ii = 1; ii <= n - i + 1; ii++) {
          const j = i + ii - 1;
          costs[ii][j] = Number.MAX_SAFE_INTEGER;
          sums[ii][j] = sums[ii][j - 1] +  keysTable[j].pProbability +  keysTable[j].qProbability;
          for (let iii = ii; iii <= j; iii++) {
            const t =  costs[ii][iii - 1] +  costs[iii + 1][j] + sums[ii][j];
            if (t <  costs[ii][j]) {
               costs[ii][j] = t;
               root[ii][j] =  keysTable[iii];
            }
          }
        }
      }

      // hodnota / cena stromu  costs[1][150]
      this.treeValue =  costs[1][n];
      resolve(root);
    });
  }

  findWord(roots: Word[][], start: number, end: number, findWord: string): string {

    if (start > end || end < 1 || roots[start][end] == null) {
      return null;
    }

    const rootString = roots[start][end].label;
    const rootId = roots[start][end].id;

    this.comparison++;

    // found key
    if (rootString == null || rootString.length === 0 || rootString === findWord) {
      return rootString;
    }

    // left tree
    if (findWord.localeCompare(rootString) < 0) {
      return this.findWord(roots, start, rootId - 1, findWord);
    }

    // right tree
    if (findWord.localeCompare(rootString) > 0) {
      return this.findWord(roots, rootId + 1, end, findWord);
    }
  }

  pocetPorovnani(findWord): number {
    this. comparison = 0;
    if (findWord.length > 0) {
      const foundKey = this.findWord(this.tree, 1, this.tree.length - 1, findWord);
      if (foundKey == null) {
        this.dummyKey = true;
      } else {
        this.dummyKey = false;
      }
    }

    return this. comparison;
  }

}
