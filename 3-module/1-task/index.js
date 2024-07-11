function namify(users) {
  let res = [];
  users.forEach((item) => res.push(item["name"]));
  return res;
}
