export default (list: string[], input: string): string[] => {
  input = input.toLowerCase();
  const output = [];

  for (let elem of list) {
    elem = elem.toLowerCase();

    const rightBorder = elem.length - input.length;
    if (rightBorder < 0) continue;

    for (let sPtr = 0; sPtr <= rightBorder; sPtr++) {
      let matched = true;

      for (let fPtr = 0; fPtr < input.length; fPtr++) {
        if (elem.charAt(sPtr + fPtr) !== input.charAt(fPtr)) {
          matched = false;
          break;
        }
      }

      if (matched) output.push(elem);
    }
  }

  return output;
};
