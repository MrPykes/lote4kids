<?php

/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header();
?>


<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

        <?php
        // Start the loop.
        while (have_posts()) : the_post();

            get_template_part('template-parts/content', 'flipbook');

        endwhile;
        ?>

    </main><!-- .site-main -->
    <!-- <div class="single-sidebar">
        < ?php dynamic_sidebar('Language Page Sidebar'); ?>
    </div> -->
</div><!-- .content-area -->

<?php get_footer(); ?>