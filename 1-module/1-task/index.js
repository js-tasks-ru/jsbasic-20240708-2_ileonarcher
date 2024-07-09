function factorial(n) {
  let res = 1;
  while (n) {
    if (n == 1) return res;
    res *= n--
  }
  return res
}
