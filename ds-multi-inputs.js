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
        console.log(params);
        let ds_multi_inputs = document.createElement('div');
        ds_multi_inputs.classList.add("ds-multi-inputs");

        let items = document.createElement('div');
        items.classList.add("ds-multi-inputs__items");
        for (let i = 0; i < this.#min; i++) {
            items.append(this.createItem(el));
        }

        ds_multi_inputs.append(items);

        el.after(ds_multi_inputs);
        el.remove();
    }

    createItem(el) {
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
            if (this.#elements < this.#max)
                item.after(this.createItem(el));
        }

        actions.append(minus);
        actions.append(plus);

        input.append(el.cloneNode(true));

        item.append(input);
        item.append(actions);

        this.#elements++;

        console.log(this.#elements);

        return item;
    }
}

// Element.prototype.ds_multi_inputs = function(params) {
//     new CreateDsMultiInputs.createDsMultiInputs(this, params);
// }

NodeList.prototype.ds_multi_inputs = function(params) {
    this.forEach((el) => {
        let create = new CreateDsMultiInputs(params.min, params.max);
        create.createDsMultiInputs(el, params);
    })
}