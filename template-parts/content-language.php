<?php
global $language_details;
$thumbnail_id = get_term_meta($args->term_id, 'image_id', true);
$thumbnail_url = wp_get_attachment_image_src($thumbnail_id);
$thumbnail_url = $thumbnail_url ? $thumbnail_url[0] : "/wp-content/uploads/2021/06/BU_UA-0621.png";

$title = get_term_meta($args->term_id, "category_language_name", true) ? get_term_meta($args->term_id, "category_language_name", true) : $args->name;
$title_language = get_term_meta($args->term_id, "category_language_title", true) ? get_term_meta($args->term_id, "category_language_title", true) :  $args->description;
// if (get_current_user_id() == 473) {
//     echo "<pre>";
//     print_r($title);
//     // print_r($category_language_title);
//     echo "</pre>";
// }
?>

<div class="x-col">
    <a class="x-img" href="<?= home_url() . '/' . $args->slug ?>" title="Picture books in <?= $title ?>">
        <img src="<?= $thumbnail_url ?>" width="<?= $thumbnail_url[1] ?>" height="<?= $thumbnail_url[2] ?>" alt="<?= $title ?>">
    </a>
    <div class="x-text cs-ta-center">
        <p class="hp-flag"><strong><?= $title_language ?></strong><br>
            <?= $title ?></p>
    </div>
</div>
<?php
$args_ = array(
    'post_type' => 'aiovg_videos',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'tax_query' => array(
        'relation' => 'AND',
        array(
            'taxonomy' => 'aiovg_categories',
            'field'    => 'term_id',
            'terms'    =>  $args->term_id,
        ),
    ),
);
$views = 0;
$query = new WP_Query($args_);
if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();
        if (get_post_meta(get_the_ID(), 'views', true)) {
            $views += get_post_meta(get_the_ID(), 'views', true);
        }
    }
}

$language_details[] = array(
    'id' => $args->term_id,
    'title' => $title,
    '_title_language' => $title_language,
    'imageUrl' => $thumbnail_url,
    'views' => $views,
    'slug' =>  '/' . $args->slug,
    'width' =>  $thumbnail_url[1],
    'height' =>  $thumbnail_url[2],
);
