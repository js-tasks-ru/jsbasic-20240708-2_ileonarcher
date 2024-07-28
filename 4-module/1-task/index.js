function makeFriendsList(friends) {
  let arr = [];
  for (let li of friends) {
    arr.push(`<li>${li.firstName} ${li.lastName}</li>`);
  }
  let ul = document.createElement("ul");
  ul.innerHTML = arr.join("");
  return ul;
}
