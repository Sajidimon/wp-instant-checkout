jQuery(document).ready(function($){
    $('.buy-now-button').on('click', function(e){
        e.preventDefault();
        let product_id = $(this).data('product_id');

        // Load the modal with full checkout and spinner inside the product section
        $('#wc-buy-now-modal').fadeIn();

        // Basic structure: form is ready, cart section shows loader
        let checkoutHTML = `
            <div class="close-modal">&times;</div>
            <form name="checkout" method="post" class="checkout woocommerce-checkout" action="/checkout/">
                <div id="order_review" class="woocommerce-checkout-review-order">
                    <div class="loading-spinner">Loading product…</div>
                </div>
                <!-- Billing Fields, Payment etc -->
                <div id="billing-fields">
                    ${doCheckoutFieldsHTML()} <!-- replace with your PHP-rendered static form if needed -->
                </div>
            </form>
        `;
        $('#wc-buy-now-modal .modal-content').html(checkoutHTML);

        // 🔁 Now fire AJAX to add product and load cart HTML
        $.post(wc_buy_now_ajax.ajax_url, {
            action: 'wc_buy_now',
            product_id: product_id
        }, function(response){
            if(response.success && response.data){
                $('#order_review').html(response.data);
            } else {
                $('#order_review').html('<p>Error loading product.</p>');
            }
        });
    });

    // Close modal
    $(document).on('click', '.close-modal, .modal-overlay', function(){
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

