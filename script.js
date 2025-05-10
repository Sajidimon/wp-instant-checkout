jQuery(document).ready(function($){
    $('.buy-now-button').on('click', function(e){
        e.preventDefault();
        let product_id = $(this).data('product_id');

        $.post(wc_buy_now_ajax.ajax_url, {
            action: 'wc_buy_now',
            product_id: product_id
        }, function(response){
            if(response.success){
                $('#wc-buy-now-modal').fadeIn();
            }
        });
    });

    $('.close-modal, .modal-overlay').on('click', function(){
        $('#wc-buy-now-modal').fadeOut();
    });
});

$(document).ready(function(){
    $('.buy-now-button').click(function(){
        $('body').css('overflow', 'hidden');
    });

    $('.close-modal, .modal-overlay').click(function(){
        $('body').css('overflow', 'auto');
    });
});

