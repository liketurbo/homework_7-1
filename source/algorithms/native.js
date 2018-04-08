export default (list: string[], input: string): string[] => {
  if (input === '') return list;

  return list.filter(elem => (
    elem.toLowerCase().includes(input.toLowerCase())
  ));
};
