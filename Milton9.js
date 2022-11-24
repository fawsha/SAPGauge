(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
<div id="table" style="width:100%">
	<div class="testTable">
		<div class="testRow">
			<div class="testColumn3">
				Armando Jorge A. Santos
			</div>
			<div class="testColumn2">
				Santos<br/>
				ola
			</div>
			<div class="testColumn3">
				Carmem Caldeira<br/>
				ola
			</div>
			<div class="testColumn4">
				Caldeira<br/>
				ola
			</div>
		</div>
		<div class="testRow">
			<div class="testColumn1">
				cell21
			</div>
			<div class="testColumn2">
				cell22
			</div>
			<div class="testColumn3">
				cell23<br/>
				bla bla bla bla
			</div>
			<div class="testColumn4">
				cell24
			</div>
		</div>
	</div>
</div>
    <style>
/////////////////////////////////////////////////////////////////////////////////////////////////
div.testRow{
	display: table-row; width: 100%; 
        white-space: nowrap;
	vertical-align:top;
	padding:0;
	margin:0;
	
}
div.testColumn1{
	display: table-cell; height:100%; min-width: 25%; background-color: #CCD9FF;	
	vertical-align:top;
	padding: 0.2em;
	
	border: 1px solid black;
	margin:0;
}
div.testColumn2{
	display: table-cell; height:100%; min-width: 25%;background-color: #ECFFE5;	
	vertical-align:top;
	padding: 0.2em;
	
	border: 1px solid black;
	margin:0;
	
}
div.testColumn3{
	display: table-cell; height:100%; min-width: 25%;background-color: #FFEBE5;	
	vertical-align:top;
	padding: 0.2em;
	
	border: 1px solid black;
	margin:0;
}
div.testColumn4{
	display: table-cell; height:100%; min-width: 25%;background-color: #FFFFCC;	
	vertical-align:top;
	padding: 0.2em;
	border: 1px solid black;
	margin:0;
}
    </style>
    `;

    customElements.define('com-demo-miltonfirstcw', class DiAutoComplete extends HTMLElement {


        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._values = [];
            this._keys = [];
            this._currentFocus;
            //this._inpId = 'di-autocomplete-widget';
            //this._divElemnt = this._shadowRoot.getElementById("di-autocomplete-main");
            //this._inpField = this._shadowRoot.getElementById("di-autocomplete-widget");
            
            this._armando = this._shadowRoot.getElementById("table");
            
            this._listStyle = "font-family: Arial; font-size: 14px; color: rgb(51, 51, 51)";
            this._listLimit = 5;

            // autocomplete(this._inpField, countries);

        }
	    
        addItem(key, text) {
            let index = this._keys.indexOf(key);
            if (index === -1) {
                this._values.push(text);
                this._keys.push(key);
                console.log(text);
                console.log(key);
            }
        }

        addItemsArr(keysArr, textsArr) {

            for (let i = 0; i < keysArr.length; i++) {
                let index = this._keys.indexOf(keysArr[i]);
                if (index === -1) {
                    this._values.push(textsArr[i]);
                    this._keys.push(keysArr[i]);
                    console.log(textsArr[i]);
                }
            }
        }

        removeAllItems() {
            this._values = [];
            this._keys = [];
        }

        removeItem(key) {

            let index = this._keys.indexOf(key);
            if (index >= 0) {
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
            }

        }


        //Fired when the widget is added to the html DOM of the page
        connectedCallback() {
            this._inpField.addEventListener("input", this._onInput.bind(this));
            this._inpField.addEventListener("click", this._onInput.bind(this));
            this._inpField.addEventListener("keydown", this._onKeyDown.bind(this));
            document.addEventListener("click", (e) => {
                this._closeAllLists(e.target);
            }, true);
        }

        //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback() {

            this._inpField.removeEventListener("input", () => { return });
            this._inpField.removeEventListener("keydown", () => { return });
            this._shadowRoot.removeEventListener("click", () => { return });
            this._inpField.removeEventListener("change", () => { return });

        }
	    
	customElements.define('com-demo-miltonfirstcw', Milton);
    });
})();
