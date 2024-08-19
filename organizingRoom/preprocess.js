export let itemList = JSON.parse(localStorage.getItem('items')) || [];
export let storageList = JSON.parse(localStorage.getItem('storage')) || [];




// document.body.addEventListener('keydown', (event) => {
//     if(event.key === 'Enter'){
//         addTodo(event);
//     }
// }); 
  
  renderItems();

  export function addEventListeners(){
    document.getElementById('itemBut')
    .addEventListener('click', (event) => {
        addTodo(event);
    });
    document.getElementById('storBut')
    .addEventListener('click', (event) => {
        addTodo(event);
    });
  }
  
  export function renderItems() {
    let itemListHTML = '';
    let storageListHTML = '';

    for(let i = 0; i < storageList.length; i++){
      sortStorageTypes(i);
    }

   
  
    itemList.forEach(function(todoObject, index){
      const { name, size, quantity, type } = todoObject;
      const html = `
        <div>${name}</div>
        <div>${size}</div>
        <div>${quantity}</div>
        <div>${type}</div>
        <button class="delete-todo-button
        js-delete-todo-button">Delete</button> 
      `;
      itemListHTML += html;
    });
    storageList.forEach(function(storageObj, index){
      const { name, size, quantity, type } = storageObj;
      const html = `
        <div>${name}</div>
        <div>${size}</div>
        <div>${quantity}</div>
        <div>${type}</div>
        <button class="delete-todo-button
        js-delete-todo-button2">Delete</button> 
      `;
      storageListHTML += html;
    });

  
    document.querySelector('.js-item-list')
      .innerHTML = itemListHTML;
      document.querySelectorAll('.js-delete-todo-button')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
              itemList.splice(index, 1);
              localStorage.setItem("items", JSON.stringify(itemList));
              renderItems();
            });
        });

    document.querySelector('.js-storage-list')
        .innerHTML = storageListHTML;
        document.querySelectorAll('.js-delete-todo-button2')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
              storageList.splice(index, 1);
              localStorage.setItem("storage", JSON.stringify(storageList));
              renderItems();
            });
        });

      

      /*
        Closure: if a function has access to a value, it will ALWAYS have access to the value.
        value gets packaged together with function
      */
  }
  
      

  export function addTodo(event) {
    if(event.target.id === "itemBut"){
      const nameElement = document.querySelector('.js-name-input');
      const name = nameElement.value;
      const sizeElement = document.querySelector('.js-size-input');
      const size = sizeElement.value; 
      const quantityElement = document.querySelector('.js-quantity-input');
      const quantity = Number(quantityElement.value);
      const typeElement = document.querySelector('.js-type-input');
      const type = typeElement.value;
  
    
      let errorString = '';
      if(isNaN(quantity)){
          errorString += "You didn't give a valid quantity "; 
          console.log(errorString);
      } if((size != 'small' && size != 'medium' && size != 'large') && size != '' ){
          if(errorString != '')
              errorString += 'and ' + "you didn't enter a valid size";
          else
              errorString+= "You didn't enter a valid size!";
      } if(errorString != ''){
          alert(errorString);
          return;
      }
  
      itemList.push({
        //name: name,
        //dueDate: dueDate,
        name,
        size,
        quantity,
        type
  
      });
    }
    else{
      const nameElement = document.querySelector('.js-name2-input');
      const name = nameElement.value;
      const sizeElement = document.querySelector('.js-size2-input');
      const size = sizeElement.value; 
      const typeElement = document.querySelector('.js-type2-input');
      const type = typeElement.value;
      const quantityElement = document.querySelector('.js-quantity2-input');
      const quantity = quantityElement.value;
      storageList.push({
        name,
        size,
        quantity,
        type
      });
    }

    localStorage.setItem('items', JSON.stringify(itemList));
    localStorage.setItem('storage', JSON.stringify(storageList));
    
    
    
    renderItems();
  }
  export function modifyContents(list1, list2){
    itemList = list1;
    storageList = list2;
  }

  function sortStorageTypes(index){

    if(storageList[index].type != '' && index-1 >= 0){
      let temp = storageList[index-1];
      storageList[index-1] = storageList[index];
      storageList[index] = temp;
      sortStorageTypes(index-1);
    }
  }