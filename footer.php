<div style="display:none" class="page-url"><?php echo get_the_permalink(); ?></div>
<div style="display:none" class="page-id"><?php echo get_the_ID(); ?></div>
<div style="display:none" class="page-title"><?php echo get_the_title(); ?></div>

<?php

if (get_field('library_page', get_the_ID()) == 8547) {
	$_SESSION['library_login_nonce'] = wp_create_nonce('library_login_nonce');
} else {
	unset($_SESSION['library_login_nonce']);
}


if (isset($_SESSION['previous_page_url']) && ($_SESSION['previous_page_url'] == get_the_permalink(get_the_ID()))) {
	//echo '<div style="display: none;" class="gen-123">'.$_SESSION['previous_page_url'].'</div>';
	unset($_SESSION['previous_page_url']);
}

if (get_the_ID() == '321') {
	$libUrl = get_permalink(8542);
	add_wp_activity_log(901);
	unset($_SESSION['library_region_name']);
	unset($_SESSION['library_code_name']);
	unset($_SESSION['library_page_id']);
	unset($_SESSION['barCode']);
	unset($_SESSION['library_login_page_id']);
	wp_redirect($libUrl);
	die;
}

if (get_field('latest_release')) {

	$file = fopen(get_field('latest_release'), 'r');
	$data = array();
	$ctr = 0;
	while (($line = fgetcsv($file)) !== FALSE) {
		if ($ctr != 0) {
			$data[] = $line[2];
		}

		$ctr = 1;
	}
	$latest_release = implode(",", $data);
	echo '<span class="country-latest-release" data-country="' . $latest_release . '"></span>';

	fclose($file);
}





if (get_field('most_popular')) {

	$file1 = fopen(get_field('most_popular'), 'r');
	$data1 = array();
	$ctr1 = 0;
	while (($line1 = fgetcsv($file1)) !== FALSE) {
		if ($ctr1 != 0) {
			$data1[] = $line1[2];
		}

		$ctr1 = 1;
	}
	$most_popular = implode(",", $data1);
	echo '<span class="country-most-popular" data-country="' . $most_popular . '"></span>';

	fclose($file1);
}


$category = get_term_by('name', 'english', 'aiovg_categories');
//wp_set_post_terms( 17989, array(9), 'aiovg_categories' );

?>

<pre class="post-meta-12345" style="display: none;">
	<?php // print_r(get_post_meta(18031)); 
	?>
</pre>

<?php if (get_field('flip_book', get_the_ID())) : ?>


	<div class="flipbook-popup">
		<div class="flipbook-popup-inner">
			<div class="flipbook-content">
				<span class="close-flipbook">x</span>
				<h2><?php echo get_the_title(); ?></h2>
				<?php echo do_shortcode('[dflip id="' . get_field('flip_book', get_the_ID()) . '"][/dflip]'); ?>
			</div>
		</div>
	</div>

<?php endif; ?>

<script type="text/javascript">
	if (jQuery(".error-import-table").length) {
		var html_error_message = jQuery(".error-import-table").html();
		jQuery("#import_error_message").html(html_error_message).slideDown();
	}

	if (jQuery(".success-import-table").length) {
		var html_error_message = jQuery(".success-import-table").html();
		jQuery("#import_success_message").html(html_error_message).slideDown();
	}
</script>


<?php

// =============================================================================
// FOOTER.PHP
// -----------------------------------------------------------------------------
// The site footer.
// =============================================================================

x_get_view('footer', 'base');


$check_session = false;
if (isset($_SESSION['library_login_page_id']) && $_SESSION['library_login_page_id'] && @$_SESSION['library_code_name']) {
	$check_session = true;
?>
	<script>
		jQuery('.hidden_library_name').find('input').val('<?php echo $_SESSION['library_code_name']; ?>');
		jQuery('#menu-menu').append('<li class="menu-item menu-item-type-post_type"><a href="/logout/" style="outline: none;"><span>Logout</span></a></li>');
		jQuery('#menu-menu-1').append('<li class="menu-item menu-item-type-post_type"><a href="/logout/" style="outline: none;"><span>Logout</span></a></li>');
	</script>

<?php }


?>

<?php

/**
 * Setup query to show the ‘services’ post type with ‘8’ posts.
 * Output the title with an excerpt.
 */

