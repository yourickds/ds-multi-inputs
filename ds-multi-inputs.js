class CreateDsMultiInputs
{
    #min;
    #max;
    #elements = 0;

    constructor(min = 1, max = null) {
        this.#min = min;
        this.#max = max;
    }

    createDsMultiInputs(el, params) { 
        let ds_multi_inputs = document.createElement('div');
        ds_multi_inputs.classList.add("ds-multi-inputs");

        let items = document.createElement('div');
        items.classList.add("ds-multi-inputs__items");
        for (let i = 0; i < this.#min; i++) {
            let new_element = this.createItem(el, params);
            items.append(new_element);
        }

        ds_multi_inputs.append(items);

        el.after(ds_multi_inputs);
        el.remove();

        if (params !== undefined) {
            if (params.afterInit !== undefined) {
                params.afterInit();
            }
        }
    }

    createItem(el, params) {
        let item = document.createElement('div');
        item.classList.add("ds-multi-inputs__items_item");

        let input = document.createElement('div');
        input.classList.add("ds-multi-inputs__items_item__input");

        let actions = document.createElement('div');
        actions.classList.add("ds-multi-inputs__items_item__actions");

        let minus = document.createElement('button');
        minus.innerText = "-";
        minus.onclick = (event) => {
            event.preventDefault();
            if (this.#elements > this.#min) {
                item.remove();
                this.#elements--;
            }
        }

        let plus = document.createElement('button');
        plus.innerText = "+";
        plus.onclick = (event) => {
            event.preventDefault();
            if (this.#elements < this.#max || this.#max === null) {
                let new_element = this.createItem(el, params);
                item.after(new_element);
                if (params !== undefined) {
                    if (params.afterCreateItem !== undefined) {
                        params.afterCreateItem(new_element);
                    }
                }
            }
        }

        actions.append(minus);
        actions.append(plus);

        input.append(el.cloneNode(true));

        item.append(input);
        item.append(actions);

        this.#elements++;

        return item;
    }
}

Element.prototype.ds_multi_inputs = function(params) {

    let min = this.getAttribute('data-min') === null ? 1 : this.getAttribute('data-min');
    let max = this.getAttribute('data-max') === null ? 1 : this.getAttribute('data-max');

    let create = new CreateDsMultiInputs(min, max);

    create.createDsMultiInputs(this, params);
}

NodeList.prototype.ds_multi_inputs = function(params) {
    this.forEach((el) => {
        
        let min = el.getAttribute('data-min') === null ? 1 : el.getAttribute('data-min');
        let max = el.getAttribute('data-max') === null ? 1 : el.getAttribute('data-max');

        let create = new CreateDsMultiInputs(min, max);

        create.createDsMultiInputs(el, params);
    })
}