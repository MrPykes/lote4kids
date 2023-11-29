<?php

// =============================================================================
// 404.PHP
// -----------------------------------------------------------------------------
// Handles errors when pages do not exist.
//
// Content is output based on which Stack has been selected in the Customizer.
// To view and/or edit the markup of your Stack's index, first go to "views"
// inside the "framework" subdirectory. Once inside, find your Stack's folder
// and look for a file called "wp-404.php," where you'll be able to find the
// appropriate output.
// =============================================================================

function url()
{
	return sprintf(
		"%s://%s%s",
		isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
		$_SERVER['SERVER_NAME'],
		$_SERVER['REQUEST_URI']
	);
}

if (isset($_SESSION['library_code_name'])) {
	$url = url();
	$library_code_name = $_SESSION['library_code_name'];
	$library_region_name = $_SESSION['library_region_name'];
	$barCode = $_SESSION['barCode'];
} else {
	$url = url();
	$library_code_name = "N/A";
	$library_region_name = "N/A";
	$barCode = "N/A";
}

// global $wpdb;
// $wpdb->insert(
// $wpdb->prefix.'wsal_occurrences',
// array(  
// 'site_id' => '1',
// 'alert_id' => 930,
// 'created_on' => time(),  
// 'is_read' => 0,
// 'is_migrated' => 0
// )
// );
// $eventID = $wpdb->insert_id;
// $wpdb->insert(
// $wpdb->prefix.'wsal_metadata',
// array(  
// 'occurrence_id' => $eventID,        
// 'name' => 'Object',
// 'value' => 'library'
// )
// );

// $wpdb->insert(
// $wpdb->prefix.'wsal_metadata',
// array(  
// 'occurrence_id' => $eventID,        
// 'name' => 'EventType',
// 'value' => 'viewed'
// )
// );


// $wpdb->insert(
// $wpdb->prefix.'wsal_metadata',
// array(  
// 'occurrence_id' => $eventID,        
// 'name' => 'UserAgent',
// 'value' => $_SERVER['HTTP_USER_AGENT']  
// )
// );  

// $wpdb->insert(
// $wpdb->prefix.'wsal_metadata',
// array(  
// 'occurrence_id' => $eventID,        
// 'name' =>'LibraryURL',    
// 'value' => $url
// )
// );  

// $wpdb->insert(
// $wpdb->prefix.'wsal_metadata',
// array(  
// 'occurrence_id' => $eventID,        
// 'name' =>'LibraryName',  
// 'value' => ' '.$library_code_name
// )
// );

// $wpdb->insert(
// $wpdb->prefix.'wsal_metadata',
// array(  
// 'occurrence_id' => $eventID,        
// 'name' =>'Region',  
// 'value' => ' '.$library_region_name
// )
// );

// $wpdb->insert(
// $wpdb->prefix.'wsal_metadata',
// array(  
// 'occurrence_id' => $eventID,        
// 'name' =>'Barcode',  
// 'value' => ' '.$barCode
// )
// );

// $wpdb->insert(
// $wpdb->prefix.'wsal_metadata',
// array(  
// 'occurrence_id' => $eventID,        
// 'name' => 'ClientIP',
// 'value' => getIPAddress(),
// )
// ); 


x_get_view(x_get_stack(), 'wp', '404');
