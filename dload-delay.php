<?php
/*
Plugin Name: Documents Download Delay
Plugin URI: http://seocherry.ru/
Description: Загрузка файлов с задержкой
Version: 2.0
Author: Антон SeoCherry.ru
Author URI: http://seocherry.ru/
Text Domain: dload-delay
*/

$version = 0;

function get_dloaddelay_version() {
    $plugin_data = get_file_data(__FILE__, array('version' => 'Version'), 'plugin');
    $version = $plugin_data['version'];

    return $plugin_data['version'];
  } 

// Load css and front-end js

function dloaddelay_scripts() {
    wp_register_style( 'dloaddelay-style', plugins_url( '/css/dloaddelay.css', __FILE__ ), '', get_dloaddelay_version() );

    wp_enqueue_style ('dloaddelay-style');

    wp_register_script( 'dloaddelay-script', plugins_url( '/js/dloaddelay-front.js', __FILE__ ), array( 'jquery' ), get_dloaddelay_version() );

    wp_enqueue_script( 'dloaddelay-script' );
}
add_action ( 'wp_head', 'send_options_frontend' );
add_action( 'wp_enqueue_scripts', 'dloaddelay_scripts' );

function send_options_frontend() {
    $options = array(
        "wait_text" => get_option('dloaddelay_text'),
        "dload_newtab" => get_option('dload_newtab'),
        "delay_time" => get_option('delay_time')
    );

    ?>
    <script>
        var dloaddelay_options = <?php echo json_encode($options)  ?>;
    </script>
    <?php
}


add_action('admin_menu', 'dloaddelay_option_menu', 1);
function dloaddelay_option_menu() {
	add_options_page('Задержка скачивания файлов', 'Загрузка с таймером', 'manage_options', 'dload-delay', 'dloaddelay_options_page');
	
}
add_action( 'init', 'register_dloaddelay_settings' );
function register_dloaddelay_settings() {
	//register our settings
	register_setting( 'dload-delay', 'dload_delay_time',
    array(
        'type'         => 'integer',
        'show_in_rest' => true,
        'default'      => 10,
    ) );
    register_setting( 'dload-delay', 'dload_delay_extensions',
    array(
        'type'         => 'array',
        'show_in_rest' => true,
        'default'      => array('pdf','doc','docx','xls','xlsx','rtf','txt','pptx'),
    ) );
	register_setting( 'dload-delay', 'dload_delay_template',
    array(
        'type'         => 'string',
        'show_in_rest' => true,
        'default' => '<div class="dload-timer-container">
        <div class="left-timer">
            <div class="dload-timer-info"><p>Скачивание начнется через:</p></div>
            <div class="dload-timer-cd"></div>
        </div>
        <div class="right-info">
            <ol><li>Система подготавливает ваш файл, <b>загрузка скоро начнется</b></li><li>Ниже можно вставить кнопки лайков или что-то еще</li></ol>
        </div>
    </div>'
    ) );
	
}

// admin page content callback
function dloaddelay_options_page(){
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'Не достаточно прав для доступа к странице.' ) );
	}
	?>
	<div id="seocherry-dload-delay-container"></div>
	<?php
}

// admin page assets
function seocherry_dloaddelay_assets() {
	wp_enqueue_script( 'seocherry-dload-delay-script', plugins_url( '/', __FILE__ ) . 'build/build.js', array( 'wp-api', 'wp-i18n', 'wp-components', 'wp-element', 'wp-notices' ), get_dloaddelay_version(), true );
	wp_enqueue_style( 'seocherry-dload-delay-style', plugins_url( '/', __FILE__ ) . 'build/build.css', array( 'wp-components' ) );
}

add_action('admin_enqueue_scripts', 'seocherry_dloaddelay_assets');