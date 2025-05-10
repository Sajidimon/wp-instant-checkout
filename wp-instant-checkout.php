<?php

/**
 * Plugin Name: WooCommerce Instant Checkout
 * Description: Adds a Buy Now button on single product pages which opens the checkout in a popup/modal.
 * Version: 1.0
 * Author: WPwiki Team
 */

if (! defined('ABSPATH')) exit;

class WC_Buy_Now_Popup
{
    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_action('woocommerce_after_add_to_cart_button', [$this, 'add_buy_now_button']);
        add_action('wp_footer', [$this, 'add_checkout_modal']);
        add_action('wp_ajax_wc_buy_now', [$this, 'handle_buy_now']);
        add_action('wp_ajax_nopriv_wc_buy_now', [$this, 'handle_buy_now']);
    }


    public function enqueue_scripts()
    {
        wp_enqueue_style('wc-buy-now-style', plugin_dir_url(__FILE__) . 'style.css');
        wp_enqueue_script('wc-buy-now-js', plugin_dir_url(__FILE__) . 'script.js', ['jquery'], null, true);
        wp_localize_script('wc-buy-now-js', 'wc_buy_now_ajax', [
            'ajax_url' => admin_url('admin-ajax.php'),
        ]);
    }

    public function add_buy_now_button()
    {
        global $product;
        echo '<button class="button buy-now-button" data-product_id="' . esc_attr($product->get_id()) . '">Buy Now</button>';
    }

    public function add_checkout_modal()
    {
?>
        <div id="wc-buy-now-modal" style="display:none;">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div id="checkout-content">
                    <?php echo do_shortcode('[woocommerce_checkout]'); ?>
                </div>
            </div>
        </div>
<?php
    }

    public function handle_buy_now()
    {
        if (isset($_POST['product_id'])) {
            WC()->cart->empty_cart();
            WC()->cart->add_to_cart(intval($_POST['product_id']));
            wp_send_json_success();
        }
        wp_send_json_error();
    }
}

new WC_Buy_Now_Popup();
