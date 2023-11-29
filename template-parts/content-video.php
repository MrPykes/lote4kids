<?php
global $post, $language_details;
$tags = get_the_terms(get_the_ID(), 'aiovg_tags');
$category = get_the_terms(get_the_ID(), 'aiovg_categories');
$title = $post->post_title;
if (str_contains($title, '–')) {
    $opTitle = substr($title, 0, strpos($title, ' –'));
} else {
    $opTitle = substr($title, 0, strpos($title, ' -'));
}
$opTitle = $opTitle ? $opTitle : $title;
$filterTag = get_field('filter_tags', get_the_ID());
$_title_language = get_field('_title_language', get_the_ID());
$age_group = get_post_meta(get_the_ID(), 'age_group', true);
$reading_level = get_post_meta(get_the_ID(), 'reading_level', true);
$imageUrl = get_field('image', get_the_ID());

// if (str_contains(strtolower($opTitle), strtolower($_POST['filterbytitle'])) || empty($_POST['filterbytitle']) || $_POST['filterbytitle'] == 'undefined') {
//     if ($_POST['filter_tag'] == 'all' || $_POST['filter_tag'] == 'undefined' || empty($_POST['filter_tag']) || in_array($_POST['filter_tag'], explode(",", $filterTag))) {
?>
<div class="x-col">
    <h1 class="h-custom-headline h5">
        <?php
        if ($_title_language) {
            printf("<p><b>%s</b></p>", $_title_language);
            $opTitle ? printf("<p>%s</p>", $opTitle) : "";
        } else {
            printf("<p><b>%s</b></p>", $opTitle);
        }
        $reading_level ? printf("<p class='reading_level'>(%s)</p>", $reading_level) : "";
        ?>
    </h1>
    <span class="e12834-73 x-image x-effect-exit" data-x-effect="{&quot;offsetTop&quot;:&quot;10%&quot;,&quot;offsetBottom&quot;:&quot;10%&quot;,&quot;behaviorScroll&quot;:&quot;fire-once&quot;}">
        <img src="<?= $imageUrl  ?>" width="200" height="150" alt=" <?= $opTitle ?>">
    </span>
    <hr class=" x-line">
    <div class="post-content-button">
        <div class="wrapper">
            <?php
            if (have_rows('_button_details')) {
                $button_details = array();
                $count = 0;
                while (have_rows('_button_details')) : the_row();
                    $_button_name = get_sub_field('_button_name');
                    $_button_link = get_sub_field('_button_link');
                    $button_details[] = array(
                        "_button_name" => $_button_name,
                        "_button_link" => str_replace("https://lote4kids.com", "", $_button_link),
                    );
                    $count++;
                    $status = "";
                    $href = "";
                    if ($_button_link) {
                        $href = 'href="' . $_button_link . '"';
                    } else {
                        $status = "inactive";
                    }
            ?>
                    <a class="x-anchor x-anchor-button <?php echo $status ?>" tabindex="0" <?php echo $href ?>>
                        <div class="x-anchor-content">
                            <div class="x-anchor-text">
                                <span class="x-anchor-text-primary"><?= $_button_name; ?></span>
                            </div>
                        </div>
                    </a>
            <?php
                    // if ($_button_name == 'Bilingual' || $_button_name == 'BSL') {
                    if ($count > 0 && $count % 2 == 0) {
                        echo "<br>";
                    }
                endwhile;
            }
            ?>
        </div>
    </div>
</div>
<?php
$language_details[] = array(
    'title' => $opTitle,
    '_title_language' => $_title_language ? $_title_language : "",
    'age_group' => $age_group,
    'reading_level' => $reading_level,
    'imageUrl' => $imageUrl,
    'filterTag' => $filterTag,
    'tags' => $tags,
    'category' => $category,
    'sort_order' =>  get_field('sort_order', get_the_ID()),
    '_button_details' =>  $button_details,
    'views' =>  get_field('views', get_the_ID()),
    'date' => strtotime(get_the_date("Y-m-d H:i:s")),
);
