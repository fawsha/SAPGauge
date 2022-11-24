(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
<div id="table" style="width:100%">
	<div class="testTable">
		<div class="testRow">
			<div class="testColumn1">
				Armando Santos
			</div>
			<div class="testColumn2">
				Santos<br/>
				bbb2
			</div>
			<div class="testColumn3">
				Carmem Caldeira<br/>
				cccc2
			</div>
			<div class="testColumn4">
				Milton Lopes<br/>
				dddddd
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

    customElements.define('com-demo-miltonfirstcw10', class testTable extends HTMLElement {


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

        passTableValues(textsArr) {

            for (let i = 0; i < textsArr.length; i++) {
                let index = this._keys.indexOf(textsArr[i]);
                if (index === -1) {
		    console.log(textsArr[i]);
                }
            }

        }
	    
        addItem(key, text) {
            let index = this._keys.indexOf(key);
            if (index === -1) {
                this._values.push(text);
                this._keys.push(key);
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

        getSelectedKey() {
            return this._inpField.getAttribute('key');
        }

        getSelectedText() {
            return this._inpField.getAttribute('value');
        }

        getValue() {
            return this._inpField.value;
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

        setInputStyle(styleStr) {
            this._inpField.style = styleStr;
        }

        setListStyle(styleStr) {
            this._listStyle = styleStr;
        }

        setListLimit(limit) {
            this._listLimit = limit;
        }
        setPlaceholder(text) {
            this._inpField.setAttribute('placeholder', text);
        }

        setSelectedKey(key) {
            let index = this._keys.indexOf(key);

            if (index >= 0) {
                this._inpField.setAttribute('key', key);
                this._inpField.setAttribute('value', this._values[index]);
                this._inpField.value = this._values[index];
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

        //When the custom widget is updated, the Custom Widget SDK framework executes this function first
        onCustomWidgetBeforeUpdate(oChangedProperties) {

        }

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
        onCustomWidgetAfterUpdate(oChangedProperties) {
            // if (this._firstConnection) {
            //     this.redraw();
            // }
        }

        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy() {

        }

        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
        
        }
        */

        _checkForValue() {
            if (this._values.indexOf(this._inpField.value) >= 0) {

            }
        }



        _removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        _closeAllLists(elmnt) {

            if (!this._inpField.getAttribute('key') && this._inpField.value) {
                this._inpField.classList.add('di-input-error');
                this._inpField.classList.remove('di-input-success');
            } else {
                this._inpField.classList.remove('di-input-error');
                this._inpField.classList.add('di-input-success');
                
            }

            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/

            var x = this._shadowRoot.querySelectorAll(".autocomplete-items");

            for (var i = 0; i < x.length; i++) {
                //if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
                //}
            }
        }



        _addActive(x) {

            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            this._removeActive(x);
            if (this._currentFocus >= x.length) this._currentFocus = 0;
            if (this._currentFocus < 0) this._currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[this._currentFocus].classList.add("autocomplete-active");

        }


        _onKeyDown(e) {
            var x = this._shadowRoot.getElementById(this._inpId + "autocomplete-list");

            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                this._currentFocus++;
                /*and and make the current item more visible:*/
                this._addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                this._currentFocus--;
                /*and and make the current item more visible:*/
                this._addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/

                e.preventDefault();
                if (this._currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[this._currentFocus].click();

                }


            }
            ;
        }

        _isValueFull(value) {
            let index = 0;
            for (index = 0; index < this._values.length; index++) {
                if (this._values[index].trim() == value.trim()) {
                    break;
                };

            }

            if (index < this._values.length) {
                this._inpField.classList.remove('di-input-error');
                this._inpField.classList.add('di-input-success');


                this._inpField.value = value;

                this._inpField.setAttribute("value", value);
                this._inpField.setAttribute("key", this._keys[index]);

                let selectEvent = new Event("onSelect");
                this.dispatchEvent(selectEvent);

                return true;
            } else {
                this._inpField.classList.remove('di-input-success');
                return false;
            }


            //Doesn't work
            // let index = this._values.indexOf(value.trim());
            // if (index >= 0) {

            //     this._inpField.value = value;

            //     this._inpField.setAttribute("value", value);
            //     this._inpField.setAttribute("key", this._keys[index]);

            //     let selectEvent = new Event("onSelect");
            //     this.dispatchEvent(selectEvent);

            //     return true;

            // } else {
            //     return false;
            // }


        }

        _onInput(e) {

            let a, i, val = e.target.value;
            let arr = this._values;
            let keys = this._keys;

            /*close any already open lists of autocompleted values*/
            this._closeAllLists();
            if (!val || this._inpField.getAttribute('value') == val
                || this._isValueFull(val)) {
                return false;
            } else {
                this._inpField.setAttribute("value", "");
                this._inpField.setAttribute("key", "");
            }
            this._currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this._inpId + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");

            /*append the DIV element as a child of the autocomplete container:*/
            this._divElemnt.appendChild(a);
            /*for each item in the array...*/
            let matchCount = 0;
            for (i = 0; i < arr.length; i++) {
                if (matchCount >= this._listLimit) {
                    continue;
                }
                /*check if the item starts with the same letters as the text field value:*/
                //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                if (arr[i].toUpperCase().includes(val.toUpperCase())) {
                    matchCount++;
                    /*create a DIV element for each matching element:*/
                    let b = document.createElement("DIV");
                    /*make the matching letters bold:*/

                    let indexVal = arr[i].toUpperCase().indexOf(val.toUpperCase());

                    b.style = this._listStyle;
                    b.innerHTML = arr[i].substr(0, indexVal);
                    b.innerHTML += "<strong>" + arr[i].substr(indexVal, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(indexVal + val.length, arr[i].length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'  key='" + keys[i] + "'>";
                    /*make the matching letters bold:*/

                    /*insert a input field that will hold the current array item's value:*/

                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", (e) => {

                        let inpItem = b.getElementsByTagName("input")[0];
                        this._inpField.value = inpItem.value;

                        this._inpField.setAttribute("value", inpItem.getAttribute('value'));
                        this._inpField.setAttribute("key", inpItem.getAttribute('key'));

                        let selectEvent = new Event("onSelect");
                        this.dispatchEvent(selectEvent);

                        this._closeAllLists();
                    });
                    a.appendChild(b);
                } else {
                    this._inpField.classList.add('di-input-error');
                }
            }
        };

    });

})();
