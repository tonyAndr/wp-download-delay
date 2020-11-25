<?php
/*
Plugin Name: Documents Download Delay
Plugin URI: http://seocherry.ru/
Description: Загрузка файлов с задержкой
Version: 1.0
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
	add_action( 'admin_init', 'register_dloaddelay_settings' );
}

function register_dloaddelay_settings() {
	//register our settings
	register_setting( 'dload-delay', 'delay_time' );
	register_setting( 'dload-delay', 'dloaddelay_text' );
	register_setting( 'dload-delay', 'dload_newtab' );

	if ( get_option( 'delay_time' ) === false ) {
		add_option( 'delay_time', '10' );
		
	} 	
	if ( get_option( 'dloaddelay_text' ) === false ) {
		add_option( 'dloaddelay_text', '<div class="dload-timer-container">
						<div class="left-timer">
							<div class="dload-timer-info"><p>Скачивание начнется через:</p></div>
							<div class="dload-timer-cd"></div>
						</div>
						<div class="right-info">
							<ol><li>Система подготавливает ваш файл, <b>загрузка скоро начнется</b></li><li>Ниже можно вставить кнопки лайков или что-то еще</li></ol>
						</div>
					</div>' );
		
	}  	

	if ( get_option( 'dload_newtab' ) === false ) {
		add_option( 'dload_newtab', "false" );
	}
	
}

function dloaddelay_options_page(){
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'Не достаточно прав для доступа к странице.' ) );
	}
	?>
	<div class="wrap"><h1>Настройки задержки переход по ссылке</h1>
		<hr>
<div class="dloaddelay-settings-wrap">
	<form method="post" action="options.php">

	<?php settings_fields( 'dload-delay' ); ?>
    <?php do_settings_sections( 'dload-delay' ); ?>
    <table class="form-table">
        <tr valign="top">
        <th scope="row"><label for="delay_time">Время в секундах</label></th>
        <td><input type="number" min="0" name="delay_time" value="<?php echo esc_attr( get_option('delay_time') ); ?>" /></td>
        </tr>        
        <tr valign="top">
        <th scope="row"><label for="delay_time">Текст ожидания</label></th>
            <td><textarea cols="150" rows="20" name="dloaddelay_text"><?php echo esc_attr( get_option('dloaddelay_text') ); ?>"</textarea></td>
        </tr>
        <tr valign="top">
        <th scope="row"><label for="dload_newtab">Открывать ссылки на новой вкладке? (браузеры будут блокировать и предлагать разрешить действие)</label></th>
        <td>		<select name="dload_newtab" id="dload_newtab" >
		<option <?php if(esc_attr( get_option('dload_newtab') ) == 'false') { echo 'selected="selected"'; } ?> value="false">Нет</option>
		<option <?php if(esc_attr( get_option('dload_newtab') ) == 'true') { echo 'selected="selected"'; } ?> value="true">Да</option>
		</select> </td>
        </tr>
         
    </table>
    
    <?php submit_button(); ?>

	</form>
	</div></div>
	<?php

}