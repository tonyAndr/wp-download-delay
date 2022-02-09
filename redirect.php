<?php

class Download_Delay_Redirect
{
    public static function enable() {        
        // redirect for file downloads
        add_filter( 'generate_rewrite_rules', function ( $wp_rewrite ){
            $wp_rewrite->rules = array_merge(
                ['download/([\d\w]+)/?$' => 'index.php?url_id=$matches[1]'],
                $wp_rewrite->rules
            );
        } );
        add_filter( 'query_vars', function( $query_vars ){
            $query_vars[] = 'url_id';
            return $query_vars;
        } );
        add_action( 'template_redirect', function(){
            $url_id = get_query_var( 'url_id' );
            if ( $url_id ) {

                include plugin_dir_path( __FILE__ ) . 'redirect-page.php';
                die;
            }
        } );
    }

    public static function flush() {
        flush_rewrite_rules();
    }

    // save url to browsers localStorage using url_id. then restore it after page loads
}