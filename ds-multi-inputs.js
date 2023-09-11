function createDsMultiInputs(el, params)
{ 
    console.log(params);
    let ds_multi_inputs = document.createElement('div');
    ds_multi_inputs.classList.add("ds-multi-inputs");

    let items = document.createElement('div');
    items.classList.add("ds-multi-inputs__items");

    items.append(createItem(el));

    ds_multi_inputs.append(items);

    el.after(ds_multi_inputs);
    el.remove();
}

function createItem(el)
{
    let item = document.createElement('div');
    item.classList.add("ds-multi-inputs__items_item");

    let input = document.createElement('div');
    input.classList.add("ds-multi-inputs__items_item__input");

    let actions = document.createElement('div');
    actions.classList.add("ds-multi-inputs__items_item__actions");

    let minus = document.createElement('button');
    minus.innerText = "minus";
    minus.onclick = function(event){
        event.preventDefault();
        item.remove();
    }

    let plus = document.createElement('button');
    plus.innerText = "plus";
    plus.onclick = function(event) {
        event.preventDefault();
        item.after(createItem(el));
    }

    actions.append(minus);
    actions.append(plus);

    input.append(el.cloneNode(true));

    item.append(input);
    item.append(actions);

    return item;
}

Element.prototype.ds_multi_inputs = function(params) {
    createDsMultiInputs(this, params);
}

NodeList.prototype.ds_multi_inputs = function(params) {
    this.forEach((el) => createDsMultiInputs(el, params))
}