function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[3].attributes["0"]?.value === "true") {
      table.rows[i].classList.add("available");
    } else if (table.rows[i].cells[3].attributes["0"]?.value === "false") {
      table.rows[i].classList.add("unavailable");
    } else if (table.rows[i].cells[3].attributes["0"]?.value == undefined) {
      table.rows[i].hidden = true;
    }

    if (table.rows[i].cells[2].innerHTML == "m") {
      table.rows[i].classList.add("male");
    } else if (table.rows[i].cells[2].innerHTML == "f") {
      table.rows[i].classList.add("female");
    }

    if (+table.rows[i].cells[1].innerHTML < 18) {
      table.rows[i].style.textDecoration = "line-through";
    }
  }
}
