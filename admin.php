<?php

class DownloadDelayAdmin
{
    public $version = 0;

    public function __construct($version) {
        $this->version = $version;
        $this->plugin_dir_path = plugin_dir_path( __FILE__ );
        add_action('init', array($this, 'register_dloaddelay_settings'));
        add_action('init', array($this, 'php_textdomain_translation'));
        add_action('admin_menu', array($this, 'dloaddelay_option_menu'), 1);
        add_action('admin_enqueue_scripts', array($this, 'seocherry_dloaddelay_assets'), 10);
        add_action('admin_enqueue_scripts', array($this, 'js_textdomain_translation'), 100);
        add_action('wp_ajax_ddlay_restore_defaults', array($this, 'restore_defaults'));
    }
 
    public function php_textdomain_translation() {
        load_plugin_textdomain('dload-delay-td', false, dirname(plugin_basename( __FILE__ )) . '/languages'); 
    }

    public function js_textdomain_translation() {
        $path = plugin_dir_path(__FILE__);
        $res = wp_set_script_translations('seocherry-dload-delay-script', 'dload-delay-td', $path . 'languages/');
        return $res;
    }
    
    public function dloaddelay_option_menu() {
        add_options_page(
            'Files Download Delay', 
            'Files Download Delay', 
            'manage_options', 
            'files-download-delay', 
            array($this,'dloaddelay_options_page')
        );
    }

    public function def_val($key = null) {
        $defaults = array(
            'dload_delay_time' => 10,
            'dload_delay_extensions' => array('pdf','doc','docx','xls','xlsx','rtf','txt','pptx'),
            'dload_delay_info_text' => 'We are preparing your file, meanwhile you can click on this awesome ad below.',
            'dload_delay_cd_text' => 'Download will start soon...',
            'dload_delay_success_info_text' => 'Check your downloads folder.',
            'dload_delay_success_cd_text' => 'Your file is on the way to you!',
            'dload_delay_failed_info_text' => 'File not found',
            'dload_delay_failed_cd_text' => 'Oops...',
            'dload_delay_autowrap' => 0,
            'dload_delay_drop_shadow' => 1,
            'dload_delay_border_radius' => 3,
            'dload_delay_layout' => 'column',
            'dload_delay_column_width' => 30,
            'dload_delay_normal_bg' => '#4397ff',
            'dload_delay_success_bg' => '#39b400',
            'dload_delay_failed_bg' => '#ff4625',
            'dload_delay_download_class' => '',
            'dload_delay_enable_redirect' => 0
        );
        if ($key !== null) {
            return $defaults[$key];
        }
        return $defaults;
    }
    
    public function register_dloaddelay_settings() {
        //register our settings
        register_setting( 
            'dload-delay', 
            'dload_delay_time',
            array(
                'type'         => 'integer',
                'show_in_rest' => true,
                'default'      => $this->def_val('dload_delay_time'),
                'sanitize_callback' => 'absint'
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_extensions',
            array(
                'type'         => 'array',
                'show_in_rest' => array(
                    'schema' => array(
                        'type' => 'array',
                        'items' => array(
                            'type' => 'string'
                        )
                    )
                ),
                'default'      => $this->def_val('dload_delay_extensions'),
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_info_text',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_info_text'),
                'sanitize_callback' => array($this, 'html_sanitizer')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_cd_text',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_cd_text'),
                'sanitize_callback' => array($this, 'html_sanitizer')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_success_info_text',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_success_info_text'),
                'sanitize_callback' => array($this, 'html_sanitizer')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_success_cd_text',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_success_cd_text'),
                'sanitize_callback' => array($this, 'html_sanitizer')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_failed_info_text',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_failed_info_text'),
                'sanitize_callback' => array($this, 'html_sanitizer')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_failed_cd_text',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_failed_cd_text'),
                'sanitize_callback' => array($this, 'html_sanitizer')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_autowrap',
            array(
                'type'         => 'integer',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_autowrap')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_enable_redirect',
            array(
                'type'         => 'integer',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_enable_redirect')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_drop_shadow',
            array(
                'type'         => 'integer',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_drop_shadow')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_border_radius',
            array(
                'type'         => 'integer',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_border_radius')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_layout',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_layout')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_column_width',
            array(
                'type'         => 'integer',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_column_width')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_normal_bg',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_normal_bg')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_success_bg',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_success_bg')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_failed_bg',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_failed_bg')
            ) 
        );
        register_setting( 
            'dload-delay', 
            'dload_delay_download_class',
            array(
                'type'         => 'string',
                'show_in_rest' => true,
                'default' => $this->def_val('dload_delay_download_class')
            ) 
        );
    }

    public function html_sanitizer($input) {
        if (is_null($input)) {
            return false;
        } 
        return wp_json_encode($input);
    }
    
    // admin page content callback
    public function dloaddelay_options_page(){
        if ( !current_user_can( 'manage_options' ) )  {
            wp_die( __( 'You don\'t have permission to see this page.', 'dload-delay-td' ) );
        }
        ?>
        <div class="wrap ">
            <!-- Plugin settings go here -->
            <div id="seocherry-dload-delay-container"></div>
        </div>
        
        <?php
    }
    
    // admin page assets
    public function seocherry_dloaddelay_assets($hook) {
        if ($hook === "settings_page_files-download-delay") {
            wp_enqueue_script(
                'seocherry-dload-delay-script', 
                plugins_url( '/', __FILE__ ) . 'build/admin.js', 
                array('wp-api', 'wp-i18n', 'wp-components', 'wp-element', 'wp-notices'), 
                $this->version, 
                true
            );

            wp_localize_script(
                'seocherry-dload-delay-script',
                'dd_admin_vars',
                array(
                    'ajax_url'  => admin_url( 'admin-ajax.php' ),
                    'dd_security'   => wp_create_nonce( 'dd_security' ),
                    'plugins_url'   => plugins_url( '/', __FILE__ ),
                ) 
            );
            wp_enqueue_style(
                'seocherry-dload-delay-style', 
                plugins_url( '/', __FILE__ ) . 'build/admin.css', 
                array( 'wp-components' )
            );
        }
    }

    // restore defaults 
    public function restore_defaults() {
        check_admin_referer('dd_security', '_ajax_nonce');

        if (!current_user_can('manage_options')) {
            wp_die( __( 'You don\'t have permission to see this page.', 'dload-delay-td' ) );
        } 
        
        $defaults = $this->def_val();

        foreach ($defaults as $k => $v) {
            update_option($k, $v);
        }

        wp_send_json(["status" => "OK"]);
    }
    
}
