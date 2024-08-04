function getMinMax(str) {
  let arr = str.split(" ");
  let numArr = arr.map((item) => parseFloat(item));
  let res = numArr.filter((item) => !Number.isNaN(item));
  return {
    min: Math.min(...res),
    max: Math.max(...res),
  };
}
