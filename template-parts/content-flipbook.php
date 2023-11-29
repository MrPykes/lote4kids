<?php

/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @since 1.0.0
 */

global $post;
$flipbook = get_post_meta(get_the_ID(), 'flipbook', true);
$flipbook_id = url_to_postid($flipbook);
$pdfUrl = get_field("pdf_file", $flipbook_id);
$audioFile = get_field("audio", $flipbook_id);
$audioPlay = get_field("audio_play", $flipbook_id);
$is_double_page = get_field("is_double_page", $flipbook_id);

$class_dp = $is_double_page ? "dual-page" : "";

$beforeAudioPlay = $audioPlay[0]['before'] ?  $audioPlay[0]['before'] : 0;
$afterAudioPlay = $audioPlay[0]['after'] ? $audioPlay[0]['after'] : 0;
$image = get_post_meta($post->ID, 'image', true);
$cover_image = get_post_meta($post->ID, 'cover_image', true);
$cover_image_2 = get_post_meta($post->ID, 'cover_image_2', true);
$image_id = attachment_url_to_postid($cover_image);
$image_meta = wp_get_attachment_metadata($image_id);
$image_sizes = $image_meta['sizes'];
$image_size_large = $image_sizes['large'];
$image_size_medium_large = $image_sizes['medium_large'];
$image_layout = get_post_meta($post->ID, 'layout', true);
$hideSinglePage = !$is_double_page ? "hide" : "";
if ($is_double_page) {
    $imgHeight = 524;
    $imgWidth = 391;
} else {
    $multiplier = $image_layout == 'portrait' ? .58 : .58;
    $imgHeight = $image_size_large['height'] * $multiplier;
    $imgWidth = $image_size_large['width'] * $multiplier;
}
$offset = 0;
aiovg_update_views_count($post->ID);

?>
<script type='text/javascript'>
    var zIndex = 0;
    var panelCount = 0;
    var isPanelLoad = false;
    const pdf = '<?php echo $pdfUrl ?>';
    const img = '<?php echo $image ?>';
    const imgHeight = '<?php echo $imgHeight ?>';
    const imgFlipbookHeight = '<?php echo $imgHeight + $offset ?>';
    const imgWidth = '<?php echo $imgWidth ?>';
    const image_layout = '<?php echo $image_layout ?>';
    const is_double_page = '<?php echo $is_double_page ?>';
    var scale = 1;
    var resize = 1;
    var offset = 0;

    function mobileView() {
        var mq = window.matchMedia('only screen and (min-width: 425px)');
        return mq.matches;
    }

    function tabletView() {
        var mq = window.matchMedia('only screen and (min-width: 700px)');
        return mq.matches;
    }

    function desktopSmallView() {
        var mq = window.matchMedia('only screen and (min-width: 1000px)');

        return mq.matches;
    }

    function desktopMeduimView() {
        var mq = window.matchMedia('only screen and (min-width: 1400px)');
        return mq.matches;
    }

    function desktopLargeView() {
        var mq = window.matchMedia('only screen and (min-width: 1600px)');
        return mq.matches;
    }

    function desktopExtraLargeView() {
        var mq = window.matchMedia('only screen and (min-width: 1900px)');
        return mq.matches;
    }

    function desktop2xExtraLargeView() {
        var mq = window.matchMedia('only screen and (min-width: 2500px)');
        return mq.matches;
    }
    if (desktop2xExtraLargeView()) {
        offset = 90;
        scale = image_layout == 'portrait' ? 1.25 : 1;
    } else if (desktopExtraLargeView()) {
        scale = image_layout == 'portrait' ? 1.25 : 1;
        offset = 90;
    } else if (desktopLargeView()) {
        scale = image_layout == 'portrait' ? 1.15 : 1;
        offset = 90;
    } else if (desktopMeduimView()) {
        scale = image_layout == 'portrait' ? 1 : 1;
        offset = 90;
    } else if (desktopSmallView()) {
        scale = image_layout == 'portrait' ? .9 : 1;
        offset = 90;
    } else if (tabletView()) {
        scale = image_layout == 'portrait' ? .7 : 1;
        offset = 85;
    } else {
        scale = .3;
        offset = 40;
    }
    // document.getElementById("flipbook").style.height = imgHeight * scale;
    var flipbookChecker = setInterval(function() {
        // var flipbookChecker = setTimeout(function() {
        if (jQuery('#flipbook').length) {
            jQuery('#flipbook').height(imgFlipbookHeight * scale + offset);
            // document.getElementById("book").style.height = imgHeight * scale;
            // document.getElementById("book").style.width = imgWidth * scale;
            // document.getElementById("book_cover_image").style.height = imgHeight * scale;
            // document.getElementById("book_cover_image").style.width = imgWidth * scale;
            // document.getElementById("book_cover_image_2").style.height = imgHeight * scale;
            // document.getElementById("book_cover_image_2").style.width = imgWidth * scale;
            jQuery('#book').height(imgHeight * scale);
            jQuery('#book').width(imgWidth * scale);
            jQuery('#book_cover_image').height(imgHeight * scale);
            jQuery('#book_cover_image').width(imgWidth * scale);
            jQuery('#book_cover_image_2').height(imgHeight * scale);
            jQuery('#book_cover_image_2').width(imgWidth * scale);
            clearInterval(flipbookChecker);
        }
    }, 10);
