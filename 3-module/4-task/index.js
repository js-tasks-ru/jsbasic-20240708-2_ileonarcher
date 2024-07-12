function showSalary(users, age) {
  let arr = [];
  for (let man of users) {
    if (man.age <= age) {
      arr.push(`${man.name}, ${man.balance}`);
    }
  }
  let str = arr.join("\n");
  return str;
}
