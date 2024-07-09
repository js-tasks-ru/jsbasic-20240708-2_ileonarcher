function sumSalary(salaries) {
  let res = 0;
  for (key in salaries) {
    if (typeof salaries[key] == "number") {
      if (!isFinite(salaries[key])) continue;
      res += salaries[key];
    }
  }
  return res;
}
