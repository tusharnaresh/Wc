export default class Button extends HTMLElement {
    constructor() {
     
        super();
        this.innerHTML = `
          <button class='btn' data='test'>Search</button>
        `;
        console.log('Constructor of button');
      }
      
      connectedCallback() {
        console.log("I'm a child and am now connected.");
      }
    
      
}