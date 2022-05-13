<?php
    $url_id = get_query_var('url_id');
    $delay_time = get_option('dload_delay_time');

    include_once(__DIR__ . "/post.php");
    $fdd_front = new DownloadDelayPost();
    $template_wait = $fdd_front->read_html_template('');
    $template_success = $fdd_front->read_html_template('_success');
    $template_failed = $fdd_front->read_html_template('_failed');
    $fdd_custom_styles = $fdd_front->add_customized_styles();
    $fdd_vars = [
        "url_id" => $url_id,
        "template_wait" => $template_wait,
        "template_success" => $template_success,
        "template_failed" => $template_failed,
        "delay_time" => $delay_time,
    ];
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <style>
        <?php require_once(plugin_dir_path(__FILE__) . 'build/redirect.css'); ?>
    </style>
    <style>
        <?php echo wp_filter_nohtml_kses($fdd_custom_styles); ?>
    </style>
    <title>Download Redirect...</title>

</head>

<body>
    <div id="main_content_container">

    </div>

    <script type="text/javascript">
        const fdd_vars = <?php echo wp_json_encode($fdd_vars); ?>;
        <?php require_once(plugin_dir_path(__FILE__) . 'build/redirect.js'); ?>
    </script>
</body>

</html>