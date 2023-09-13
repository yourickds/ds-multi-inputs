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
            afterCreateItem: function(el) {
                // el - элемент который был создан
                $('.select2').select2({
                    theme: "bootstrap-5"
                });
            }
        });
});