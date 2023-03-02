let form = document.getElementById("adminform");
let link =
  "https://crudcrud.com/api/5968296ff05448a9adb33776b3ef9232/adminData";
form.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(link)
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        let obj = res.data[i];
        let ele = makeliElement(obj._id, obj.product, obj.price, obj.category);
        appendToSection(obj.category, ele);
      }
    })
    .catch((res) => console.log(res));
});

function onSubmit(e) {
  e.preventDefault();
  let product = document.getElementById("product").value;
  let price = document.getElementById("sp").value;
  let category = document.getElementById("cat").value;

  axios
    .post(link, { product: product, price: price, category: category })
    .then((res) => {
      axios
        .get(link)
        .then((res) => {
          let lastIndex = res.data.length - 1;
          //console.log(res);
          let lastEleId = res.data[lastIndex]._id;
          //console.log(lastEleId);
          let ele = makeliElement(lastEleId, product, price, category);
          appendToSection(category, ele);
          document.getElementById("product").value = "";
          document.getElementById("sp").value = "";
          document.getElementById("cat").value = "";
        })
        .catch((res) => console.log("error in get link"));
    })
    .catch((res) => console.log(res));
}

function makeliElement(lastEleId, product, price, category) {
  let li = document.createElement("li");
  li.id = lastEleId;
  li.appendChild(
    document.createTextNode(
      `${product} is selling at ${price} under ${category} catergory`
    )
  );
  li.append(delButton());
  return li;
}

function delButton() {
  let btnDel = document.createElement("button");
  btnDel.className = "btn-del";
  btnDel.appendChild(document.createTextNode("Delete Product"));
  return btnDel;
}

function appendToSection(category, ele) {
  switch (category) {
    case "misc":
      document.getElementById("miscitems").appendChild(ele);
      break;
    case "food":
      document.getElementById("fooditems").appendChild(ele);
      break;
    case "skincare":
      document.getElementById("skincareitems").appendChild(ele);
      skincarebtn = document.getElementById("skincareitems");
      break;
    case "electronics":
      document.getElementById("electronicitems").appendChild(ele);
      break;
  }
}

//del button functionality
document.getElementById("skincareitems").addEventListener("click", Del);
document.getElementById("electronicitems").addEventListener("click", Del);
document.getElementById("fooditems").addEventListener("click", Del);
document.getElementById("miscitems").addEventListener("click", Del);

function Del(e) {
  if (e.target.className == "btn-del") {
    let id = e.target.parentNode.id;
    let delLink = link + "/" + id;
    axios
      .delete(delLink)
      .then(() => {
        e.target.parentNode.remove();
      })
      .catch((res) => console.log(res));
  }
}
