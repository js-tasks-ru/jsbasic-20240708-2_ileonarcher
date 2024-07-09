function isEmpty(obj) {
  let a = 0;
  for (key in obj) {
    a++;
  }
  return a === 0 ? true : false;
}
