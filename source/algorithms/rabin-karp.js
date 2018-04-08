class RabinCarpAlgorithm {
  constructor() {
    this.radix = 10;
    this.modulo = 997;
  }

  _hash(str: string, start: number, end: number): number {
    let hash = 0;
    for (let i = start; i < end; i++) {
      hash = ((this.radix * hash) + str.charCodeAt(i)) % this.modulo;
    }
    return hash;
  }

  _matchesEntirely(text: string, pattern: string, index: number): boolean {
    let matched = true;
    for (let i = 0; i < pattern.length; i++) {
      if (text.charAt(index + i) !== pattern.charAt(i)) {
        matched = false;
        break;
      }
    }
    return matched;
  }

  search(list: string[], input: string): string[] {
    if (input === '') return list;

    input = input.toLowerCase();
    const output = [];

    for (const elem of list) {
      const rightBorder = elem.length - input.length;
      if (rightBorder < 0) continue;

      const hashInput = this._hash(input, 0, input.length);
      let hashElem = this._hash(elem.toLowerCase(), 0, input.length);

      for (let i = 0; i <= rightBorder; i++) {
        if (hashInput === hashElem) {
          if (this._matchesEntirely(elem.toLowerCase(), input, i)) {
            output.push(elem);
            break;
          }
        } else {
          hashElem = this._hash(elem.toLowerCase(), i, i + input.length);
        }
      }
    }

    return output;
  }
}

export default new RabinCarpAlgorithm();
