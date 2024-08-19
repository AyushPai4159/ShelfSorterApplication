
import {itemList, storageList, modifyContents} from "./preprocess.js";


let itemListBackup = []
let storageListBackUp = [];
let processList = [];



//fix this function so results show in each storage unit





 export function organizeTables(){
    
    let k = 0;
    itemListBackup = JSON.parse(JSON.stringify(itemList));
    storageListBackUp = JSON.parse(JSON.stringify(storageList));


    let m = storageList.length;

    for(let i = 0; i < m; i++){
      processList[i] = 
      {
        storageCompart: storageList[0],
        components: []
      };
      
      for(let j = 0; j < itemList.length; j++){
        
          if(storageList[0].type != ''){
            if(itemList[j].type === storageList[0].type){
              if(storageList[0].size === itemList[j].size){
                
                const diff = storageList[0].quantity - k;
                k += (storageList[0].quantity >= k + itemList[j].quantity)
                  ? itemList[j].quantity : storageList[0].quantity - k;
                
                if(k >= storageList[0].quantity){
                    let newItem = addOverflow(itemList[j], diff)
                    if(newItem.quantity > 0){
                      itemList[j].quantity -= newItem.quantity;
                        processList[i].components.push(newItem);
                    }
                    if(itemList[j].quantity <= 0){
                        itemList.splice(j, 1);
                        j--;
                    }
                    break;
                } else{
                    processList[i].components.push(itemList[j]);
                    itemList.splice(j, 1);
                    j--;
                }
              }
            } 
          } else if(storageList[0].size === itemList[j].size){
            if(i === 5){
              console.log(JSON.parse(JSON.stringify(itemList[j])));
              
            }

              const diff = storageList[0].quantity - k;
              k += (storageList[0].quantity >= k + itemList[j].quantity)
                ? itemList[j].quantity : storageList[0].quantity - k;
              if(k >= storageList[0].quantity){
                let newItem = addOverflow(itemList[j], diff)
                if(newItem.quantity > 0){
                    itemList[j].quantity -= newItem.quantity;
                    processList[i].components.push(newItem);
                }
                if(itemList[j].quantity <= 0){
                    itemList.splice(j, 1);
                    j--;
                }
                break;
              } else{
                processList[i].components.push(itemList[j]);
                itemList.splice(j, 1);
                j--;
              }
              
            
          }
      }
      k = 0;
      
      storageList.splice(0, 1);
      
    }
    console.log(processList[5])
    
    modifyContents(itemListBackup, storageListBackUp);
    
  
    renderProcessList();
  }

  function addOverflow(listItem, diff){
    let newListItem = Object.assign({}, listItem);
    newListItem.quantity = diff;
    

    return newListItem;
  }


  function renderProcessList(){
    let htmlOnPage = '<div style="margin-top: 100px"></div>';
    for(let i = 0; i < processList.length; i++){
      if(processList[i].storageCompart.type != ''){
      htmlOnPage += `
      <h1 style="margin-top: 30px">${processList[i].storageCompart.name}
      - ${processList[i].storageCompart.size} and ${processList[i].storageCompart.type}</h1>`
      
      } else{
        htmlOnPage += `
      <h1 style="margin-top: 30px">${processList[i].storageCompart.name}
      - ${processList[i].storageCompart.size}</h1>`
      }
      htmlOnPage += `<div class = "process-grid">`;
      for(let j = 0; j < processList[i].components.length; j++){
        htmlOnPage += `
        <div>${processList[i].components[j].name}</div>
        <div>${processList[i].components[j].size}</div>
        <div>${processList[i].components[j].quantity}</div>
        <div>${processList[i].components[j].type}</div>`;
      }
      htmlOnPage += `</div>`;
      
    }
    let processGrid = document.querySelector('.processGenerate');
    processGrid.innerHTML = htmlOnPage;
  }

 
 