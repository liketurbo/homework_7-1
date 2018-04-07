export default (list: string[], input: string): string[] => {
  if (input === '') return list;

  input = input.toLowerCase();
  const output = [];

  for (const elem of list) {
    const rightBorder = elem.length - input.length;
    if (rightBorder < 0) continue;

    for (let sPtr = 0; sPtr <= rightBorder; sPtr++) {
      let matched = true;

      for (let fPtr = 0; fPtr < input.length; fPtr++) {
        if (elem.charAt(sPtr + fPtr).toLowerCase() !== input.charAt(fPtr)) {
          matched = false;
          break;
        }
      }

      if (matched) output.push(elem);
    }
  }

  return output;
};
