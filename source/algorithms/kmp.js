class KMPAlgorithm {
  _computeLspTable(str: string): number[] {
    const table = [0];
    let maxPrefix = 0;

    for (let index = 1; index < str.length; index++) {
      while (maxPrefix > 0 && str.charAt(maxPrefix) !== str.charAt(index)) {
        maxPrefix = table[maxPrefix - 1];
      }

      if (str.charAt(maxPrefix) === str.charAt(index)) {
        maxPrefix++;
      }

      table[index] = maxPrefix;
    }

    return table;
  }

  search(list: string[], input: string): string[] {
    if (input === '') return list;

    const lspTable = this._computeLspTable(input);
    input = input.toLowerCase();
    const output = [];

    for (const elem of list) {
      let matches = 0;

      for (let i = 0; i < elem.length; i++) {
        if (
          matches > 0
          && elem.charAt(i).toLowerCase() !== input.charAt(matches)
        ) {
          matches = lspTable[matches - 1];
        }

        if (elem.charAt(i).toLowerCase() === input.charAt(matches)) {
          matches++;

          if (matches === input.length) {
            output.push(elem);
            break;
          }
        }
      }
    }

    return output;
  }
}

export default new KMPAlgorithm();
