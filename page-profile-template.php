	<?php

    /* Template Name: Page Profile Template */
    get_header();
    global $language_details;
    $page = get_queried_object();
    $page_category_id = get_field('page_category_id', get_the_ID());
    $page_category = get_term($page_category_id);
    $category_name = $page_category->name;
    $category_slug = $page_category->slug;
    $category_filter = get_field("filter_videos", "category_" . $page_category->term_id);

    $remove_title = get_field('remove_title', $page->ID);
    if (isset($remove_title) && $remove_title == true) {
        $title = get_field('page_language', $page->ID);
    } else {
        $title = get_field('page_language', $page->ID) . ' - ' . $page->post_title;
    }
    // get_field('page_language', get_the_ID()) . ' - ' . $category_name
    // $title = get_field('page_language', $page->ID) . ' - ' . $page->post_title;

    // if ($page->ID == 20707 || $page->ID == 15135) {
    // 	$title = get_field('page_language', $page->ID);
    // }

    // $title = get_field('page_language', $page->ID) . ' - ' . $page->post_title;

    // 	$title = get_field('page_language', $page->ID) ? get_field('page_language', $page->ID) . ' - ' . $page->post_title :  $page->post_title;
    // if ($page->ID == 23864 || $page->ID == 23871 || $page->ID ==  26515) {
    // 	$title = get_field('page_language', $page->ID);
    // }

    // get_field('category_language_title', $page->ID)
    // if (get_current_user_id() == 473) {
    // 	$title1 = get_field('page_language', $page->ID) ? get_field('page_language', $page->ID) . ' - ' . $page->post_title :  $page->post_title;

    // }
    // update_field('tier_level', 4, 20372);5353


    $tier_level = [0, 1, 2, 3, 4];
    $content = "";
    $tags = array();
    $language_details = array();
    foreach ($tier_level as $key => $level) {
        $args = array(
            'post_type' => 'aiovg_videos',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            // 'order'    => 'ASC',
            // 'orderby'   => 'sort-order',
            // 'meta_query' => array(
            // 	'sort-order' => array(
            // 		'key' => 'tier_level',
            // 		'type' => 'NUMERIC'
            // 	)
            // ),
            'meta_query' => array(
                array(
                    'key' => 'tier_level',
                    'value' => $level,
                )
            ),
            'tax_query' => array(
                'relation' => 'AND',
                array(
                    'taxonomy' => 'aiovg_categories',
                    'field'    => 'term_id',
                    'terms'    =>  $page_category_id,
                ),
            ),
        );

        $query = new WP_Query($args);
        shuffle($query->posts);
        ob_start();
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                get_template_part('template-parts/content', 'video');
                $filterTags = get_field("filter_tags", get_the_ID());


                if ($filterTags) {
                    foreach (explode(",", $filterTags) as $key => $term) {
                        // $data = ['id' => $term->term_id, 'name' => $term->name];
                        if (!in_array($term, $tags)) {
                            array_push($tags, $term);
                        }
                    }
                }
            }
        }
        $content .= ob_get_clean();
        wp_reset_postdata();
    }

    $args = array(
        'post_type' => 'aiovg_videos',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'order'    => 'ASC',
        'orderby'   => 'sort-order',
        'meta_query' => array(
            'sort-order' => array(
                'key' => 'sort_order',
                'type' => 'NUMERIC'
            ),
            array(
                'key' => 'tier_level',
                'value' => null,
                'compare' => 'NOT EXISTS',
            )
        ),
        'tax_query' => array(
            'relation' => 'AND',
            array(
                'taxonomy' => 'aiovg_categories',
                'field'    => 'term_id',
                'terms'    =>  $page_category_id,
            ),
        ),
    );

    $query = new WP_Query($args);
    // shuffle($query->posts);
    ob_start();
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('template-parts/content', 'video');
            $filterTags = get_field("filter_tags", get_the_ID());
            // if (get_current_user_id() == 473) {
            //     // delete_field('tier_level', get_the_ID());
            //     echo '<pre>';
            //     print_r(get_fields(get_the_ID()));
            //     echo '</pre>';
            // }
            if ($filterTags) {
                foreach (explode(",", $filterTags) as $key => $term) {
                    // $data = ['id' => $term->term_id, 'name' => $term->name];
                    if (!in_array($term, $tags)) {
                        array_push($tags, $term);
                    }
                }
            }
        }
    }
    $content .= ob_get_clean();
    wp_reset_postdata();
    sort($tags, SORT_NATURAL);
    ?>
	<div class="x-main full" role="main">
	    <!-- <article id="post-12834" class="post-12834 page type-page status-publish hentry no-post-thumbnail"> -->
	    <article id="" class=" ">
	        <div class="entry-content content">
	            <div id="cs-content" class="cs-content">
	                <div class="body-post-content x-row x-container max width">
	                    <div class="x-row-inner">
	                        <div class="body-post-content-header x-col active-col single-video-page">
	                            <div class="x-row">
	                                <div class="x-row-inner">
	                                    <div class="x-col">
	                                        <h3 class="h-custom-headline header-title h3">
	                                            <span>
	                                                <img width="79" height="67" class="flag-image" src="<?= get_the_post_thumbnail_url(get_the_ID()) ?>" alt="<?= $page->post_title ?> Flag">&nbsp; <?= $title ?>
	                                            </span>
	                                        </h3>
	                                        <div class="filter-videos">
	                                            <div class="filter-videos-wrap">
	                                                <div class="filter-label sort">Sort: </div>
	                                                <div class="filter-options">
	                                                    <div class="select-filter">
	                                                        <!-- <i style="display: none;">Sort By: </i> -->
	                                                        <span class="active" data-value="default">Default</span>
	                                                        <span data-value="latest-release" class="">Latest Release</span>
	                                                        <span data-value="most-popular" class="">Most Popular</span>
	                                                        <span data-value="a-z" class="">Sort A - Z</span>
	                                                        <span data-value="z-a" class="">Sort Z - A</span>
	                                                    </div>
	                                                </div>
	                                            </div>
	                                            <?php if ($category_filter) { ?>
	                                                <div class="filter-videos-wrap filter-by-title <?php echo count($category_filter) == 1 ? "w-100" : "" ?>">
	                                                    <?php if (in_array("filter_tags", $category_filter)) { ?>
	                                                        <div class="filter-by-tags">
	                                                            <span class="filter-label">Filter: </span>
	                                                            <select id="filter-tags" name="tags">
	                                                                <option class="tag-item" value="all">All</option>
	                                                                <?php
                                                                    if ($tags && count($tags) > 0) {
                                                                        // $keys = array_column($tags, 'name');
                                                                        // array_multisort($keys, SORT_DESC, $tags);
                                                                        foreach ($tags as $key => $tag) {
                                                                            echo sprintf('<option class="tag-item" value="%s">%s</option>', $tag, $tag);
                                                                        }
                                                                    }
                                                                    ?>
	                                                            </select>
	                                                        </div>
	                                                    <?php } ?>
	                                                    <?php if (in_array("filter_title", $category_filter)) { ?>
	                                                        <div class="search-filter">
	                                                            <label class="filter-label" for="input-title">Search: </label><input id="input-title" type="search">
	                                                        </div>
	                                                    <?php } ?>
	                                                </div>
	                                            <?php } ?>
	                                        </div>
	                                        <!-- <p><img class="ajax-loader" src="/wp-content/uploads/2021/09/ajax-loader3.gif"></p> -->
	                                    </div>
	                                </div>
	                            </div>
	                            <div class="post-content" style="position: relative; left: 0px;" data-language="<?= $category_slug ? $category_slug : $page->post_name ?>">
	                                <div class="x-row x-container max width main">
	                                    <div class="x-row-inner">
	                                        <?php echo $content; ?>
	                                    </div>
	                                </div>
	                            </div>

	                        </div>
	                        <div class="sidebar x-col">
	                            <?php dynamic_sidebar('Language page sidebar'); ?>
	                        </div>
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
