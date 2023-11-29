 <link rel="canonical">
 <?php

	// =============================================================================
	// HEADER.PHP
	// -----------------------------------------------------------------------------
	// The site header.
	// =============================================================================

	header("X-Robots-Tag: noindex, nofollow", true);

	if (is_user_logged_in()) {
		if (!isset($_SESSION['check_login_user'])) {

			$user_info = get_userdata(get_current_user_id());

			$str = $user_info->user_login;

			$arr1 = str_split($str);
			$username = "";
			$ctr = 0;
			foreach ($arr1 as $arr) {
				if ($ctr < 3) {
					$username .= $arr;
				} else {
					$username .= "*";
				}
				$ctr++;
				if ($ctr == 8) {
					break;
				}
			}

			$n = 8 - $ctr;

			for ($i = 0; $i < $n; $i++) {
				$username .= "*";
			}

			$user_access = get_user_meta(get_current_user_id(), '_ca_level', false);
			$ctr = 0;
			$content = "";
			foreach ($user_access as $value) {
				$post_data = get_post($value);
				if ($ctr == 0) {
					$content .= $post_data->post_title;
				} else {
					$content .= ', ' . $post_data->post_title;
				}
				$ctr++;
			}


			$_SESSION['check_login_user'] = true;


			global $wpdb;
			$wpdb->insert(
				$wpdb->prefix . 'wsal_occurrences',
				array(
					'site_id' => '1',
					'alert_id' => 920,
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
					'value' => 'user'
				)
			);

			$wpdb->insert(
				$wpdb->prefix . 'wsal_metadata',
				array(
					'occurrence_id' => $eventID,
					'name' => 'EventType',
					'value' => 'login'
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
					'name' => 'DashboardURL',
					'value' => ' ' . get_the_permalink()
				)
			);

			$wpdb->insert(
				$wpdb->prefix . 'wsal_metadata',
				array(
					'occurrence_id' => $eventID,
					'name' => 'DashboardTitle',
					'value' => ' ' . get_the_title()
				)
			);

			$wpdb->insert(
				$wpdb->prefix . 'wsal_metadata',
				array(
					'occurrence_id' => $eventID,
					'name' => 'Username',
					'value' => ' ' . $username
				)
			);

			$wpdb->insert(
				$wpdb->prefix . 'wsal_metadata',
				array(
					'occurrence_id' => $eventID,
					'name' => 'UserAccess',
					'value' => ' ' . $content
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
		}
	} else {
		if (isset($_SESSION['check_login_user'])) {
			unset($_SESSION['check_login_user']);
		}
	}


	session_start();


	$a = get_the_title();
	$str = strtoupper($a);
	if (strpos($str, 'LOGIN') !== false  || is_front_page()) {

		$check_session = false;
		if (isset($_SESSION['library_login_page_id']) && $_SESSION['library_login_page_id'] && @$_SESSION['library_code_name']) {
			$check_session = true;
		}

		if ($check_session) {
			header("Location: https://lote4kids.com/member-home");
		}
	}

	x_get_view('header', 'base');
