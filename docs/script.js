document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.ds-multi-inputs')
        .ds_multi_inputs({
            buttons: {
                removeItem: {
                    className: "btn btn-danger",
                    text: "Удалить элемент"
                },
                createItem: {
                    className: "btn btn-success",
                    text: "Добавить элемент"
                }
            },
            afterInit: function(ids) {
                console.log(ids);
            },
            afterCreateItem: function(el, id) {
                console.log(id)
            }
        });

    document.querySelectorAll('.select2')
        .ds_multi_inputs({
            buttons: {
                removeItem: {
                    className: "btn btn-danger"
                },
                createItem: {
                    className: "btn btn-success"
                }
            },
            afterInit: function() {
                $('.select2').select2({
                    theme: "bootstrap-5"
                });
            },
            afterCreateItem: function(el, template) {
                console.log(template);
                // el - элемент который был создан
                $('.select2').select2({
                    theme: "bootstrap-5"
                });
            }
        });

    document.querySelectorAll('.ds-multi-inputs-template')
        .ds_multi_inputs({
            template: '<div><input class="form-control" type="text" placeholder="Test Template" name="test[:id:]"/></div>',
            buttons: {
                removeItem: {
                    className: "btn btn-danger"
                },
                createItem: {
                    className: "btn btn-success"
                }
            }
        });
});