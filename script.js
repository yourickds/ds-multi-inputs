document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('#ffff')
        .ds_multi_inputs({
            min: 1,
            max: 5
        });

    document.querySelectorAll('#ss')
        .ds_multi_inputs({
            min: 2,
            max: 3
        });

    document.querySelectorAll('#pppp')
        .ds_multi_inputs({
            min: 5,
            max: 8
        });
});