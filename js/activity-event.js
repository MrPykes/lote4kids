jQuery(document).ready(function ($) {
  var startTime = new Date().getTime();
  var maxDuration = 20 * 60 * 1000; // 20 minutes in milliseconds

  // Function to trigger the event function via AJAX
  function triggerEventFunction() {
    $title = $(".page-title").text();
    var fd = new FormData();
    fd.append("action", "get_activities_log");
    fd.append("activity_name", $title);
    fd.append("activity_title", "NA");
    fd.append("activity_type", "Online");
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
  }
  // Function to check the elapsed time and call the trigger function if within the allowed duration
  function checkElapsedTime() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;

    if (elapsedTime <= maxDuration) {
      triggerEventFunction();
      setTimeout(checkElapsedTime, 60000); // Call this function again after 1 minute (60,000 ms)
    }
  }
  // Call the trigger function after the page has loaded
  triggerEventFunction();

  // Call the function to check elapsed time every minute (60,000 ms)
  setTimeout(checkElapsedTime, 60000);
});
