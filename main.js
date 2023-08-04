import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://add-to-cart-6ac7d-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app)
const ulel = document.getElementById("shopping-list")

const shoppingListInDB = ref(database, "shoppingList")
// console.log(app)
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", () => {
  let inputValue = inputFieldEl.value;
  inputFieldEl.value=""
  if(inputValue != "")
    push(shoppingListInDB, inputValue)
})
let ourItems
onValue(shoppingListInDB, (snapshot) => {

  if(snapshot.exists()){
    let ourItems = Object.entries(snapshot.val())
    ulel.innerHTML = ""
    for(let i=0; i<ourItems.length; ++i){
      let currentItem = ourItems[i]
      appendItemToShoppingListEl(currentItem)
      console.log(currentItem[1])
    }
  }
  else{
    ulel.innerHTML = ""
  }
})

function appendItemToShoppingListEl(item){
  let itemId = item[0]
  let liel = document.createElement("li")
  liel.textContent = item[1]
  ulel.append(liel) 

  liel.addEventListener("click", function() {
    remove(ref(database, `shoppingList/${item[0]}`))
  })
}






