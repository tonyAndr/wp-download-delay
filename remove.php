<?php

class DownloadDelayRemove
{
    public static function uninstall() {
        global $wpdb;

        $plugin_options = $wpdb->get_results( "SELECT option_name FROM $wpdb->options WHERE option_name LIKE 'dload_delay_%'" );

        foreach( $plugin_options as $option ) {
            delete_option( $option->option_name );
        }
    }
}