</script>
<!-- <div id="flipbook" style="height:< ?php echo $imgHeight + $offset ?>;"> -->
<div id="flipbook">
    <article id="flip" class="hide">
        <div id="book" class="book <?php echo $class_dp ?>">
            <div id="book_cover" data-id="999" class="panel" style="z-index: 999;">
                <?php
                if ($is_double_page == 1) { ?>
                    <div class="front">
                        <div class="content">
                            <img id="book_cover_image" src="<?php echo $cover_image_2 ?>" alt="" srcset="">
                        </div>
                    </div>
                    <div class="back" style="transform: rotateY(0deg);">
                        <div class="content">
                            <img id="book_cover_image_2" src="<?php echo $cover_image ?>" alt="" srcset="">
                        </div>
                    </div>
                <?php } else { ?>
                    <div class="front">
                        <div class="content">
                            <img id="book_cover_image" src="<?php echo $cover_image ?>" alt="" srcset="">
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>

        <div id="pagination" class="pagination">
            <div id="reset" class="hide">
                <span class="dashicons reset dashicons-image-rotate" title="Reset"></span>
            </div>
            <div id="auto-play-btn" class="">
                <span class="dashicons play dashicons-controls-auto-play" title="Auto Play"></span>
                <span class="dashicons pause dashicons-controls-pause hide" title="Pause"></span>
            </div>
            <div id="play-btn" class="<?php echo $hideSinglePage ?>">
                <span class="dashicons play dashicons-controls-play" title="Play"></span>
                <span class="dashicons pause dashicons-controls-pause hide" title="Pause"></span>
            </div>
            <div id="prev-btn" class="hide">
                <span class="dashicons prev dashicons-arrow-left-alt " title="Previous"></span>
            </div>
            <div id="next-btn" class="">
                <span class="dashicons next dashicons-arrow-right-alt " title="Next"></span>
            </div>
            <div class="resize">
                <span class="dashicons dashicons-editor-expand" title="Maximize "></span>
                <span class="dashicons dashicons-editor-contract hide" title="Minimize"></span>
            </div>
        </div>
        <div id="myaudio" class="audio" data-before="<?php echo $beforeAudioPlay ?>" data-after="<?php echo $afterAudioPlay ?>">
            <?php if ($audioFile) {
                foreach ($audioFile as $key => $file) { ?>
                    <?php
                    $metadata = get_post_meta(attachment_url_to_postid($file['audio_file']), '_wp_attachment_metadata', true);
                    $class = "s" . $file['page_number']
                    ?>
                    <div class="<?php echo $class ?> hide" data-index="<?php echo $file['page_number'] ?>" data-duration="<?php echo $metadata['length'] ?>">
                        <?php echo do_shortcode('[audio auto-play="true" class="hide" id="s' . $file['page_number'] . '" controls="true" src="' . $file['audio_file'] . '"]') ?>
                    </div>

            <?php }
            }
            ?>
        </div>
        <!-- <audio class="" id="s2" controls>
            <source src="https://staging20.lote4kids.com/wp-content/uploads/2022/11/2.mp3">
        </audio> -->
    </article>
</div>

<script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.0.279/build/pdf.min.js";
    pdfjsLib.getDocument(pdf).promise.then(doc => {
        var paper;
        var book = document.getElementById("book");
        zIndex = doc._pdfInfo.numPages
        var pageId = 0;
        for (let index = 1; index <= zIndex; index++) {
            pageId = index;
            const myTimeout = setTimeout(function() {
                doc.getPage(index).then(page => {
                    // var scale = 1.1;

                    var viewport = page.getViewport({
                        scale: scale
                    });
                    // console.log('height', viewport.height);
                    // console.log('width', viewport.width);
                    // document.getElementById("book_cover").style.height = viewport.height;
                    // document.getElementById("book_cover").style.width = viewport.width;
                    var canvas = document.createElement("canvas");
                    canvas.setAttribute("id", "pdf" + index);;

                    if (is_double_page == 1) {
                        if (index == 1) {
                            panelCount = 1;
                            paper = document.createElement("div");
                            paper.setAttribute("id", "p" + panelCount);
                            paper.setAttribute("data-id", panelCount);
                            paper.setAttribute("class", "panel open");
                            // paper.style.zIndex = "1";

                            var backContent = document.createElement("div");
                            backContent.setAttribute("class", "content");

                            var back = document.createElement("div");
                            back.setAttribute("class", "back");

                            backContent.appendChild(canvas);
                            back.appendChild(backContent);
                            paper.appendChild(back);
                            // panelCount++;
                        } else {

                            if (index % 2 == 0) {
                                panelCount++;
                                paper = document.createElement("div");
                                paper.setAttribute("id", "p" + panelCount);
                                paper.setAttribute("data-id", panelCount);
                                paper.setAttribute("class", "panel");

                                var front = document.createElement("div");
                                front.setAttribute("class", "front");

                                var frontContent = document.createElement("div");
                                frontContent.setAttribute("class", "content");

                                frontContent.appendChild(canvas);
                                front.appendChild(frontContent);
                                paper.appendChild(front);
                            } else {
                                var paper = document.getElementById("p" + panelCount);

                                var backContent = document.createElement("div");
                                backContent.setAttribute("class", "content");

                                var back = document.createElement("div");
                                back.setAttribute("class", "back");

                                backContent.appendChild(canvas);
                                back.appendChild(backContent);
                                paper.appendChild(back);
                            }
                        }
                    } else {
                        if (index % 2 != 0) {
                            panelCount++;
                            paper = document.createElement("div");
                            paper.setAttribute("id", "p" + panelCount);
                            paper.setAttribute("data-id", panelCount);
                            paper.setAttribute("class", "panel");
                            // paper.style.zIndex = zIndex;
                            // zIndex--;
                            var front = document.createElement("div");
                            front.setAttribute("class", "front");

                            var frontContent = document.createElement("div");
                            frontContent.setAttribute("class", "content");

                            frontContent.appendChild(canvas);
                            front.appendChild(frontContent);
                            paper.appendChild(front);
                        } else {
                            var paper = document.getElementById("p" + panelCount);

                            var backContent = document.createElement("div");
                            backContent.setAttribute("class", "content");

                            var back = document.createElement("div");
                            back.setAttribute("class", "back");

                            backContent.appendChild(canvas);
                            back.appendChild(backContent);
                            paper.appendChild(back);
                        }
                    }

                    book.appendChild(paper);

                    var canvas = document.getElementById("pdf" + index);
                    var context = canvas.getContext('2d');
                    // canvas.height = viewport.height;
                    // canvas.width = viewport.width;
                    canvas.height = imgHeight * scale;
                    canvas.width = imgWidth * scale;

                    // document.getElementById("book").style.height = viewport.height;
                    // document.getElementById("book").style.width = viewport.width;
                    // document.getElementById("book").style.height = imgHeight * scale;
                    // document.getElementById("book").style.width = imgWidth * scale;
                    // console.log(imgHeight, scale, imgHeight * scale);
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    var renderTask = page.render(renderContext);
                    renderTask.promise.then(function() {
                        console.log('Page rendered');
                        // document.getElementById("book_cover").remove();
                    });
                })
                if (index == zIndex) {
                    isPanelLoad = true;
                    // $("#book_cover").remove();
                    // console.log($("#book_cover"));
                    // $("#flip").removeClass("hide");
                    document.getElementById("flip").style.display = "block";
                    document.getElementById("book_cover").remove();
                }
                // document.getElementById("pagination").style.display = "flex";
                // document.getElementsByClassName("pagination").style.display = "flex";
            }, index);
        }
    });
</script>

<?php
wp_enqueue_script('flipbook-js', get_stylesheet_directory_uri() . ('/js/flipbook.js'), array('jquery'), rand(10, 500), true);
?>