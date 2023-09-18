class CreateDsMultiInputs
{
    #min;
    #max;
    #elements = 0;
    #hash = '';
    #increment = 1;
    #template = '';

    constructor(min = 1, max = null, template) {
        this.#min = min;
        this.#max = max;
        this.#hash = Math.random().toString(36).slice(2, 7);
        this.#template = template;
    }

    createDsMultiInputs(el, params) {
        let ds_multi_inputs = document.createElement('div');
        ds_multi_inputs.classList.add("ds-multi-inputs");

        let items = document.createElement('div');
        let ids = [];
        items.classList.add("ds-multi-inputs__items");
        for (let i = 0; i < this.#min; i++) {
            let createItem =  this.createItem(params);
            ids.push(createItem.id);
            let new_element = createItem.item
            items.append(new_element);
        }

        ds_multi_inputs.append(items);

        el.after(ds_multi_inputs);
        el.remove();

        if (params !== undefined) {
            if (params.afterInit !== undefined) {
                params.afterInit(ids);
            }
        }
    }

    createItem(params) {
        let item = document.createElement('div');
        item.classList.add("ds-multi-inputs__items_item");

        let input = document.createElement('div');
        input.classList.add("ds-multi-inputs__items_item__input");

        let actions = document.createElement('div');
        actions.classList.add("ds-multi-inputs__items_item__actions");

        let minus = document.createElement('button');
        minus.innerText = "-";

        if(params !== undefined) {
            if (params.buttons !== undefined) {
                if (params.buttons.removeItem !== undefined) {
                    if (params.buttons.removeItem.className !== undefined)
                        minus.className = params.buttons.removeItem.className;
                    if (params.buttons.removeItem.text !== undefined)
                        minus.innerText = params.buttons.removeItem.text;
                }
            }
        }

        minus.onclick = (event) => {
            event.preventDefault();
            if (this.#elements > this.#min) {
                item.remove();
                this.#elements--;
            }
        }

        let plus = document.createElement('button');
        plus.innerText = "+";

        if(params !== undefined) {
            if (params.buttons !== undefined) {
                if (params.buttons.createItem !== undefined) {
                    if (params.buttons.createItem.className !== undefined)
                        plus.className = params.buttons.createItem.className;
                    if (params.buttons.createItem.text !== undefined)
                        plus.innerText = params.buttons.createItem.text;
                }
            }
        }

        plus.onclick = (event) => {
            event.preventDefault();
            if (this.#elements < this.#max || this.#max === null) {
                let createItem = this.createItem(params);
                let new_element = createItem.item;
                let id = createItem.id;
                item.after(new_element);
                if (params !== undefined) {
                    if (params.afterCreateItem !== undefined) {
                        params.afterCreateItem(new_element, id);
                    }
                }
            }
        }

        actions.append(minus);
        actions.append(plus);

        let id = this.#increment+'-'+this.#hash;
        //replace
        
        let create_template = this.#template.replace(/:id:/gi, id);

        let domParser = new DOMParser();
        let doc = domParser.parseFromString(create_template, 'text/html');
        let clone_element = doc.body.childNodes[0];
        
        clone_element.setAttribute('data-ds-multi-inputs-id', id);
        input.append(clone_element);

        item.append(input);
        item.append(actions);

        this.#elements++;
        this.#increment++;

        return {item, id};
    }
}

Element.prototype.ds_multi_inputs = function(params) {

    let min = this.getAttribute('data-min') === null ? 1 : this.getAttribute('data-min');
    let max = this.getAttribute('data-max') === null ? 1 : this.getAttribute('data-max');
    let template = el.outerHTML;

        if (params !== undefined) {
            if (params.template !== undefined) {
                template = params.template;
            }
        }

    let create = new CreateDsMultiInputs(min, max, template);

    create.createDsMultiInputs(this, params);
}

NodeList.prototype.ds_multi_inputs = function(params) {
    this.forEach((el) => {
        let min = el.getAttribute('data-min') === null ? 1 : el.getAttribute('data-min');
        let max = el.getAttribute('data-max') === null ? 1 : el.getAttribute('data-max');
        let template = el.outerHTML;

        if (params !== undefined) {
            if (params.template !== undefined) {
                template = params.template;
            }
        }
    
        let create = new CreateDsMultiInputs(min, max, template);

        create.createDsMultiInputs(el, params);
    })
}