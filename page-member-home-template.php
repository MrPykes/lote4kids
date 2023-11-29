	<?php

	/* Template Name: Page Member Home Template */
	get_header();

	global $language_details;
	$page_id = get_queried_object_id();
	?>
	<div class="x-main full" role="main">
		<article id="" class="">
			<div class="entry-content content">
				<div id="cs-content" class="cs-content">
					<div class="body-post-content x-row x-container max width">
						<div class="x-row-inner">
							<div class="body-post-content-header x-col active-col member-home-page">
								<div class="x-row">
									<div class="x-row-inner">
										<div class="x-col filter-languages">
											<div class="filter-videos-wrap">
												<div class="filter-label sort">Sort: </div>
												<div class="filter-options">
													<div class="select-filter">
														<i style="display: none;">Sort By: </i>
														<span class="active" data-value="default">Default</span>
														<span data-value="latest-release" class="">Latest Release</span>
														<span data-value="most-popular" class="">Most Popular</span>
														<span data-value="a-z" class="">Sort A - Z</span>
														<span data-value="z-a" class="">Sort Z - A</span>
													</div>
												</div>
											</div>
											<div class="filter-videos-wrap filter-by-title">
												<div class="search-filter">
													<label class="filter-label" for="input-title">Search: </label><input id="input-title" type="search">
												</div>
											</div>
											<p><img class="ajax-loader" src="/wp-content/uploads/2021/09/ajax-loader3.gif"></p>
										</div>
									</div>
								</div>
								<div class="post-content" data-language="<?= $page->post_name ?>">
									<div class="x-row x-container max width main">
										<div class="x-row-inner">
											<?php
											$terms_attr = array(
												'taxonomy' => 'aiovg_categories', //empty string(''), false, 0 don't work, and return empty array
												'orderby' => 'name',
												'order' => 'ASC',
												'include' => array(67, 135, 71, 73, 145, 75, 143, 77, 206, 79, 170, 10, 82, 85, 168, 212, 87, 208, 89, 91, 62, 202, 57, 151, 153, 8, 130, 93, 96, 194, 213, 98, 100, 101, 102, 103, 104, 204, 105, 108, 171, 11, 165, 109, 110, 184, 131, 147, 111, 174, 112, 113),
											);
											$terms = get_terms($terms_attr);
											$term_ids = get_post_meta($page_id, 'language_include', true);
											$arr_term_ids = explode(",", str_replace(" ", "", $term_ids));
											$language_details = array();
											// if (get_current_user_id() == 473) {
											// 	echo "<pre>";
											// 	print_r($arr_term_ids);
											// 	echo "</pre>";
											// }
											if ($arr_term_ids) {
												foreach ($arr_term_ids as $key => $id) {
													$term_ = get_term_by('id', $id, 'aiovg_categories');
													get_template_part('template-parts/content', 'language', $term_);
												}
											}
											// foreach ($terms as $key => $term) {
											// 	get_template_part('template-parts/content', 'language', $term);
											// } 
											?>
										</div>
									</div>
									<?php
									$terms_attr_ = array(
										'taxonomy' => 'aiovg_categories', //empty string(''), false, 0 don't work, and return empty array
										'orderby' => 'name',
										'order' => 'DESC',
										'hide_empty' => false,
										'include' => array(221, 226, 222, 223, 224, 225),
									);
									$terms_ = get_terms($terms_attr_);
									// if (get_current_user_id() == 473) {
									// 	$term_ids = get_post_meta($page_id, 'language_coming_soon', true);
									// 	echo "<pre>";
									// 	print_r(explode(",", str_replace(" ", "", $term_ids)));
									// 	echo "</pre>";
									// 	// foreach ($arr_term_ids as $key => $id) {
									// 		// 	echo "<pre>qwe";
									// 		// 	print_r(get_term_by('id', $id, 'aiovg_categories'));
									// 		// 	echo "</pre>";
									// 		// }
									// 	}
									$coming_soon_term_ids = get_post_meta($page_id, 'language_coming_soon', true);
									$arr_coming_soon_term_ids = explode(",", str_replace(" ", "", $coming_soon_term_ids));
									if ($terms_) {
									?>
										<h1 class="coming-soon">Coming Soon</h1>
										<div class="x-row x-container max width">
											<div class="x-row-inner">
												<?php
												foreach ($arr_coming_soon_term_ids as $key => $id) {
													$term_ = get_term_by('id', $id, 'aiovg_categories');
													get_template_part('template-parts/content', 'coming-soon', $term_);
												}
												// wp_reset_postdata();
												// foreach ($terms_ as $key => $term_) {
												// 	get_template_part('template-parts/content', 'coming-soon', $term_);
												// }
												?>
											</div>
										</div>
									<?php } ?>
								</div>
							</div>
							<div class="sidebar x-col">
								<?php dynamic_sidebar('Language page sidebar'); ?>
							</div>
						</div>
					</div>
				</div>
		</article>
	</div>
	<span class="hide" id="language_details">
		<?php echo json_encode($language_details) ?>
	</span>
	<?php
	get_footer();
