import { renderItems, addEventListeners } from "./preprocess.js";
import {organizeTables} from "./process.js"


addEventListeners();
renderItems();

document.getElementById('process')
    .addEventListener('click', () => {
        organizeTables();
    })