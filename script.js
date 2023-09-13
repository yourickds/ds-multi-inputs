document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.ds-multi-inputs')
        .ds_multi_inputs();

    document.querySelectorAll('.select2')
        .ds_multi_inputs({
            afterInit: function() {
                $('.select2').select2();
            },
            afterCreateItem: function(el) {
                // el - элемент который был создан
                $('.select2').select2();
            }
        });
});