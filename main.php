<?php
/*
 * Plugin Name: Files Download Delay
 * Plugin URI: https://fdd.tonyandr.com
 * Description: Wraps your download links with countdown timer and allows you to add the custom text, html or shortcode to output subscription form, ads, related content, share buttons, etc. 
 * Version: 1.0.7
 * Author: tonyandr.com
 * Author URI: https://fdd.tonyandr.com/
 * Requires at least: 5.5
 * Requires PHP:      7.2
 * Text Domain: dload-delay-td
 * Domain Path: /languages/
 * License: GPLv2 or later
*/

// Plugin's libs
include_once(__DIR__."/admin.php");
include_once(__DIR__."/post.php");
include_once(__DIR__."/block.php");
include_once(__DIR__."/redirect.php");
include_once(__DIR__."/remove.php");

// UI Initialization
$dd_plugin_data = get_file_data(__FILE__, array('version' => 'Version'), 'plugin');

$dd_admin_area = new DownloadDelayAdmin($dd_plugin_data['version']);
$dd_front = new DownloadDelayPost();
$dd_block = new DownloadDelayBlock();

// Link to settings
add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'fdd_add_action_links', 9999 );
 
function fdd_add_action_links ( $actions ) {
   $mylinks = '<a href="' . admin_url( 'options-general.php?page=files-download-delay' ) . '">'.__('Settings').'</a>';
   array_unshift( $actions, $mylinks );
   return $actions;
}

// Redirection
DownloadDelayRedirect::enable();
register_activation_hook(__FILE__, array('Download_Delay_Redirect', 'flush'));

// Uninstall
register_uninstall_hook(__FILE__, array('Download_Delay_Remove', 'uninstall'));
// fdd_fs()->add_action('after_uninstall', 'fdd_fs_uninstall_cleanup');
