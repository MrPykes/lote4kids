jQuery(document).ready(function ($) {
  /* ***********/
  /* FLIPBOOK */
  /* ***********/
  jQuery("#flipbook").ready(function () {});
  var numPanels = 0;
  var zIdx = 0;
  var currentPanel = "";
  var startNumPanel = false;
  var lastNumPanel = false;
  var backNumPanel = 0;
  var pageId = 0;
  var beforeAudioPlay = 0;
  var afterAudioPlay = 0;
  var check_el = setInterval(function () {
    if (isPanelLoad == true) {
      numPanels = panelCount;
      backNumPanel = $(".back").length;
      beforeAudioPlay = $("#myaudio").data("before");
      afterAudioPlay = $("#myaudio").data("after");
      for (i = 0; i < numPanels; i++) {
        zIdx = numPanels - i;
        if (is_double_page == 1 && numPanels == zIdx) {
          $(".panel").eq(i).css("z-index", 1);
        } else {
          $(".panel").eq(i).css("z-index", zIdx);
        }
        $(".panel").eq(i).data("zIdx", zIdx);
      }
      var checkZTimeout;
      function checkZ($aPanel) {
        currentPanel = $aPanel.data("id");

        if ($aPanel.hasClass("open")) {
          checkZTimeout = setTimeout(function () {
            $aPanel.css("z-index", "1");
          }, 500);
        } else {
          zIdx = $aPanel.data("zIdx");
          $aPanel.css("z-index", zIdx);
        }

        if (currentPanel == 1 && startNumPanel == true && is_double_page == 0) {
          $(".book").css("transform", "translateX(0)");
          startNumPanel = false;
        } else if (currentPanel == numPanels && lastNumPanel == true) {
          $(".book").css("transform", "translateX(100%)");
          lastNumPanel = false;
        } else {
          $(".book").css("transform", "translateX(50%)");
          startNumPanel = true;
          lastNumPanel = true;
        }
      }

      $(".panel").on("click", ".front", function () {
        if (isAutoPlay == false) {
          if (pageId + 1 == numPanels && is_double_page == 1) {
            return;
          }
          hideAudio();
          nextSlide();
        }
      });
      $(".panel").on("click", ".back", function () {
        if (isAutoPlay == false) {
          if (pageId < 3 && is_double_page == 1) {
            return;
          }
          hideAudio();
          prevSlide();
        }
      });

      var isNext = false;
      $(document).on("click", "#next-btn", function () {
        if (isAutoPlay == false) {
          isSlide = true;
          continueAudio = false;
          hideAudio();
          nextSlide();
          clearTimeout(looptTimeout);
        }
      });

      $(document).on("click", "#prev-btn", function () {
        if (isAutoPlay == false) {
          isSlide = true;
          continueAudio = false;
          hideAudio();
          prevSlide();
          clearTimeout(looptTimeout);
        }
      });
      $(document).on("click", "#reset", function () {
        const panelOpenCount = $(".panel.open");
        pageId = panelOpenCount.length;
        hideAudio();
        resetAudio(pageId + 1);
        if (pageId > 0) {
          resetFlipbook();
        }
      });

      let nextSlide = () => {
        const panelOpenCount = $(".panel.open");
        pageId = panelOpenCount.length + 1;
        if ($(".panel").hasClass("open")) {
          if (numPanels >= pageId) {
            $("#p" + pageId).toggleClass("open");
            checkZ($("#p" + pageId));
          }
        } else {
          $("#p1").toggleClass("open");
          checkZ($("#p1"));
        }
        isNext = true;
        clickAutoPlay = true;
        toggleReset(pageId + 1);
        buttonArrow(pageId + 1);
        hasAudio(pageId);
        resetAudio(pageId);
      };
      var prevId = 0;
      let prevSlide = () => {
        if ($(".panel").hasClass("open")) {
          const panelOpenCount = $(".panel.open");
          pageId = panelOpenCount.length;
          toggleReset(pageId);
          buttonArrow(pageId);
          resetAudio(pageId + 1);
          resetAudioAutoPlay(pageId + 1);
          hasAudio(pageId - 1);
          $("#p" + pageId).toggleClass("open");
          checkZ($("#p" + pageId));
          prevId = pageId;
        }
        isNext = false;
        isSlide = true;
      };
      // Slide Play
      var myTimeoutNext;
      var myTimeoutPrev;
      $(document).on("click", "#play-btn .play", function () {
        if (isAutoPlay == false) {
          hideAudio();
          playAudio();
          buttonPausePlay();
          toggleAutoPlayButton();
          toggleButton();
          isPlay = true;
          isAutoPlay = true;
        }
      });
      $(document).on("click", "#play-btn .pause", function () {
        const panelOpenCount = $(".panel.open");
        // if (is_double_page) {
        //   pageId = panelOpenCount.length + 2;
        // } else {
        //   pageId = panelOpenCount.length + 1;
        // }
        if (panelOpenCount.length == 0) {
          if (is_double_page) {
            pageId = panelOpenCount.length + 2;
          } else {
            pageId = panelOpenCount.length + 1;
          }
        } else {
          pageId = panelOpenCount.length + 1;
        }
        $(".s" + pageId + " audio")[0].pause();
        clearInterval(looptTimeout);
        clearTimeout(durationTime);
        clearTimeout(continuePlayTimeout);
        clearInterval(durationTimeAutoPlay);
        buttonPausePlay();
        toggleAutoPlayButton();
        toggleButton();
        isPlay = false;
        isAutoPlay = false;
      });
      var isAutoPlay = false;
      var isPlay = false;
      var clickAutoPlay = false;
      $(document).on("click", "#auto-play-btn .play", function () {
        const panelOpenCount = $(".panel.open");
        pageId = panelOpenCount.length + 1;
        if (isPlay == false) {
          isPlay = true;
          // hideAudio();
          // hasAudio();
          if (is_double_page == 1) {
            isSlide = true;
          }
          autoPlay(pageId);
          buttonPauseAutoPlay();
          toggleButton();
          if (clickAutoPlay == false) {
            clickAutoPlay = true;
            isAutoPlay = true;
          }
        }
      });
      var continueAudio = false;
      $(document).on("click", "#auto-play-btn .pause", function () {
        const panelOpenCount = $(".panel.open");
        pageId = panelOpenCount.length + 1;
        $(".s" + pageId + " audio")[0].pause();
        clearInterval(looptTimeout);
        clearTimeout(durationTime);
        clearTimeout(continuePlayTimeout);
        clearInterval(durationTimeAutoPlay);
        continueAudio = true;
        isAutoPlay = false;
        isPlay = false;
        buttonPauseAutoPlay();
        toggleButton();
      });
      var lengthLoop = 0;
      var looptTimeout;
      let isSlide = false;
      let autoPlay = (length) => {
        if (length == 1 || length == 0) {
          lengthLoop = length;
          beforeTimeOut = 1;
        } else {
          lengthLoop = length + afterAudioPlay + beforeAudioPlay;
          beforeTimeOut = beforeAudioPlay;
        }
        clickAutoPlay = false;
        if (continueAudio == true) {
          lengthLoop = 1;
          continuePlay();
        } else {
          if (isSlide == true) {
            looptTimeout = setTimeout(function () {
              autoPlayAudio();
              // pageId = pageId + 1;
              const duration = $(".s" + pageId).data("duration")
                ? $(".s" + pageId).data("duration")
                : 1;
              autoPlay(duration);
              isSlide = false;
            }, 1000);
          } else {
            looptTimeout = setTimeout(function () {
              if (isAutoPlay == true && numPanels >= pageId) {
                nextSlide();
                pageId = pageId + 1;
                let duration = $(".s" + pageId).data("duration")
                  ? $(".s" + pageId).data("duration")
                  : 1;
                autoPlay(duration);
              }
              // hideAudio();
              if (numPanels < pageId) {
                resetFlipbook();
                clearTimeout(looptTimeout);
              } else {
                beforeAutoTimeOut = setTimeout(function () {
                  autoPlayAudio();
                  clearTimeout(beforeAutoTimeOut);
                }, beforeTimeOut * 1000);
              }
            }, lengthLoop * 1000);
          }
        }
      };
      let resetFlipbook = () => {
        // pageId = pageId - 1;
        resetFlipbookTimeout = setTimeout(function () {
          $("#next-btn .next").removeClass("disable-button");
          $("#prev-btn .prev").removeClass("disable-button");
          $("#play-btn .play").removeClass("disable-button");
          if (pageId <= 0) {
            toggleReset(pageId);
            resetbuttonPauseAutoPlay();
            buttonArrow(0);
            resetAudio();
            hideAudio();
            hasAudio();
            clearTimeout(resetFlipbookTimeout);
            clearInterval(looptTimeout);
            clearTimeout(durationTime);
            clearTimeout(continuePlayTimeout);
            clearInterval(durationTimeAutoPlay);
            isPlay = false;
            isAutoPlay = false;
            isSlide = false;
            continueAudio = false;
            length = 0;
          } else {
            $("#p" + pageId).toggleClass("open");
            checkZ($("#p" + pageId));
            pageId--;
            resetFlipbook();
          }
        }, 100);
      };
      let continuePlayTimeout;
      let continuePlay = () => {
        continuePlayTimeout = setTimeout(function () {
          if ($(".s" + pageId + " audio")[0]) {
            if (
              $(".s" + pageId + " audio")[0].getCurrentTime() <
              $(".s" + pageId + " audio")[0].getDuration()
            ) {
              autoPlayAudio();
              continuePlay();
            } else {
              // isAutoPlay = true;
              const duration = $(".s" + pageId).data("duration")
                ? $(".s" + pageId).data("duration")
                : 1;
              autoPlay(1);
              clearTimeout(continuePlayTimeout);
            }
            continueAudio = false;
          }
        }, 100);
      };

      var durationTime;
      let playAudio = () => {
        const panelOpenCount = $(".panel.open");
        pageId = panelOpenCount.length;
        if (pageId == 0) {
          if (is_double_page) {
            pageId = 2;
          } else {
            pageId = 1;
          }
        } else {
          pageId = pageId + 1;
        }
        if ($(".s" + pageId).hasClass("hide")) {
          hideAudio();
          $(".s" + pageId).removeClass("hide");
          $(".s" + pageId + " audio")[0].play();
          durationTime = setInterval(function () {
            if ($(".s" + pageId + " audio")[0]) {
              if (
                $(".s" + pageId + " audio")[0].getCurrentTime() >=
                $(".s" + pageId + " audio")[0].getDuration()
              ) {
                $("#play-btn .dashicons-controls-play").removeClass("hide");
                $("#play-btn .dashicons-controls-pause").addClass("hide");
                $(".s" + pageId).addClass("hide");
                clearInterval(durationTime);
                unhideAutoPlayButton();
                toggleButton();
                isAutoPlay = false;
                isPlay = false;
                if (isPlay == false) {
                  isSlide = false;
                }
              }
            }

            return true;
          }, 1000);
        } else {
          $(".s" + pageId + " audio")[0].play();
        }
        return false;
      };
      let durationTimeAutoPlay;
      let autoPlayAudio = (pageId) => {
        const panelOpenCount = $(".panel.open");
        pageId = panelOpenCount.length + 1;
        if ($(".s" + pageId + " audio")[0]) {
          $(".s" + pageId + " audio")[0].play();
        }
        hideAudio();
        $(".s" + pageId).removeClass("hide");
        // hasAudio();
        durationTimeAutoPlay = setInterval(function () {
          if ($(".s" + pageId + " audio")[0]) {
            if (
              $(".s" + pageId + " audio")[0].getCurrentTime() >=
              $(".s" + pageId + " audio")[0].getDuration()
            ) {
              continueAudio == true;
              clearInterval(durationTimeAutoPlay);
            }
          }
        }, 1000);
      };
      let buttonPausePlay = () => {
        $("#play-btn .dashicons-controls-pause").toggleClass("hide");
        $("#play-btn .dashicons-controls-play").toggleClass("hide");
      };
      let buttonPauseAutoPlay = () => {
        $("#auto-play-btn .dashicons-controls-pause").toggleClass("hide");
        $("#auto-play-btn .dashicons-controls-auto-play").toggleClass("hide");
      };
      let resetbuttonPauseAutoPlay = () => {
        $("#auto-play-btn .dashicons-controls-pause").addClass("hide");
        $("#auto-play-btn .dashicons-controls-auto-play").removeClass("hide");
      };
      let buttonArrow = (currentPanel) => {
        if (
          currentPanel == 1 ||
          currentPanel == 0 ||
          (currentPanel == 2 && is_double_page == 1)
        ) {
          $("#prev-btn").addClass("hide");
          $("#next-btn").removeClass("hide");
        } else if (numPanels + 1 == currentPanel && is_double_page == 0) {
          $("#next-btn").addClass("hide");
          $("#prev-btn").removeClass("hide");
        } else if (numPanels == currentPanel && is_double_page == 1) {
          $("#next-btn").addClass("hide");
          $("#prev-btn").removeClass("hide");
        } else {
          $("#prev-btn").removeClass("hide");
          $("#next-btn").removeClass("hide");
        }
      };
      let hasAudio = (pageId = 0) => {
        pageId = pageId + 1;
        let secondPageId = 0;
        if (is_double_page == 1) {
          secondPageId = pageId + 1;
          if (
            $(".s" + pageId).length == 0 ||
            $(".s" + secondPageId).length == 0
          ) {
            $("#play-btn").removeClass("hide");
          } else {
            $("#play-btn").removeClass("hide");
          }
        } else {
          if ($(".s" + pageId).length == 0) {
            $("#play-btn").addClass("hide");
          } else {
            $("#play-btn").removeClass("hide");
          }
        }
      };
      hasAudio();
      let hideAudio = () => {
        clearInterval(durationTimeAutoPlay);
        $(".audio > div").map((index, elem) => {
          $(elem).addClass("hide");
        });
      };
      let resetAudio = (pageId) => {
        if ($(".s" + pageId + " audio").length > 0) {
          $(".s" + pageId + " audio")[0].setCurrentTime(0);
          $(".s" + pageId + " audio")[0].pause();
        }

        if ($("#play-btn .dashicons-controls-play").hasClass("hide")) {
          $("#play-btn .dashicons-controls-play").removeClass("hide");
          $("#play-btn .dashicons-controls-pause").addClass("hide");
        }
      };
      let resetAudioAutoPlay = (pageId) => {
        if ($(".s" + pageId + " audio").length > 0) {
          $(".s" + pageId + " audio")[0].setCurrentTime(0);
          $(".s" + pageId + " audio")[0].pause();
        }
        if (
          $("#auto-play-btn .dashicons-controls-auto-play").hasClass("hide")
        ) {
          $("#auto-play-btn .dashicons-controls-auto-play").removeClass("hide");
          $("#auto-play-btn .dashicons-controls-pause").addClass("hide");
        }
      };

      let toggleButton = () => {
        $("#play-btn .play").toggleClass("disable-button");
        $("#prev-btn .prev").toggleClass("disable-button");
        $("#next-btn .next").toggleClass("disable-button");
      };
      let toggleReset = (pageId) => {
        if (pageId > 1) {
          if (pageId == 2 && is_double_page == 1) {
            $("#reset").addClass("hide");
          } else {
            $("#reset").removeClass("hide");
          }
        } else {
          $("#reset").addClass("hide");
        }
      };
      let toggleAutoPlayButton = () => {
        $("#auto-play-btn .play").toggleClass("disable-button");
        $("#auto-play-btn .pause").toggleClass("disable-button");
      };
      let unhideAutoPlayButton = () => {
        $("#auto-play-btn .play").removeClass("disable-button");
        $("#auto-play-btn .pause").removeClass("disable-button");
      };
      let toggleResizeBtn = () => {
        $(".dashicons-editor-expand").toggleClass("hide");
        $(".dashicons-editor-contract").toggleClass("hide");
      };
      // Full Screen
      $(document).on("click", ".dashicons-editor-expand", function () {
        var el = $("#flipbook")[0];
        el.requestFullscreen();
        toggleResizeBtn();
      });

      // Exit Full Screen
      $(document).on("click", ".dashicons-editor-contract", function () {
        var elem = document.documentElement;
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        toggleResizeBtn();
      });
      clearInterval(check_el);
    }
  }, 200);
});
