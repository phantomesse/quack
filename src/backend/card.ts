export default class Card {
  secretWord: string;
  tabooWords: string[];

  constructor(secretWord: string, tabooWords: string[]) {
    this.secretWord = secretWord;
    this.tabooWords = tabooWords;
  }
}
