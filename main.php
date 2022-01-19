<?php
/*
 * Plugin Name: Files Download Delay
 * Description: Wraps your download links with countdown timer and allows you to add custom text, html or shortcode to output subscription form, ads, related content, share buttons, etc. 
 * Version: 1.0
 * Author: SeoCherry.ru
 * Author URI: https://seocherry.ru/
 * Requires at least: 5.5
 * Requires PHP:      7.2
 * Text Domain: dload-delay-td
 * License: GPLv2 or later
*/

// Freemius SDK
if ( ! function_exists( 'fdd_fs' ) ) {
    // Create a helper function for easy SDK access.
    function fdd_fs() {
        global $fdd_fs;

        if ( ! isset( $fdd_fs ) ) {
            // Include Freemius SDK.
            require_once dirname(__FILE__) . '/freemius/start.php';

            $fdd_fs = fs_dynamic_init( array(
                'id'                  => '9007',
                'slug'                => 'files-download-delay',
                'type'                => 'plugin',
                'public_key'          => 'pk_fb3fcc88d5099548fc6000c47a251',
                'is_premium'          => true,
                'premium_suffix'      => 'Pro',
                // If your plugin is a serviceware, set this option to false.
                'has_premium_version' => true,
                'has_addons'          => false,
                'has_paid_plans'      => true,
                'menu'                => array(
                    'slug'           => 'files-download-delay',
                    'contact'        => false,
                    'support'        => false,
                    'parent'         => array(
                        'slug' => 'options-general.php',
                    ),
                ),
                // Set the SDK to work in a sandbox mode (for development & testing).
                // IMPORTANT: MAKE SURE TO REMOVE SECRET KEY BEFORE DEPLOYMENT.
                'secret_key'          => 'sk_6aY%{--XZid9;kp+5tEq(2wP[w2;m',
            ) );
        }

        return $fdd_fs;
    }

    // Init Freemius.
    fdd_fs();
    // Signal that SDK was initiated.
    do_action( 'fdd_fs_loaded' );
}

// Plugin's libs
include_once(__DIR__."/admin.php");
include_once(__DIR__."/front.php");
include_once(__DIR__."/redirect.php");
include_once(__DIR__."/remove.php");

// UI Initialization
$dd_plugin_data = get_file_data(__FILE__, array('version' => 'Version'), 'plugin');

$dd_admin_area = new Download_Delay_Admin();
$dd_admin_area->loader($dd_plugin_data['version']);

$dd_front = new Download_Delay_Front();
$dd_front->loader($dd_plugin_data['version']);

// Redirection
Download_Delay_Redirect::enable();
register_activation_hook(__FILE__, array('Download_Delay_Redirect', 'flush'));


// Uninstall
register_uninstall_hook(__FILE__, array('Download_Delay_Remove', 'uninstall'));
fdd_fs()->add_action('after_uninstall', 'fdd_fs_uninstall_cleanup');