export default class Search extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
          <input class='inp' type='text'></input>
        `;
      }
      
      connectedCallback() {
        // this.mtf = this.shadowRoot.querySelector('input');
        // this.mtf.addEventListener('input',(e)=>{
        //     const event = new CustomEvent('build', {detail:{data:e.target.value},bubbles:true,composed:true});
        //     this.mtf.dispatchEvent(event);
        // })
      }  
}