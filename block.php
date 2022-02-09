<?php


class Download_Delay_Block
{
    private $assets;
    private $plugin_dir_path;

    public function __construct()
    {
        $this->plugin_dir_path = plugin_dir_path( __FILE__ );
        $this->assets = include($this->plugin_dir_path . "build/block.asset.php");
        add_action( 'enqueue_block_editor_assets', array($this, 'enqueue_gutenberg_scripts') );
    }

    public function enqueue_gutenberg_scripts() {
        wp_enqueue_script(
            'seocherry-block-fdd-extend',
            plugins_url( '/build/block.js', __FILE__ ), 
            $this->assets['dependencies'],
            $this->assets['version']
        );
    
        wp_localize_script( 'seocherry-block-fdd-extend', 'fdd_options', array(
            'delay_time'                => get_option('dload_delay_time'),
            'page_redirect'             => json_encode(filter_var(get_option('dload_delay_enable_redirect'), FILTER_VALIDATE_BOOLEAN)),
            'is_premium'                => json_encode(fdd_fs()->is_premium()),
            'upgrade_url'               => fdd_fs()->get_upgrade_url(),
        ) );
    
        wp_set_script_translations('seocherry-block-fdd-extend', 'dload-delay-td', $this->plugin_dir_path . 'languages/' );
    }
    
}