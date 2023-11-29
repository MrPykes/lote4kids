jQuery(document).ready(function ($) {
  $(".single-video-page .select-filter span").on("click", function () {
    $(".select-filter span.active").removeClass("active");
    $(this).addClass("active");
    filter_video();
  });
  $(".single-video-page #filter-tags").on("change", function () {
    filter_video();
  });

  var search = false;
  $(".single-video-page .filter-by-title input").on("keyup", function () {
    if ($(".filter-by-title input").val().length >= 2) {
      filter_video();
      search = true;
    } else if (
      $(".filter-by-title input").val().length == 0 &&
      search == true
    ) {
      filter_video();
      search = false;
    }
  });

  function filter_video() {
    const language = $("#gtranslate_wrapper img").attr("alt");
    const language_details = JSON.parse($("#language_details").text());
    const language_details_sorted = language_details.sort(function (a, b) {
      switch ($(".select-filter span.active").data("value")) {
        case "a-z":
          return a.title.localeCompare(b.title);
          break;
        case "z-a":
          return b.title.localeCompare(a.title);
          break;
        case "latest-release":
          return b.date - a.date;
          break;
        case "most-popular":
          return b.views - a.views;
          break;
        default:
          break;
      }
    });

    let language_details_sorted_tags = "";
    if (
      $(".filter-by-title input").val() ||
      $("#filter-tags").find(":selected").text()
    ) {
      let title = true;
      language_details_sorted_tags = language_details_sorted.filter((elem) => {
        if ($(".filter-by-title input").val()) {
          title = elem.title
            .toLowerCase()
            .includes($(".filter-by-title input").val().toLowerCase());
        }
        let index = 0;
        if (
          $("#filter-tags").find(":selected").text() &&
          $("#filter-tags").find(":selected").text() != "All"
        ) {
          if (elem.filterTag) {
            const split = elem.filterTag.replace(/\s/g, "").split(",");
            index = split.indexOf(
              $("#filter-tags").find(":selected").text().replace(/\s/g, "")
            );
          }
        }
        if (elem.title.length == 0) {
          title == true;
        }
        return index >= 0 && title == true;
      });
    } else {
      language_details_sorted_tags = language_details_sorted;
    }
    let data = "";
    data = "";
    language_details_sorted_tags.map((elem) => {
      data += `
         <div class="x-col">
            <h1 class="h-custom-headline h5">`;
      if (elem._title_language) {
        data += `<p><b>${elem._title_language}</b></p>`;
        data += elem.title ? `<p>${elem.title}</p>` : "";
      } else {
        data += `<p><b>${elem.title}</b></p>`;
      }
      data += elem.reading_level
        ? `<p class='reading_level'>(${elem.reading_level})</p>`
        : "";
      data += ` </h1>
            <span class="e12834-73 x-image x-effect-exit" data-x-effect="{&quot;offsetTop&quot;:&quot;10%&quot;,&quot;offsetBottom&quot;:&quot;10%&quot;,&quot;behaviorScroll&quot;:&quot;fire-once&quot;}">
                <img src="${elem.imageUrl}" width="200" height="150" alt="${elem.title}">
            </span>
            <hr class="x-line">
            <div class="post-content-button">
                <div class="wrapper">
                    `;
      if (elem._button_details) {
        index = 0;
        elem._button_details.forEach((btn) => {
          index++;
          const origin = window.origin;
          let btnLink = btn._button_link;
          let status = "";
          let href = "";
          if (btnLink) {
            href = 'href="' + btnLink + '"';
          } else {
            status = "inactive";
          }
          // if (btn._button_name == "Bilingual" || btn._button_name == "BSL") {
          //   data += `<br>`;
          // }
          data += `
                                          <a class="x-anchor x-anchor-button ${status}" tabindex="0" ${href}>
                                              <div class="x-anchor-content">
                                                  <div class="x-anchor-text">
                                                      <span class="x-anchor-text-primary">${btn._button_name}</span>
                                                  </div>
                                              </div>
                                          </a>
                                        `;
          if (index > 0 && index % 2 == 0) {
            data += `<br>`;
          }
        });
      }
      data += `
                </div>
            </div>
        </div>  
      `;
    });

    $(".post-content .main .x-row-inner").html(data);
  }

  $(".member-home-page .select-filter span").on("click", function () {
    $(".select-filter span.active").removeClass("active");
    $(this).addClass("active");
    filter_language();
  });

  var search = false;
  $(".member-home-page .filter-by-title input").on("keyup", function () {
    if ($(".filter-by-title input").val().length >= 2) {
      filter_language();
      search = true;
    } else if (
      $(".filter-by-title input").val().length == 0 &&
      search == true
    ) {
      filter_language();
      search = false;
    }
  });

  function filter_language() {
    const language = $("#gtranslate_wrapper img").attr("alt");
    const language_details = JSON.parse($("#language_details").text());
    const language_details_sorted = language_details.sort(function (a, b) {
      switch ($(".select-filter span.active").data("value")) {
        case "a-z":
          return a.title.localeCompare(b.title);
          break;
        case "z-a":
          return b.title.localeCompare(a.title);
          break;
        case "latest-release":
          return b.id - a.id;
          break;
        case "most-popular":
          return b.views - a.views;
          break;
        default:
          break;
      }
    });

    let language_details_sorted_tags = "";
    if ($(".filter-by-title input").val()) {
      let title = true;
      language_details_sorted_tags = language_details_sorted.filter((elem) => {
        if ($(".filter-by-title input").val()) {
          title = elem.title
            .toLowerCase()
            .includes($(".filter-by-title input").val().toLowerCase());
        }
        let index = 0;

        if (
          $("#filter-tags").find(":selected").text() &&
          $("#filter-tags").find(":selected").text() != "All"
        ) {
          const split = elem.filterTag.replace(/\s/g, "").split(",");
          index = split.indexOf(
            $("#filter-tags").find(":selected").text().replace(/\s/g, "")
          );
        }
        if (elem.title.length == 0) {
          title == true;
        }
        return index >= 0 && title == true;
      });
    } else {
      language_details_sorted_tags = language_details_sorted;
    }

    let data = "";
    data = "";
    language_details_sorted_tags.map((elem) => {
      data += `
       <div class="x-col">
        <a class="x-img" href="${elem.slug}" title="Picture books in ${elem.title}">
            <img src="${elem.imageUrl}" width="${elem.width}" height="${elem.height}" alt="${elem.title}">
        </a>
        <div class="x-text cs-ta-center">
            <p class="hp-flag"><strong>${elem._title_language}</strong><br>
                ${elem.title}</p>
        </div>
      </div>
                `;
    });

    $(".post-content .main .x-row-inner").html(data);
  }

  // var fd = new FormData();
  // fd.append("action", action);
  // fd.append(
  //   "filterbycategory",
  //   $(".select-filter span.active").data("value")
  // );
  // fd.append("filterbytitle", $(".filter-by-title input").val());
  // fd.append("language", $(".post-content").data("language"));
  // fd.append("filter_tag", $("#filter-tags").find(":selected").val());
  // $.ajax({
  //   type: "POST",
  //   dataType: "html",
  //   url: myAjax.ajaxurl,
  //   data: fd,
  //   contentType: false,
  //   processData: false,
  //   beforeSend: function () {
  //     $(".ajax-loader").addClass("loading");
  //   },
  //   success: function (response) {
  //     $(".post-content .main .x-row-inner").html(response);
  //     doGTranslate("en|" + language);
  //     return false;
  //   },
  //   complete: function () {
  //     $(".ajax-loader").removeClass("loading");
  //   },
  // });

  // $(".select-filter span").on("click", function () {
  //   const class_name = $("body").attr("class").split(/\s+/);
  //   const page_id = parseInt(class_name[4].replace(/[^0-9.]/g, ""));
  //   const button_clicked = $(this).data("value");
  //   const data = {
  //     action: "filter_language",
  //     button_clicked,
  //     page_id,
  //   };

  // $.ajax({
  //   type: "post",
  //   dataType: "json",
  //   url: my_ajax_object.ajax_url,
  //   data: data,
  //   beforeSend: function () {
  //     $(".ajax-loader").addClass("loading");
  //   },
  //   success: function (data) {},
  //   complete: function () {
  //     $(".ajax-loader").removeClass("loading");
  //   },
  // });
  // });

  $(document).on("click", "#post-20138 .x-anchor-button", function () {
    var fd = new FormData();
    fd.append("action", "marketing_collateral_events");
    fd.append("link_clicked", $(this).find("span").text());
    fd.append("post_category", $("article").attr("id"));
    fd.append("post_category_ext", $(this).parent().find("h1").text());
    fd.append("page_title", $(this).attr("id"));
    jQuery.ajax({
      type: "POST",
      dataType: "json",
      url: "/wp-admin/admin-ajax.php",
      data: fd,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
      },
    });
  });

  $(document).on("click", "#download-activity", function () {
    var fd = new FormData();
    fd.append("action", "get_activities_log");
    fd.append("activity_name", $(".page-title").text());
    fd.append("activity_title", $(this).attr("title"));
    fd.append("activity_type", "Download");
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/wp-admin/admin-ajax.php",
      data: fd,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
      },
    });
  });
  $(document).on("click", "#download-activity-sidebar", function () {
    var fd = new FormData();
    fd.append("action", "get_activities_log");
    fd.append("activity_name", $(this).data("activity"));
    fd.append("activity_title", $(".page-title").text());
    fd.append("activity_type", "Download");
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/wp-admin/admin-ajax.php",
      data: fd,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
      },
    });
  });

  /* ***********/
  /* FLIPBOOK */
  /* ***********/

  // var numPanels = 0;
  // var zIdx = 0;
  // var currentPanel = "";
  // var startNumPanel = false;
  // var lastNumPanel = false;
  // var backNumPanel = 0;
  // var check_el = setInterval(function () {
  //   if (isPanelLoad == true) {
  //     // numPanels = $(".panel").length;
  //     numPanels = panelCount;
  //     backNumPanel = $(".back").length;
  //     console.log("panelCount", panelCount);
  //     console.log("backNumPanel", backNumPanel);

  //     for (i = 0; i < numPanels; i++) {
  //       zIdx = numPanels - i;
  //       $(".panel").eq(i).css("z-index", zIdx);
  //       $(".panel").eq(i).data("zIdx", zIdx);
  //     }

  //     function checkZ($aPanel) {
  //       currentPanel = $aPanel.data("id");

  //       if ($aPanel.hasClass("open")) {
  //         setTimeout(function () {
  //           $aPanel.css("z-index", "1");
  //         }, 500);
  //       } else {
  //         zIdx = $aPanel.data("zIdx");
  //         $aPanel.css("z-index", zIdx);
  //       }

  //       if (currentPanel == 1 && startNumPanel == true) {
  //         $(".book").css("transform", "translateX(0)");
  //         startNumPanel = false;
  //       } else if (currentPanel == numPanels && lastNumPanel == true) {
  //         $(".book").css("transform", "translateX(700px)");
  //         lastNumPanel = false;
  //       } else {
  //         $(".book").css("transform", "translateX(365px)");
  //         startNumPanel = true;
  //         lastNumPanel = true;
  //       }
  //     }

  //     $(".panel").on("click", ".front", function () {
  //       $(this).parent(".panel").toggleClass("open");
  //       const panelOpenCount = $(".panel.open");
  //       pageId = panelOpenCount.length;
  //       buttonArrow(pageId + 1);
  //       resetAudio(pageId);
  //       hasAudio(pageId);
  //       checkZ($(this).parent(".panel"));
  //     });
  //     $(".panel").on("click", ".back", function () {
  //       $(this).parent(".panel").toggleClass("open");
  //       const panelOpenCount = $(".panel.open");
  //       pageId = panelOpenCount.length;
  //       buttonArrow(pageId + 1);
  //       resetAudio(pageId + 2);
  //       hasAudio(pageId);
  //       checkZ($(this).parent(".panel"));
  //     });

  //     var isNext = false;
  //     // var pageId = 0;
  //     $(document).on("click", "#next-btn", function () {
  //       const panelOpenCount = $(".panel.open");
  //       pageId = panelOpenCount.length + 1;
  //       buttonArrow(pageId + 1);
  //       hasAudio(pageId);
  //       resetAudio(pageId);
  //       if ($(".panel").hasClass("open")) {
  //         if (numPanels >= pageId) {
  //           $("#p" + pageId).toggleClass("open");
  //           checkZ($("#p" + pageId));
  //         }
  //       } else {
  //         $("#p1").toggleClass("open");
  //         checkZ($("#p1"));
  //       }
  //       isNext = true;
  //     });

  //     $(document).on("click", "#prev-btn", function () {
  //       if ($(".panel").hasClass("open")) {
  //         const panelOpenCount = $(".panel.open");
  //         pageId = panelOpenCount.length;
  //         buttonArrow(pageId);
  //         resetAudio(pageId + 1);
  //         hasAudio(pageId);
  //         $("#p" + pageId).toggleClass("open");
  //         checkZ($("#p" + pageId));
  //       }
  //       isNext = false;
  //     });

  //     let nextSlide = (pageId, delay) => {
  //       // Set the delay on the slide
  //       setTimeout(() => {
  //         if (panelCount == pageId) return;
  //         pageId !== panelCount ? pageId++ : (pageId = 1);
  //         delay = $(".s" + pageId).data("duration");
  //         // Call this function recursively
  //         $("#p" + pageId).toggleClass("open");
  //         checkZ($("#p" + pageId));
  //         playAudio(pageId);
  //         nextSlide(pageId, (delay ? delay : 2) * 1000);
  //       }, delay);
  //     };
  //     // Slide Play
  //     var myTimeoutNext;
  //     var myTimeoutPrev;
  //     $(document).on("click", "#play-btn", function () {
  //       const panelOpenCount = $(".panel.open");
  //       pageId = panelOpenCount.length;

  //       if (pageId == 0) {
  //         pageId = 1;
  //       } else {
  //         pageId = pageId + 1;
  //       }
  //       console.log("play", pageId);
  //       hideAudio();
  //       playAudio(pageId);
  //       buttonPausePlay();
  //     });

  //     // $(".s2 audio").on("play", function () {
  //     //   console.log("this", this);
  //     //   console.log("this", $(".s2 audio").mediaelementplayer());
  //     //   // $("#s2").setCurrentTime(0);
  //     //   $(".s2 audio").mediaelementplayer({
  //     //     before: function (q, e) {
  //     //       console.log(q, e);
  //     //     },
  //     //     success: function (mediaElement, domObject) {
  //     //       console.log(mediaElement);
  //     //       mediaElement.setVolume(1.0);
  //     //       mediaElement.setCurrentTime(0);
  //     //     },
  //     //   });
  //     // });

  //     let autoPlay = () => {
  //       const panelOpenCount = $(".panel.open");
  //       const pageId = panelOpenCount.length;
  //       const currentPageId = pageId ? pageId : 0;
  //       if (isNext == true || currentPageId == 1 || currentPageId == 0) {
  //         for (i = currentPageId; i < numPanels; i++) {
  //           const pageId = i + 1;
  //           myTimeoutNext = setTimeout(function () {
  //             $("#p" + pageId).toggleClass("open");
  //             checkZ($("#p" + pageId));
  //             playAudio(pageId);
  //           }, 3000 * i);
  //         }
  //       } else if (isNext == false || currentPageId == numPanels) {
  //         for (let i = currentPageId; i > 0; i--) {
  //           myTimeoutPrev = setTimeout(function () {
  //             $("#p" + i).toggleClass("open");
  //             checkZ($("#p" + i));
  //             playAudio(i);
  //           }, 3000 * (currentPageId - i));
  //         }
  //       }
  //     };
  //     let playAudio = (pageId) => {
  //       // if (!$(".s" + pageId).hasClass("hide")) {
  //       //   $(".s" + pageId).addClass("hide");
  //       //   // $(".s" + pageId)
  //       //   //   .find(".mejs-playpause-button")
  //       //   //   .children("button")
  //       //   //   .trigger("click");
  //       // }
  //       // pageId = pageId + 1;

  //       // $(".s" + pageId - 1 + " audio")[0].setCurrentTime(0);
  //       // $(".s" + pageId + " audio")[0].play();
  //       $(".s" + pageId)
  //         .find(".mejs-playpause-button")
  //         .children("button")
  //         .trigger("click");
  //       if ($(".s" + pageId).hasClass("hide")) {
  //         $(".s" + pageId).removeClass("hide");
  //       }
  //       durationTime = setInterval(function () {
  //         if (
  //           $(".s" + pageId + " audio")[0].getCurrentTime() >=
  //           $(".s" + pageId + " audio")[0].getDuration()
  //         ) {
  //           clearInterval(durationTime);
  //           $(".dashicons-controls-play").removeClass("hide");
  //           $(".dashicons-controls-pause").addClass("hide");
  //         }
  //       }, 100);
  //     };

  //     let buttonPausePlay = () => {
  //       $(".dashicons-controls-pause").toggleClass("hide");
  //       $(".dashicons-controls-play").toggleClass("hide");

  //       // myTimeoutPrev = setTimeout(function () {
  //       //   const duration = $(".s" + pageId).find(".mejs-duration");
  //       //   const currentTime = $(".s" + pageId).find(".mejs-currenttime");
  //       // }, 1000);
  //     };
  //     let buttonArrow = (currentPanel) => {
  //       if (currentPanel == 1 || currentPanel == 0) {
  //         $("#prev-btn").addClass("hide");
  //         $("#next-btn").removeClass("hide");
  //       } else if (numPanels + 1 == currentPanel) {
  //         $("#next-btn").addClass("hide");
  //         $("#prev-btn").removeClass("hide");
  //       } else {
  //         $("#prev-btn").removeClass("hide");
  //         $("#next-btn").removeClass("hide");
  //       }
  //     };
  //     let hasAudio = (pageId) => {
  //       pageId = pageId + 1;
  //       hideAudio();
  //       if ($(".s" + pageId).length > 0) {
  //         $(".play-btn").removeClass("hide");
  //       }
  //     };
  //     let hideAudio = () => {
  //       $(".audio > div").map((index, elem) => {
  //         $(elem).addClass("hide");
  //       });
  //     };
  //     let resetAudio = (pageId) => {
  //       if ($(".s" + pageId + " audio").length > 0) {
  //         $(".s" + pageId + " audio")[0].setCurrentTime(0);
  //         $(".s" + pageId + " audio")[0].pause();
  //       }

  //       if ($(".dashicons-controls-play").hasClass("hide")) {
  //         $(".dashicons-controls-play").removeClass("hide");
  //         $(".dashicons-controls-pause").addClass("hide");
  //       }
  //       // pageId = pageId + 1;
  //       // console.log(pageId);
  //       // console.log($(".s" + pageId).find(".mejs-currenttime"));
  //       // $(".s" + pageId)
  //       //   .find(".mejs-currenttime")
  //       //   .attr("aria-valuenow", 0);
  //       // $(".s" + pageId)
  //       //   .find(".mejs-currenttime")
  //       //   .attr("aria-valuetext", 0);
  //       // $(".s" + pageId)
  //       //   .find(".mejs-currenttime")
  //       //   .text("00:00");
  //     };

  //     // Full Screen
  //     $(document).on("click", ".dashicons-editor-expand", function () {
  //       var el = $("#flip")[0];
  //       el.requestFullscreen();
  //     });

  //     // Exit Full Screen
  //     $(document).on("click", ".dashicons-editor-contract", function () {
  //       var elem = document.documentElement;
  //       if (document.exitFullscreen) {
  //         document.exitFullscreen();
  //       } else if (document.mozCancelFullScreen) {
  //         document.mozCancelFullScreen();
  //       } else if (document.webkitExitFullscreen) {
  //         document.webkitExitFullscreen();
  //       }
  //     });

  //     $;
  //     clearInterval(check_el);
  //   }
  // }, 200);
});
