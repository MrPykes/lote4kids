(function ($) {
  $(document).ready(function () {
    jQuery(window)
      .resize(function () {
        if (
          jQuery(".page-id-12626").length ||
          jQuery(".page-id-12526").length
        ) {
          var iframe_height = jQuery(".iframe-1").height();
          var header_height = jQuery(".masthead").height();
          var sidebar_width = jQuery(".x-widget-area").width() + 35;

          var screenwidth = jQuery(window).width();
          if (screenwidth <= 767) {
            var totalHeight = iframe_height + 70;
          } else {
            var totalHeight = iframe_height + header_height + 90;
          }
          jQuery(".yasr-visitor-votes")
            .css("position", "absolute")
            .css("top", totalHeight)
            .css("right", sidebar_width);
        }

        if (jQuery(".postid-18691").length) {
          var iframe_height = jQuery(".iframe-1").height();
          var header_height = jQuery(".masthead").height();

          var screenwidth = jQuery(window).width();
          if (screenwidth <= 767) {
            var totalHeight = iframe_height + 130;
          } else {
            var totalHeight = iframe_height + header_height + 150;
          }

          jQuery(".yasr-visitor-votes")
            .css("position", "absolute")
            .css("top", totalHeight)
            .css("left", "calc(80% - 395px)");
        }

        if (jQuery(".page-id-12510").length) {
          var iframe_height = jQuery(".iframe-2").height();
          var header_height = jQuery(".masthead").height();
          var sidebar_width = jQuery(".x-widget-area").width() + 35;

          var screenwidth = jQuery(window).width();
          if (screenwidth <= 767) {
            var totalHeight = iframe_height + 70;
          } else {
            var totalHeight = iframe_height + header_height + 90;
          }
          jQuery(".yasr-visitor-votes")
            .css("position", "absolute")
            .css("top", totalHeight)
            .css("right", sidebar_width);
        }
      })
      .trigger("resize");

    function delay(callback, ms) {
      var timer = 0;
      return function () {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback.apply(context, args);
        }, ms || 0);
      };
    }
    jQuery(document).on(
      "keyup",
      ".search-login",
      delay(function () {
        if (jQuery(".search-login").val().length >= 3) {
          var json_data = jQuery(".login-json-data").data("json");
          console.log(json_data);
          var content = "";
          jQuery(".search-login").css("border", "1px solid #ddd");
          jQuery(".go-login").removeAttr("data-url");
          for (var i = 0; i < json_data.length; i++) {
            if (typeof json_data[i].title !== "undefined") {
              var title = json_data[i].title;
              var permalink = json_data[i].link;
              var search = jQuery(".search-login").val();
              if (title.toUpperCase().indexOf(search.toUpperCase()) !== -1) {
                content +=
                  '<span class="lote-dropdown-login-item" data-url="/' +
                  permalink +
                  '">' +
                  title +
                  "</span>";
              }
            }
          }
          jQuery(".lote-dropdown-login").html(content).fadeIn();
        } else {
          jQuery(".lote-dropdown-login").fadeOut();
        }
      }, 500)
    );

    jQuery(document).on("click", ".lote-dropdown-login-item", function () {
      var label = jQuery(this).text();
      var url = jQuery(this).data("url");
      jQuery(".lote-dropdown-login").hide();
      jQuery(".search-login").val(label);
      jQuery(".go-login").attr("data-url", url);
      return false;
    });

    jQuery(document).on("click", ".go-login", function () {
      var attr = jQuery(this).attr("data-url");

      // For some browsers, `attr` is undefined; for others,
      // `attr` is false.  Check for both.
      if (typeof attr !== "undefined" && attr !== false) {
        window.location = attr;
      } else {
        jQuery(".search-login").css("border", "1px solid red");
      }
      return false;
    });
    jQuery(document).click(function () {
      jQuery(".lote-dropdown-login").hide();
    });

    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
    function eraseCookie(name) {
      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }

    // if (jQuery(".x-anchor-button").length) {
    //   var flag = false;
    //   var flag1 = false;
    //   var slug_arr = [];
    //   var slug_arr_1 = [];
    //   var slug_arr_reverse = [];
    //   var slug_arr2 = [];
    //   var slug_arr2_1 = [];
    //   var slug_arr3 = [];
    //   var title_arr = [];
    //   var ctr = 0;

    //   jQuery(".x-anchor-button").each(function () {
    //     if (!jQuery(this).hasClass("x-hide-lg")) {
    //       if (jQuery(this).find(".x-anchor-text-primary").text() == "English") {
    //         // <div class="tags-filter"><span>Filter By Tags: </span><select><option selected disabled>Select Tags</option></select></div>
    //         var content =
    //           '<div class="filter-videos-wrap"><div class="filter-by">Sort By: </div><div class="filter-options"><div class="select-filter"><i style="display: none;">Sort By: </i><span class="active" data-value="default">Default</span><span data-value="latest-release">Latest Release</span><span data-value="most-popular">Most Popular</span><span data-value="a-z">Sort A - Z</span><span data-value="z-a">Sort Z - A</span></div></div><img class="ajax-loader" src="https://lote4kids.com/wp-content/uploads/2021/09/ajax-loader3.gif" /></div>';
    //         jQuery(".h-custom-headline.cs-ta-center.header-title.h3").after(
    //           content
    //         );
    //         return false;
    //       }
    //       if (jQuery(".page-id-18673").length) {
    //       } else {
    //         if (
    //           jQuery(this).find(".x-anchor-text-primary").text() == "Click Here"
    //         ) {
    //           var content =
    //             '<div class="filter-videos-wrap"><div class="filter-options era-poc"><div class="select-filter"><span class="filter-by-span era-filter" style="border: 0 !important; margin-right: 0 !important;">Filter By:</span><span class="active era-filter" data-value="all">All</span></div></div></div>';
    //           jQuery(
    //             ".h-custom-headline.cs-ta-center.header-title.h3:eq(0)"
    //           ).after(content);
    //           var h_ctr = 0;
    //           var era_filter_button = jQuery(".era-filter-button").attr("id");
    //           var split_era_button = era_filter_button.split("_");

    //           for (var i = 0; i < split_era_button.length; i++) {
    //             var era_button_loop = split_era_button[i];
    //             var option =
    //               '<span class="era-filter" data-value="' +
    //               era_button_loop.replace(/[^a-zA-Z ]/g, "").replace(" ", "") +
    //               '">' +
    //               split_era_button[i] +
    //               "</span>";
    //             jQuery(".select-filter").append(option);
    //           }

    //           return false;
    //         }
    //       }
    //     }
    //   });

    //   jQuery(".x-anchor-button").each(function () {
    //     if (!jQuery(this).hasClass("x-hide-lg")) {
    //       if (
    //         jQuery(this).find(".x-anchor-text-primary").text() == "Bilingual"
    //       ) {
    //         var href1 = jQuery(this).attr("href");
    //         if (href1.indexOf("http") !== -1) {
    //           var temp1 = href1.split("/");
    //           href1 = temp1[4];
    //         }
    //         if (jQuery(this).prev().prev().length) {
    //           var attr = jQuery(this).prev().prev().attr("href");

    //           if (typeof attr !== "undefined" && attr !== false) {
    //             var href2 = jQuery(this).prev().prev().attr("href");
    //           } else {
    //             var href2 = jQuery(this).prev().prev().prev().attr("href");
    //           }
    //           console.log(href2);
    //           if (href2.indexOf("http") !== -1) {
    //             var temp2 = href2.split("/");
    //             href2 = temp2[4];
    //           }
    //           flag1 = true;
    //         }
    //         console.log(href2);
    //         slug_arr3.push(href1 + "|" + href2);
    //       }
    //     }
    //   });

    //   jQuery(".x-anchor-button").each(function () {
    //     if (!jQuery(this).hasClass("x-hide-lg")) {
    //       if (
    //         jQuery(this).find(".x-anchor-text-primary").text() == "English" ||
    //         jQuery(this).hasClass("target-button") ||
    //         jQuery(this).find(".x-anchor-text-primary").text() == "Click Here"
    //       ) {
    //         if (jQuery(this).hasClass("target-button")) {
    //           jQuery(this).closest(".x-row").addClass("custom-video-link");
    //           var href1 = jQuery(this).attr("href");
    //           if (href1.indexOf("http") !== -1) {
    //             var temp1 = href1.split("/");
    //             href1 = temp1[4];
    //             var href2 = "";
    //             flag = true;
    //             slug_arr2.push(href2);
    //             slug_arr2_1.push(href2);
    //           }
    //         } else {
    //           jQuery(this).closest(".x-row").addClass("custom-video-link");
    //           var href1 = jQuery(this).attr("href");
    //           if (jQuery(this).prev("a").length) {
    //             var href2 = jQuery(this).prev("a").attr("href");
    //             if (href2.indexOf("http") !== -1) {
    //               var temp2 = href2.split("/");
    //               href2 = temp2[4];
    //             }
    //             flag = true;
    //             slug_arr2.push(href2);
    //             slug_arr2_1.push(href2);
    //           }
    //           if (href1.indexOf("http") !== -1) {
    //             var temp1 = href1.split("/");
    //             href1 = temp1[4];
    //           }
    //         }

    //         slug_arr.push(href1);
    //         slug_arr_1.push(href1);
    //         slug_arr_reverse.push(href1);
    //         //console.log(jQuery(this).prev('a').attr('href'));
    //         title_arr.push(jQuery(this).closest(".x-col").find("h1 b").text());
    //         jQuery(this)
    //           .closest(".x-container")
    //           .find(" > .x-row-inner > .x-col:nth-child(1)")
    //           .addClass("active-col");
    //       }
    //     }
    //   });

    //   jQuery(".active-col").append(
    //     '<div class="x-row row-second"><div class="x-row-inner x-row-inner-second"></div></div>'
    //   );
    //   jQuery(".active-col").append(
    //     '<div class="x-row row-third"><div class="x-row-inner x-row-inner-third"></div></div>'
    //   );
    //   jQuery(".active-col").append(
    //     '<div class="x-row row-4th"><div class="x-row-inner x-row-inner-4th"></div></div>'
    //   );
    //   jQuery(".active-col").append(
    //     '<div class="x-row row-5th"><div class="x-row-inner x-row-inner-5th"></div></div>'
    //   );
    //   jQuery(".active-col").append(
    //     '<div class="x-row row-tags"><div class="x-row-inner x-row-inner-tags"></div></div>'
    //   );

    //   slug_arr_reverse.sort().reverse();
    //   slug_arr.sort();

    //   console.log(slug_arr);

    //   if (flag) {
    //     slug_arr2.sort();
    //   }

    //   //console.log(slug_arr3);

    //   //console.log(slug_arr_reverse);
    //   //    console.log(slug_arr_1);
    //   //    console.log(slug_arr2_1);

    //   for (var i = 0; i < slug_arr.length; i++) {
    //     jQuery(".x-anchor-button").each(function () {
    //       if (!jQuery(this).hasClass("x-hide-lg")) {
    //         if (
    //           jQuery(this).find(".x-anchor-text-primary").text() == "English" ||
    //           jQuery(this).hasClass("target-button")
    //         ) {
    //           var href1 = jQuery(this).attr("href");
    //           if (href1.indexOf("http") !== -1) {
    //             var temp1 = href1.split("/");
    //             href1 = temp1[4];
    //           }

    //           if (
    //             slug_arr[i] == href1 &&
    //             jQuery(this).closest(".x-row").hasClass("custom-video-link")
    //           ) {
    //             var html = jQuery(this)
    //               .closest(".x-col")
    //               .wrap("<div class='test'></div>")
    //               .html();
    //             html = '<div class="x-col">' + html + "</div>";
    //             jQuery(".x-row-inner-second").append(html);
    //           }
    //         }
    //       }
    //     });
    //   }

    //   for (var i = 0; i < slug_arr_reverse.length; i++) {
    //     jQuery(".x-anchor-button").each(function () {
    //       if (!jQuery(this).hasClass("x-hide-lg")) {
    //         if (
    //           jQuery(this).find(".x-anchor-text-primary").text() == "English" ||
    //           jQuery(this).hasClass("target-button")
    //         ) {
    //           var href1 = jQuery(this).attr("href");
    //           if (href1.indexOf("http") !== -1) {
    //             var temp1 = href1.split("/");
    //             href1 = temp1[4];
    //           }

    //           if (
    //             slug_arr_reverse[i] == href1 &&
    //             jQuery(this).closest(".x-row").hasClass("custom-video-link")
    //           ) {
    //             var html = jQuery(this).closest(".x-col").html();
    //             html = '<div class="x-col">' + html + "</div>";
    //             jQuery(".x-row-inner-4th").append(html);
    //           }
    //         }
    //       }
    //     });
    //   }

    //   var fd = new FormData();

    //   fd.append("action", "get_event_custom_fields");
    //   fd.append("slug_arr", slug_arr_1);

    //   if (flag) {
    //     fd.append("slug_arr2", slug_arr2_1);
    //   }

    //   if (flag1) {
    //     fd.append("slug_arr3", slug_arr3);
    //   }

    //   fd.append("title_arr", title_arr);

    //   jQuery.ajax({
    //     type: "POST",
    //     dataType: "json",
    //     url: "/wp-admin/admin-ajax.php",
    //     data: fd,
    //     contentType: false,
    //     processData: false,
    //     success: function (response) {
    //       console.log(response.tags);

    //       jQuery.each(response.tags, function (key, value) {
    //         var tags_arr = value.split("|");
    //         var options =
    //           '<option value="' +
    //           tags_arr[0] +
    //           '">' +
    //           tags_arr[1] +
    //           "</option>";
    //         jQuery(".tags-filter select").append(options);
    //       });

    //       var new_arr = [];

    //       for (var i = 0; i < response.views.length; i++) {
    //         var video_url = response.views[i].split("|");
    //         new_arr.push(parseInt(video_url[0]));
    //       }

    //       new_arr
    //         .sort(function (a, b) {
    //           return a - b;
    //         })
    //         .reverse();

    //       var new_arr2 = [];

    //       for (var i = 0; i < new_arr.length; i++) {
    //         for (var j = 0; j < response.views.length; j++) {
    //           var video_url = response.views[j].split("|");
    //           if (new_arr[i] == video_url[0]) {
    //             //console.log(response.views[j]);
    //             new_arr2.push(response.views[j]);
    //             response.views.splice(j, 1);
    //           }
    //         }
    //       }

    //       //console.log(new_arr2);

    //       for (var i = 0; i < new_arr2.length; i++) {
    //         var video_url = new_arr2[i].split("|");
    //         jQuery(".x-anchor-button").each(function () {
    //           if (!jQuery(this).hasClass("x-hide-lg")) {
    //             if (
    //               jQuery(this).find(".x-anchor-text-primary").text() ==
    //                 "English" ||
    //               jQuery(this).hasClass("target-button")
    //             ) {
    //               var href1 = jQuery(this).attr("href");
    //               if (href1.indexOf("http") !== -1) {
    //                 var temp1 = href1.split("/");
    //                 href1 = temp1[4];
    //               }
    //               if (
    //                 video_url[1] == href1 &&
    //                 jQuery(this).closest(".x-row").hasClass("custom-video-link")
    //               ) {
    //                 var html = jQuery(this).closest(".x-col").html();
    //                 html =
    //                   '<div class="x-col ' +
    //                   video_url[2] +
    //                   '">' +
    //                   html +
    //                   "</div>";
    //                 jQuery(".x-row-inner-third").append(html);
    //                 jQuery(".x-row-inner-tags").append(html);
    //               }
    //             }
    //           }
    //         });
    //       }

    //       for (var i = 0; i < response.publish_date.length; i++) {
    //         var publish_date = response.publish_date[i].split("|");
    //         jQuery(".x-anchor-button").each(function () {
    //           if (!jQuery(this).hasClass("x-hide-lg")) {
    //             if (
    //               jQuery(this).find(".x-anchor-text-primary").text() ==
    //                 "English" ||
    //               jQuery(this).hasClass("target-button")
    //             ) {
    //               var href1 = jQuery(this).attr("href");
    //               if (href1.indexOf("http") !== -1) {
    //                 var temp1 = href1.split("/");
    //                 href1 = temp1[4];
    //               }
    //               if (
    //                 publish_date[1] == href1 &&
    //                 jQuery(this).closest(".x-row").hasClass("custom-video-link")
    //               ) {
    //                 var html = jQuery(this).closest(".x-col").html();
    //                 html = '<div class="x-col">' + html + "</div>";
    //                 jQuery(".x-row-inner-5th").append(html);
    //               }
    //             }
    //           }
    //         });
    //       }

    //       //jQuery('.ajax-loader').hide();
    //       jQuery(".select-filter").fadeIn();

    //       //        var x = getCookie('sort');
    //       //        console.log(x);
    //       //        if(x !== null) {
    //       //           jQuery('.select-filter span').each(function(){
    //       //            if(x == jQuery(this).data('value')) {
    //       //              jQuery(this)[0].click();
    //       //            }
    //       //          });
    //       //        }
    //     },
    //   });
    //   var x1 = 0;
    //   jQuery(document).on("click", ".select-filter span", function () {
    //     var val = jQuery(this).attr("data-value");
    //     setCookie("sort", val, 1);
    //     console.log(jQuery(this).val());

    //     if (!jQuery(this).hasClass("era-filter")) {
    //       if (!jQuery(this).hasClass("active")) {
    //         jQuery(".select-filter span").removeClass("active");
    //         jQuery(this).addClass("active");

    //         if (val == "a-z") {
    //           jQuery(".active-col .x-row:not(:first-child)")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           jQuery(
    //             ".active-col .x-row:not(:first-child) .x-row-inner .x-col img"
    //           )
    //             .removeClass("active")
    //             .addClass("inactive");
    //           jQuery(".active-col .x-gap")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           setTimeout(function () {
    //             jQuery(".row-second")
    //               .css("position", "relative")
    //               .css("left", "0");
    //             setTimeout(function () {
    //               jQuery(".x-row-inner-second .x-col img").addClass("active");
    //             }, 500);
    //           }, 200);
    //         } else if (val == "z-a") {
    //           jQuery(".active-col .x-row:not(:first-child)")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           jQuery(
    //             ".active-col .x-row:not(:first-child) .x-row-inner .x-col img"
    //           )
    //             .removeClass("active")
    //             .addClass("inactive");
    //           jQuery(".active-col .x-gap")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           setTimeout(function () {
    //             jQuery(".row-4th").css("position", "relative").css("left", "0");
    //             setTimeout(function () {
    //               jQuery(".x-row-inner-4th .x-col img").addClass("active");
    //             }, 500);
    //           }, 200);
    //         } else if (val == "latest-release") {
    //           jQuery(".active-col .x-row:not(:first-child)")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           jQuery(
    //             ".active-col .x-row:not(:first-child) .x-row-inner .x-col img"
    //           )
    //             .removeClass("active")
    //             .addClass("inactive");
    //           jQuery(".active-col .x-gap")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           if (x1 == 0) {
    //             jQuery(".ajax-loader").show();
    //             x1++;
    //             setTimeout(function () {
    //               jQuery(".ajax-loader").fadeOut();
    //               jQuery(".row-5th")
    //                 .css("position", "relative")
    //                 .css("left", "0");
    //               setTimeout(function () {
    //                 jQuery(".x-row-inner-5th .x-col img").addClass("active");
    //               }, 500);
    //             }, 1200);
    //           } else {
    //             setTimeout(function () {
    //               jQuery(".ajax-loader").fadeOut();
    //               jQuery(".row-5th")
    //                 .css("position", "relative")
    //                 .css("left", "0");
    //               setTimeout(function () {
    //                 jQuery(".x-row-inner-5th .x-col img").addClass("active");
    //               }, 500);
    //             }, 200);
    //           }
    //         } else if (val == "most-popular") {
    //           jQuery(".active-col .x-row:not(:first-child)")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           jQuery(
    //             ".active-col .x-row:not(:first-child) .x-row-inner .x-col img"
    //           )
    //             .removeClass("active")
    //             .addClass("inactive");
    //           jQuery(".active-col .x-gap")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           if (x1 == 0) {
    //             jQuery(".ajax-loader").show();
    //             x1++;
    //             setTimeout(function () {
    //               jQuery(".ajax-loader").fadeOut();
    //               jQuery(".row-third")
    //                 .css("position", "relative")
    //                 .css("left", "0");
    //               setTimeout(function () {
    //                 jQuery(".x-row-inner-third .x-col img").addClass("active");
    //               }, 500);
    //             }, 1200);
    //           } else {
    //             setTimeout(function () {
    //               jQuery(".ajax-loader").fadeOut();
    //               jQuery(".row-third")
    //                 .css("position", "relative")
    //                 .css("left", "0");
    //               setTimeout(function () {
    //                 jQuery(".x-row-inner-third .x-col img").addClass("active");
    //               }, 500);
    //             }, 200);
    //           }
    //         } else if (val == "default") {
    //           jQuery(".row-second")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           jQuery(".row-third")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           jQuery(".row-4th")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           jQuery(".row-5th")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");
    //           jQuery(".row-tags")
    //             .css("position", "fixed")
    //             .css("left", "-99999px");

    //           jQuery(".x-row-inner-second .x-col img").removeClass("active");
    //           jQuery(".x-row-inner-third .x-col img").removeClass("active");
    //           jQuery(".x-row-inner-4th .x-col img").removeClass("active");
    //           jQuery(".x-row-inner-5th .x-col img ").removeClass("active");
    //           jQuery(".x-row-inner-tags .x-col img  ").removeClass("active");
    //           setTimeout(function () {
    //             jQuery(".active-col .custom-video-link.x-row:not(:first-child)")
    //               .css("position", "relative")
    //               .css("left", "0");
    //             setTimeout(function () {
    //               jQuery(
    //                 ".active-col .custom-video-link.x-row:not(:first-child) .x-col img"
    //               ).addClass("active");
    //             }, 500);
    //             jQuery(".active-col .x-gap")
    //               .css("position", "relative")
    //               .css("left", "0");
    //           }, 200);
    //         }
    //       }
    //     } else {
    //       if (!jQuery(this).hasClass("active")) {
    //         jQuery(".select-filter span").removeClass("active");
    //         jQuery(this).addClass("active");
    //       }
    //       var elementClass = jQuery(this).data("value");
    //       console.log(elementClass);
    //       jQuery(".era-target").removeClass("active");
    //       setTimeout(function () {
    //         jQuery(".era-target").addClass("active");
    //       }, 500);
    //       if (elementClass == "all") {
    //         console.log("test1");
    //         jQuery(".era-target").show().css("margin-bottom", "7px");
    //         jQuery(".x-gap").show();
    //         jQuery(".hide-this").show();
    //         jQuery(
    //           ".x-row.x-container > .x-row-inner > .x-col > .x-row"
    //         ).show();
    //       } else {
    //         jQuery(".era-target").hide().css("margin-bottom", "50px");
    //         jQuery(".x-gap").hide();
    //         jQuery(".hide-this").hide();
    //         jQuery(
    //           ".x-row.x-container > .x-row-inner > .x-col > .x-row"
    //         ).hide();

    //         jQuery("h3." + elementClass).css("margin-bottom", "50px");
    //         jQuery(".filter-videos-wrap").css("margin-bottom", "50px");
    //         jQuery(".era-target").each(function () {
    //           if (jQuery(this).hasClass(elementClass)) {
    //             jQuery(this).show();
    //           }
    //         });
    //       }

    //       jQuery(
    //         ".x-row.x-container > .x-row-inner > .x-col > .x-row:eq(0)"
    //       ).show();
    //     }
    //   });

    //   if (jQuery(".era-target img").length) {
    //     jQuery(".era-target").addClass("active");
    //   }

    //   jQuery(document).on("change", ".tags-filter select", function () {
    //     var val = jQuery(this).val();
    //     jQuery(".active-col .x-row:not(:first-child)")
    //       .css("position", "fixed")
    //       .css("left", "-9999px");
    //     jQuery(".active-col .x-row:not(:first-child) .x-row-inner .x-col img")
    //       .removeClass("active")
    //       .addClass("inactive");
    //     jQuery(".active-col .x-gap")
    //       .css("position", "fixed")
    //       .css("left", "-9999px");
    //     jQuery(".row-tags .x-col").hide();
    //     jQuery(".row-tags .x-col").each(function () {
    //       if (jQuery(this).hasClass(val)) {
    //         jQuery(this).show();
    //       }
    //     });
    //     setTimeout(function () {
    //       jQuery(".row-tags").css("position", "relative").css("left", "0");
    //       setTimeout(function () {
    //         jQuery(".x-row-inner-tags .x-col img").addClass("active");
    //       }, 500);
    //     }, 200);
    //   });

    //   jQuery(document).on("change", ".era-poc-tags select", function () {
    //     var val = jQuery(this).val();
    //     if (val == "all") {
    //       // jQuery('.era-target').removeClass('hide-this');
    //       // jQuery('.x-gap').show();
    //       // jQuery('.hide-title').show();
    //       // jQuery('.era-poc-tags').css('margin-bottom', '0')
    //     } else {
    //       jQuery(".x-row");
    //       // jQuery('.era-target').addClass('hide-this');
    //       // jQuery('.'+val).removeClass('hide-this');
    //       // jQuery('.x-gap').hide();
    //       // jQuery('.hide-title').hide();
    //       // jQuery('.era-poc-tags').css('margin-bottom', '50px')
    //     }
    //   });
    // }
    var x = getCookie("sort");
    if (x == null) {
      jQuery(".custom-video-link").show();
    }

    jQuery(window)
      .resize(function () {
        var newHeight = jQuery(".iframe-1").width() * 0.565;
        jQuery(".iframe-1").attr("style", "height: " + newHeight + "px");
        jQuery("iframe").css("opacity", 1);
        jQuery(".comment-box").css("width", jQuery(".iframe-1").width());
      })
      .trigger("resize");

    jQuery(window)
      .resize(function () {
        var newHeight = jQuery(".iframe-2").width() * 0.753;
        jQuery(".iframe-2").attr("style", "height: " + newHeight + "px");
        jQuery("iframe").css("opacity", 1);
        jQuery(".comment-box").css("width", jQuery(".iframe-2").width());
      })
      .trigger("resize");

    jQuery("iframe").css("opacity", 1);

    jQuery(document).on("click", ".flipbook-counter", function () {
      jQuery(".flipbook-popup").addClass("active");
      var fd = new FormData();

      fd.append("action", "get_flipbook_click");
      fd.append("page_id", jQuery(".page-id").text());
      fd.append("page_title", jQuery(".page-title").text());
      jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "/wp-admin/admin-ajax.php",
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
          jQuery(".flipbook-clicks").html(
            '<span class="aiovg-icon-views"></span> ' + response[0] + " views"
          );
        },
      });
    });

    jQuery(document).on("click", ".close-flipbook", function () {
      jQuery(".flipbook-popup").removeClass("active");
    });

    jQuery(document).on("click", ".wpforms-submit", function () {
      setTimeout(function () {
        if (jQuery("label.wpforms-error").length) {
          var label_error = "Required fields have not been filled out";
          var ctr = 0;
          console.log(label_error);
          var fd = new FormData();

          fd.append("action", "signup_error_log");
          fd.append("full_name", "");
          fd.append("library_name", "");
          fd.append("email", "");
          fd.append("error_message", label_error);
          fd.append("page_url", jQuery(".page-url").text());
          fd.append("page_title", jQuery(".page-title").text());
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
        }
      }, 300);
    });

    jQuery(document).on("click", ".page .doclinks", function () {
      var link_clicked = jQuery(this).text();
      console.log(link_clicked);
      setTimeout(function () {
        var fd = new FormData();

        fd.append("action", "dashboard_clicks");
        fd.append("link_clicked", link_clicked);
        fd.append("page_url", jQuery(".page-url").text());
        fd.append("page_title", jQuery(".page-title").text());
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
      }, 300);
    });

    jQuery(document).on(
      "click",
      ".event-1090-cta, .mhome-msgboard a",
      function () {
        var link_clicked = jQuery(this).text();
        setTimeout(function () {
          var fd = new FormData();

          fd.append("action", "event_1090");
          fd.append("link_clicked", link_clicked);
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
        }, 300);
      }
    );

    jQuery(document).on("click", ".sg-popup-id-18661-target", function () {
      jQuery(".sg-popup-id-18661")[0].click();
      var link_clicked = "MARC Records";
      console.log(link_clicked);
      setTimeout(function () {
        var fd = new FormData();

        fd.append("action", "dashboard_clicks");
        fd.append("link_clicked", link_clicked);
        fd.append("page_url", jQuery(".page-url").text());
        fd.append("page_title", jQuery(".page-title").text());
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
      }, 300);
    });

    jQuery(document).on("click", ".sg-popup-id-9452-target", function () {
      jQuery(".sg-popup-id-9452")[0].click();
      var link_clicked = "Language - Title Breakdown";
      console.log(link_clicked);
      setTimeout(function () {
        var fd = new FormData();

        fd.append("action", "dashboard_clicks");
        fd.append("link_clicked", link_clicked);
        fd.append("page_url", jQuery(".page-url").text());
        fd.append("page_title", jQuery(".page-title").text());
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
      }, 300);
    });

    jQuery(document).on("click", ".marc-records", function () {
      var link_clicked = jQuery(this).closest("tr").find("td:eq(0)").text();
      console.log(link_clicked);
      setTimeout(function () {
        var fd = new FormData();

        fd.append("action", "dashboard_clicks");
        fd.append("link_clicked", link_clicked);
        fd.append("page_url", jQuery(".page-url").text());
        fd.append("page_title", jQuery(".page-title").text());
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
      }, 300);
    });

    jQuery(".sg-popup-id-18661")
      .css("position", "relative")
      .after(
        '<span class="sg-popup-id-18661-target sg-popup-id-target"></span>'
      );
    jQuery(".sg-popup-id-9452")
      .css("position", "relative")
      .after(
        '<span class="sg-popup-id-9452-target sg-popup-id-target"></span>'
      );

    if (jQuery("body").hasClass("page-id-8547")) {
      var country = [];
      var country2 = [];
      jQuery(".e8547-3 .x-col").each(function () {
        var val = jQuery(this).attr("class");
        var val2 = val.split(" ");
        console.log(val2[2]);
        // var val = jQuery(this).attr('class');
        country.push(val2[2]);
        country2.push(val2[2]);
        if (jQuery(this).hasClass("last-country")) {
          return false;
        }
      });
      country.sort();
      country2.sort().reverse();

      for (var i = 0; i < country.length; i++) {
        jQuery(".e8547-3 .country-default .x-col").each(function () {
          if (jQuery(this).hasClass(country[i])) {
            var html = jQuery(this).html();
            html = '<div class="x-col">' + html + "</div>";
            jQuery(".sort-a-z .x-row-inner").append(html);
          }
        });
      }

      for (var i = 0; i < country2.length; i++) {
        jQuery(".e8547-3 .country-default .x-col").each(function () {
          if (jQuery(this).hasClass(country2[i])) {
            var html = jQuery(this).html();
            html = '<div class="x-col">' + html + "</div>";
            jQuery(".sort-z-a .x-row-inner").append(html);
          }
        });
      }

      if (jQuery(".country-latest-release").length) {
        var country_latest_release = jQuery(".country-latest-release")
          .data("country")
          .split(",");
        for (var i = 0; i < country_latest_release.length; i++) {
          jQuery(".e8547-3 .country-default .x-col").each(function () {
            if (jQuery(this).hasClass(country_latest_release[i])) {
              var html = jQuery(this).html();
              html = '<div class="x-col">' + html + "</div>";
              jQuery(".latest-release .x-row-inner").append(html);
            }
          });
        }
      }

      if (jQuery(".country-most-popular").length) {
        var country_latest_release = jQuery(".country-most-popular")
          .data("country")
          .split(",");
        for (var i = 0; i < country_latest_release.length; i++) {
          jQuery(".e8547-3 .country-default .x-col").each(function () {
            if (jQuery(this).hasClass(country_latest_release[i])) {
              var html = jQuery(this).html();
              html = '<div class="x-col">' + html + "</div>";
              jQuery(".most-popular .x-row-inner").append(html);
            }
          });
        }
      }
    }

    jQuery(document).on("click", ".filter-country span", function () {
      if (!jQuery(this).hasClass("active")) {
        jQuery(".filter-country span").removeClass("active");
        jQuery(this).addClass("active");

        jQuery(".e8547-3 .x-col img").css({
          position: "relative",
          left: "-15px",
          opacity: "0",
        });

        jQuery(".e8547-3 .x-col img").animate(
          {
            position: "relative",
            left: "0",
            opacity: "1",
          },
          800
        );

        var data = jQuery(this).data("value");

        if (data == "default") {
          jQuery(".country-default").show();
          jQuery(".x-row-cloned").hide();
        } else if (data == "a-z") {
          jQuery(".country-default").hide();
          jQuery(".x-row-cloned").hide();
          jQuery(".sort-a-z").show();
        } else if (data == "z-a") {
          jQuery(".country-default").hide();
          jQuery(".x-row-cloned").hide();
          jQuery(".sort-z-a").show();
        } else if (data == "latest-release") {
          jQuery(".country-default").hide();
          jQuery(".x-row-cloned").hide();
          jQuery(".latest-release").show();
        } else if (data == "most-popular") {
          jQuery(".country-default").hide();
          jQuery(".x-row-cloned").hide();
          jQuery(".most-popular").show();
        }
      }
    });

    jQuery(document).on("click", ".single .doclinks", function () {
      var title = jQuery(this)
        .closest(".x-col")
        .find(".h-custom-headline")
        .text();
      var title2 = title.replace(/(\r\n|\n|\r)/gm, "");
      var fd = new FormData();

      fd.append("action", "get_activity_click");
      fd.append("page_id", jQuery(".page-id").text());
      fd.append("title", jQuery(".page-title").text());
      fd.append("page_url", jQuery(".page-url").text());
      fd.append("page_title", jQuery(this).data("activity"));
      fd.append("type", "Download");
      fd.append("bar_code", "test");
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

    if (jQuery(".title-jogs").length) {
      jQuery(".title-jogs").closest(".x-col").next().remove();
    }

    $(".select-filter span").on("click", function () {
      const class_name = $("body").attr("class").split(/\s+/);
      const page_id = parseInt(class_name[4].replace(/[^0-9.]/g, ""));
      const button_clicked = $(this).data("value");
      const data = {
        action: "filter_language",
        button_clicked,
        page_id,
      };

      $.ajax({
        type: "post",
        dataType: "json",
        url: my_ajax_object.ajax_url,
        data: data,
        success: function (data) {},
      });
    });

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
  });
})(jQuery);
