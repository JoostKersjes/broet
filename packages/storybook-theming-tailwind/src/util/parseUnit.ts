/*
 * Adapted from parse-unit package
 * https://github.com/mattdesl/parse-unit
 */
export const parseUnit = (str: string) => {
  const out: [number, string] = [0, ""];
  out[0] = parseFloat(str);
  out[1] = str.match(/[\d.\-\+]*\s*(.*)/)?.[1] || "";
  return out;
};