$args = array(
	'post_type' => 'page',
	'post_status' => 'publish',
	'posts_per_page' => -1,
	'orderby' => 'title',
	'order' => 'ASC',
);

$loop = new WP_Query($args);
$login_data = array();
$ctr = 0;
while ($loop->have_posts()) : $loop->the_post();
	global $post;
	$a = get_the_title();
	$str = strtoupper($a);
	$strip_title = str_replace(" Login", "", $a);
	if (strpos($str, 'LOGIN') !== false) {
		$login_data[$ctr]['title'] = $strip_title;
		$login_data[$ctr]['link'] = $post->post_name;
?>

<?php
		$ctr++;
	}
endwhile;
wp_reset_postdata();
?>
<span class="login-json-data" data-json="<?php echo htmlspecialchars(json_encode($login_data), ENT_QUOTES, 'UTF-8'); ?>"></span>


<?php if (have_rows('online_configuration')) : ?>
	<?php while (have_rows('online_configuration')) : the_row();

		// Get sub field values.
		$activity_duration = get_sub_field('activity_duration');
		$maximum_duration_of_activities = get_sub_field('maximum_duration_of_activities');
		$refresh_period = get_sub_field('refresh_period');

	?>
		<div id="online_configuration" data-activity-duration="<?php echo $activity_duration; ?>" data-maximum-duration-of-activities="<?php echo $maximum_duration_of_activities ?>" data-refresh-period="<?php echo $refresh_period; ?>">

		</div>
	<?php endwhile; ?>
<?php endif; ?>

<?php if (get_field('enable_ratings', get_the_ID())) : ?>
	<script>
		//jQuery('div.yasr-visitor-votes').addClass('active');
	</script>
<?php else : ?>
	<script>
		//jQuery('div.yasr-visitor-votes').remove();
	</script>
<?php endif; ?>

<?php if (get_field('activities_analytics', get_the_ID())) : ?>
	<script>
		jQuery('body').addClass('activities-target-parent')
	</script>
	<?php if (get_field('type_of_activity', get_the_ID()) == 'PDF') : ?>
		<script>
			jQuery(document).on('click', '.activities-target-parent .x-anchor-button', function() {

				var title = jQuery(this).closest('.x-col').find('.h-custom-headline').text();
				var title2 = title.replace(/(\r\n|\n|\r)/gm, "")
				var fd = new FormData();

				fd.append("action", "get_activity_click");
				fd.append("page_id", jQuery(".page-id").text());
				fd.append("title", title2.replace("#", " "));
				fd.append("page_url", jQuery(".page-url").text());
				fd.append("page_title", jQuery(".page-title").text());
				fd.append("type", jQuery(this).find(".x-anchor-text-primary").text());
				fd.append("bar_code", "test");
				jQuery.ajax({
					type: "POST",
					dataType: "json",
					url: "/wp-admin/admin-ajax.php",
					data: fd,
					contentType: false,
					processData: false,
					success: function(response) {
						console.log(response);

					}
				});
			});
		</script>
	<?php else : ?>
		<script>
			var duration = parseInt(jQuery('#online_configuration').data('activity-duration')) * 60;
			var maximum_duration = parseInt(jQuery('#online_configuration').data('maximum-duration-of-activities')) * 60;
			var refresh_period = parseInt(jQuery('#online_configuration').data('refresh-period')) * 60;
			var ctrOnline = 0;
			console.log((duration * 60 * 1000));
			console.log(duration + '-' + maximum_duration + '-' + refresh_period);
			setInterval(function() {
				//console.log(ctrOnline+' - duration');
				if ((ctrOnline % duration == 0) && ctrOnline <= maximum_duration) {

					//console.log(ctrOnline+' - maximum_duration');

					var fd = new FormData();

					fd.append("action", "get_activity_click");
					fd.append("page_id", jQuery(".page-id").text());
					fd.append("title", "N/A");
					fd.append("page_url", jQuery(".page-url").text());
					fd.append("page_title", jQuery(".page-title").text());
					fd.append("type", 'Online');
					jQuery.ajax({
						type: "POST",
						dataType: "json",
						url: "/wp-admin/admin-ajax.php",
						data: fd,
						contentType: false,
						processData: false,
						success: function(response) {
							console.log(response);

						}
					});
				}

				if (ctrOnline >= refresh_period) {
					location.reload();
				}

				ctrOnline++;

			}, 1000);
		</script>
	<?php endif; ?>
<?php endif; ?>