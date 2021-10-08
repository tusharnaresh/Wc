let template2 = document.createElement('template');
template2.innerHTML = `
<style>
.ab{
  border: 1px solid black;
  margin-top:10%;
  padding:7px;
  width:100%;
  background-color:#a29bfe
}
.ab P{
  text-align:center;
  
}
.ab h4{
  text-align:center;
}
.ab button{
  width:100%
}
 }
</style>
<div class="ab" >
<h4></h4>
<p></p>
<button>Delete</button>
</div>
`;
export default class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template2.content.cloneNode(true));
      }
      connectedCallback(){
          console.log('Card of ');
          let el =this.shadowRoot.querySelector('p');
          el.append(`${this.getAttribute('content')}`)
          let el2 = this.shadowRoot.querySelector('h4');
          el2.append(`${this.getAttribute('uid')}`);
          let el3 = this.shadowRoot.querySelector('button');
          el3.setAttribute('uid',`${this.getAttribute('uid')}`)
          
      }
  
}