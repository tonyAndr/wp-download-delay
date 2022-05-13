<?php

class DownloadDelayPost
{
    private $assets;
    private $plugin_dir_path;
    public function __construct () {
        $this->plugin_dir_path = plugin_dir_path(__FILE__);
        $this->assets = include($this->plugin_dir_path . "build/post.asset.php");

        add_action('wp_head', array($this, 'send_options_frontend'));
        add_action('wp_enqueue_scripts', array($this, 'dloaddelay_scripts'), 9999);
        add_shortcode('fddwrap', array($this,'fdd_shortcode'));
    }
    // Load css and front-end js

    public function dloaddelay_scripts() {
        wp_register_style(
            'dloaddelay-style',
            plugins_url('/build/post.css', __FILE__),
            '',
            $this->assets['version']
        );
        wp_enqueue_style('dloaddelay-style');
        $this->add_customized_styles('dloaddelay-style');

        wp_register_script(
            'dloaddelay-script',
            plugins_url('/build/post.js', __FILE__),
            array( 'jquery' ),
            $this->assets['version']
        );
        wp_enqueue_script('dloaddelay-script');
    }

    public function add_customized_styles($style_name = false) {
        $normal_bg = get_option('dload_delay_normal_bg');
        $success_bg = get_option('dload_delay_success_bg');
        $failed_bg = get_option('dload_delay_failed_bg');
        $shadow = filter_var(get_option('dload_delay_drop_shadow'), FILTER_VALIDATE_BOOLEAN);
        $border_radius = get_option('dload_delay_border_radius');
        $layout = get_option('dload_delay_layout');
        $column_width = filter_var(get_option('dload_delay_column_width'), FILTER_VALIDATE_INT);

        $custom_styles = "
        .dload-timer-container .bgcolor {background: ".$normal_bg.";}
        .dload-timer-container .bgcolor_success {background: ".$success_bg.";}
        .dload-timer-container .bgcolor_failed {background: ".$failed_bg.";}
        ";
        if (!$style_name) {
            return $custom_styles; // return value if called from redirect-page
        }
        if ($layout === 'row') {
            $custom_styles .= "

            .dload-timer-container .timer-container {
                border-top-left-radius: ".$border_radius."px;
                border-bottom-left-radius: ".$border_radius."px;
                border-top-right-radius: 0;
                flex-grow: 0;
                flex-shrink: 0;
                flex-basis: $column_width%;
            }
            .dload-timer-container .info-container {
                flex-grow: 0;
                flex-shrink: 0;
                flex-basis: ".(100-$column_width)."%;
            }
        ";
        } else {
            $custom_styles .= "

            .dload-timer-container .timer-container {
                border-top-left-radius: ".$border_radius."px;
                border-top-right-radius: ".$border_radius."px;
                border-bottom-left-radius: 0;
            }
        ";
        }

        $custom_styles .= "
        .dload-timer-container {
            flex-direction: $layout;
            border-radius: ".$border_radius."px;
        ";
        if (!$shadow) {
            $custom_styles .= "
                box-shadow: none;
            ";
        }
        $custom_styles .= "
            }
        ";

        wp_add_inline_style($style_name, $custom_styles); 
    }


    public function send_options_frontend() {
        $options = array(
            // "wait_text" => get_option('dload_delay_template'),
            "download_template" => $this->read_html_template(''),
            "success_template" => $this->read_html_template('_success'),
            "failed_template" => $this->read_html_template('_failed'),
            "dload_newtab" => false,
            "delay_time" => get_option('dload_delay_time'),
            "extensions" => get_option('dload_delay_extensions'),
            "autowrap" => filter_var(get_option('dload_delay_autowrap'), FILTER_VALIDATE_BOOLEAN),
            "page_redirect" => filter_var(get_option('dload_delay_enable_redirect'), FILTER_VALIDATE_BOOLEAN),
            "download_class" => get_option('dload_delay_download_class'),

        );

        ?>
        <script>
            var dloaddelay_options = <?php echo json_encode($options)  ?>;
        </script>
        <?php
    }

    public function read_html_template($modifier) {
        $template = file_get_contents('template.html', FILE_USE_INCLUDE_PATH);
        $info_text = json_decode(get_option('dload_delay'.$modifier.'_info_text'));
        $cd_text = json_decode(get_option('dload_delay'.$modifier.'_cd_text'));
        $info_text = do_shortcode($info_text);
        $cd_text = do_shortcode($cd_text);
        $template = str_replace("[cd-text]", $cd_text, $template);
        $template = str_replace("[info-text]", $info_text, $template);
        $template = str_replace("[bg-modifier]", $modifier, $template);
        return $template;
    }

    public function fdd_shortcode($atts , $content = null) {
        $a = shortcode_atts( array(
            'delay_time' => get_option('dload_delay_time'),
        ), $atts );
        $template = '<span class="dloaddelay-link-wrapper" data-time="'.$a['delay_time'].'">'.$content.'</span>';
        return $template;
    }
}

