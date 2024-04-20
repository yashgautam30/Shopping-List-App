import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    databaseURL: "https://shopping-list-app-925af-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSettings);
const database=getDatabase(app);
const shoppingListInDB=ref(database, "shoppingList");

const inputText=document.getElementById("inputField");
const btn=document.getElementById("add-btn");
const list=document.getElementById("shop-list");

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        clearList();
        
        let items=Object.entries(snapshot.val());
        
        for(let i=0; i<items.length; i++){
            addItemToList(items[i]);
        }
    }
    else{
        list.textContent="Shopping List Empty!";
    }
})

btn.addEventListener("click", function(){
    let input=inputText.value;

    if(input===""){
        alert("Input empty, Type Something!")
    }

    else{
        push(shoppingListInDB, input);

        clearInput();
    }
})

function clearInput(){
    inputText.value="";
}

function clearList(){
    list.innerHTML="";
}

function addItemToList(input){
    let id=input[0];
    let value=input[1];

    let newEl=document.createElement("li");

    newEl.textContent=value;

    newEl.addEventListener("click", function(){
        let exactLocation=ref(database, `shoppingList/${id}`);

        remove(exactLocation);
    })

    list.append(newEl);
}