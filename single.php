<?php


x_get_view(x_get_stack(), 'wp', 'single');

session_start();


$check_session = false;
if (isset($_SESSION['library_login_page_id']) && $_SESSION['library_login_page_id'] && @$_SESSION['library_code_name']) {
    $check_session = true;
}

$post = get_queried_object();

if (isset($post->post_type) && $post->post_type == 'aiovg_videos') {
    if (!$check_session) {
        $_SESSION['previous_page_url'] = get_the_permalink(get_the_ID());
        header("Location:" . home_url());
        die;
    }
    // $get_ip = 1;
    // $proxy_ports = array(80,81,8080,443,1080,6588,3128);
    // foreach($proxy_ports as $test_port) {
    // 	if(@fsockopen($_SERVER['REMOTE_ADDR'], $test_port, $errno, $errstr, 5)) {
    // 		$get_ip = 0;
    // 	}
    // }
    // if($get_ip == 0) {
    // 	if(get_post_meta( get_the_ID(), 'views', true )) {
    // 		$views = get_post_meta( get_the_ID(), 'views', true );
    // 		$views = $views + 1;
    // 	}
    // 	else {
    // 		$views = 0;
    // 	}
    // 	update_post_meta( get_the_ID(), 'activity_log_custom', rand());
    // 	//echo 'section3'.get_post_meta( get_the_ID(), 'activity_log_custom', true).'-head';
    // }

    $categoryFromURL = get_category_name_from_url();
    $arr_meta = array(
        array(
            "key" => "Story ID",
            "value" => get_the_ID()
        ),
        array(
            "key" => "Story Title",
            "value" => htmlspecialchars_decode(get_the_title())
        ),
        array(
            "key" => "Language",
            "value" => $categoryFromURL['text']
        ),
        array(
            "key" => "Type",
            "value" => $categoryFromURL['type']
        ),
    );

    $web_activity_id = add_web_activity(1062);
    add_web_activity_meta($web_activity_id, $arr_meta);
}




// =============================================================================
// SINGLE.PHP
// -----------------------------------------------------------------------------
// Handles output of individual posts.
//
// Content is output based on which Stack has been selected in the Customizer.
// To view and/or edit the markup of your Stack's posts, first go to "views"
// inside the "framework" subdirectory. Once inside, find your Stack's folder
// and look for a file called "wp-single.php," where you'll be able to find the
// appropriate output.
// =============================================================================



$library_code_name_check = 0;

$library_code_name_global = trim($_SESSION['library_code_name']);

$library_code_name_arr = [
    'Christchurch City Council',
    'City of Stirling',
    'Bellmore Memorial Library',
    'Helen Plum Memorial Public Library District',
    'San Luis Obispo Public Libraries',
    'Bethpage Public Library',
    'Mackay Regional Libraries',
    'City of Canterbury Bankstown',
    'Hewlett-Woodmere Public Library',
    'Hicksville Public Library',
    'Hillside Public Library',
    'Des Plaines Public Library',
    'Surrey Libraries',
    'Island Park Public Library',
    'Jericho Public Library',
    'Levittown Public Library',
    'Long Beach Public Library',
    'Lynbrook Public Library',
    'Manhasset Public Library',
    'Massapequa Public Library',
    'North Merrick Public Library',
    'Oyster Bay-East Norwich Public Library',
    'Port Washington Public Library',
    'Shelter Rock Public Library',
    'Syosset Public Library',
    'Uniondale Public Library',
    'City of Canada Bay',
    'San José Public Library',
    'Leitrim County Council Libraries',
    'State Library of Queensland',
    'Maribyrnong City Council',
    'DeForest Area Public Library',
    'Mitchell Shire Council',
    'Rogers Memorial Library',
    'City of Port Adelaide Enfield Libraries',
    'Traverse Area District Library',
    'Lane Libraries',
    'Cumberland City Council',
    'Gail Borden Public Library District',
    'Bloomfield Township Public Library',
    'High Point Public Library',
    'Grand Valley Public Library',
    'Catholic Education Diocese of Parramatta',
    'Mornington Peninsula Shire Library Service',
    'Milton Public Library',
];

foreach ($library_code_name_arr as $library_code_nam) {
    if ($library_code_name_global == $library_code_nam) {
        $library_code_name_check = 1;
    }
}







global $wpdb;
$wpdb->insert(
    $wpdb->prefix . 'wsal_occurrences',
    array(
        'site_id' => '1',
        'alert_id' => 1062,
        'created_on' => time(),
        'is_read' => 0,
        'is_migrated' => 0
    )
);
$eventID = $wpdb->insert_id;
$wpdb->insert(
    $wpdb->prefix . 'wsal_metadata',
    array(
        'occurrence_id' => $eventID,
        'name' => 'Object',
        'value' => 'post'
    )
);

$wpdb->insert(
    $wpdb->prefix . 'wsal_metadata',
    array(
        'occurrence_id' => $eventID,
        'name' => 'EventType',
        'value' => 'viewed'
    )
);


$wpdb->insert(
    $wpdb->prefix . 'wsal_metadata',
    array(
        'occurrence_id' => $eventID,
        'name' => 'UserAgent',
        'value' => $_SERVER['HTTP_USER_AGENT']
    )
);

$wpdb->insert(
    $wpdb->prefix . 'wsal_metadata',
    array(
        'occurrence_id' => $eventID,
        'name' => 'Barcode',
        'value' => $_SESSION['barCode']
    )
);

$wpdb->insert(
    $wpdb->prefix . 'wsal_metadata',
    array(
        'occurrence_id' => $eventID,
        'name' => 'LibraryName',
        'value' => $_SESSION['library_code_name']
    )
);


$wpdb->insert(
    $wpdb->prefix . 'wsal_metadata',
    array(
        'occurrence_id' => $eventID,
        'name' => 'Region',
        'value' => $_SESSION['library_region_name']
    )
);

$wpdb->insert(
    $wpdb->prefix . 'wsal_metadata',
    array(
        'occurrence_id' => $eventID,
        'name' => 'PostID',
        'value' => get_the_ID()
    )
);


$wpdb->insert(
    $wpdb->prefix . 'wsal_metadata',
    array(
        'occurrence_id' => $eventID,
        'name' => 'PostTitle',
        'value' => get_the_title()
    )
);


$wpdb->insert(
    $wpdb->prefix . 'wsal_metadata',
    array(
        'occurrence_id' => $eventID,
        'name' => 'PostURL',
        'value' => ' ' . get_the_permalink()
    )
);




$wpdb->insert(
    $wpdb->prefix . 'wsal_metadata',
    array(
        'occurrence_id' => $eventID,
        'name' => 'ClientIP',
        'value' => getIPAddress(),
    )
);
