export default (list: string[], input: string): string[] => (
  list.filter(elem => (
    elem.toLowerCase().includes(input.toLowerCase())
  ))
);
