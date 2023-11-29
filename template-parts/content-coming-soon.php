<?php
$category_language_title = "";
$thumbnail_id = get_term_meta($args->term_id, 'image_id', true);
$thumbnail_url = wp_get_attachment_image_src($thumbnail_id);
$thumbnail_url = $thumbnail_url ? $thumbnail_url[0] : "https://lote4kids.com/wp-content/uploads/2022/10/arabic.svg";
$category_language_title = get_field('category_language_title', $args->taxonomy . '_' . $args->term_id);
?>
<div class="x-col">
    <a class="x-img" title="Picture books in <?= $args->name ?>">
        <img src="<?= $thumbnail_url ?>" width="120" height="80" alt="<?= $args->name ?>">
    </a>
    <div class="x-text cs-ta-center">
        <p class="hp-flag"><strong><?= $category_language_title ?></strong><br>
            <?= $args->name ?></p>
    </div>
</div>