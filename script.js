document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[data-action="ds-multi-inputs"]')
        .ds_multi_inputs({
            min: 2
        });
});