<?php
    $url_id = get_query_var( 'url_id' );
    // get cd/info texts
    // $info_text = get_option('dload_delay_info_text');
    // $cd_text = get_option('dload_delay_cd_text');
    // $success_info_text = get_option('dload_delay_success_info_text');
    // $success_cd_text = get_option('dload_delay_success_cd_text');
    // $failed_info_text = get_option('dload_delay_failed_info_text');
    // $failed_cd_text = get_option('dload_delay_failed_cd_text');
    $delay_time = get_option('dload_delay_time');

    include_once(__DIR__."/front.php");
    $fdd_front = new Download_Delay_Front();
    $template_wait = $fdd_front->read_html_template('');
    $template_success = $fdd_front->read_html_template('_success');
    $template_failed = $fdd_front->read_html_template('_failed');
    $fdd_custom_styles = $fdd_front->add_customized_styles();
    
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <style><?php require_once(plugin_dir_path( __FILE__ ) . 'css/redirect-template.css'); ?></style>
    <style><?= $fdd_custom_styles ?></style>
    <title>Download Redirect...</title>
	
</head>
<body>
    <div id="main_content_container" >

    </div>
    
    
    <script  type="text/javascript">
        <?php 
            $js_vars = "
                const fdd_vars = {
                    url_id: '$url_id',
                    template_wait: ". json_encode($template_wait) . ",
                    template_success: ". json_encode($template_success) . ",
                    template_failed: ". json_encode($template_failed) . ",
                    delay_time: $delay_time,
                };
            ";
            echo $js_vars;
        ?>
        <?php require_once(plugin_dir_path( __FILE__ ) . 'js/redirect.js'); ?>
    </script>
</body>
</html>