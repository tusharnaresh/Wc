import Button from "./custom_elements/button.js";
import Search from './custom_elements/search.js';
import Card from './custom_elements/card.js'
const template = document.createElement('template');

template.innerHTML = `
  <style>
   .cards{
     display:flex;
     flex-wrap: wrap;
     justify-content: space-evenly;
     width:100%;
   }
   .container{
     display:flex;
   }
  
  </style>
  <div class='container'>
  <div class='search'></div>
  <div class='button'></div>
  </div>
  <div class="cards"></div>
 
  
`;
class Parent extends HTMLElement {
    constructor() {
      console.log('Parent constructor');
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this._search = this.shadowRoot.querySelector('.search');
      this._button = this.shadowRoot.querySelector('.button');
      this._container = this.shadowRoot.querySelector('.cards');
      this.data = undefined;
      customElements.whenDefined('search-element').then(()=>{
        console.log('HI from search');
        let search = new Search();
        this._search.append(search);
      })
      customElements.whenDefined('button-element').then(()=>{
        console.log('Hi from button');
        let btn = new Button();
        this._button.append(btn);
      })
      // let search = new Search();
      // this._search.append(search);
      // let btn = new new Button();
      // this._button.append(btn)
    this.shadowRoot.querySelector('.cards').addEventListener('click',async (e)=>{
      e.preventDefault();
      console.log(e.target.nodeName);
      if(e.composedPath()[0].nodeName=='BUTTON')
      {
        console.log(e.composedPath()[0].getAttribute('uid'));
        let val = e.composedPath()[0].getAttribute('uid');
        let res = await fetch(`/api?id=${e.composedPath()[0].getAttribute('uid')}`,{method:'DELETE'});
        let data = await res.json();
        console.log(data);
        if(data.message=='Deleted')
        {
          console.log(this.data); 
          delete this.data[val];
          console.log(this.data); 
          let el = this.shadowRoot.querySelector(`card-element[uid='${val}']`);
          console.log(el);
          el.remove()
        }
      }
    })
    }

    async connectedCallback() {
        console.log("I'm a parent and am now connected");
        let res  = await fetch('/api',{method:'GET'})
        let data = await res.json(); 
            this.data = data
            Object.keys(data).forEach(key => {
                let cel = new Card();
                cel.setAttribute('content',data[key].content)
                cel.setAttribute('uid',key);
                this._container.append(cel)
                
            });
            this.shadowRoot.querySelector('.btn').addEventListener('click',(e)=>{
              let elts = this.shadowRoot.querySelectorAll('card-element');
              elts.forEach(el=>{
                el.remove()
              })
              console.log( this.shadowRoot.querySelector('.inp').value);
              let text = this.shadowRoot.querySelector('.inp').value;
              let sor = null;
              Object.keys(this.data).forEach(key => {
                if(this.data[key].content.includes(text))
                {
                  sor={...sor,[key]:this.data[key]}
                }
              })
              console.log(sor);
              if(sor){
               console.log(sor);
              Object.keys(sor).forEach(key => {
               let cel = new Card();
               cel.setAttribute('content',this.data[key].content)
               cel.setAttribute('uid',key);
               this._container.append(cel)
               
           });
         }
        })
      
      }
}
customElements.define('parent-element', Parent);
customElements.define('search-element', Search);
customElements.define('button-element', Button);
customElements.define('card-element', Card);