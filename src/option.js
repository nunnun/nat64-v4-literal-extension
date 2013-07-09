function save_options() {
  var select = document.getElementById("suffix");
  var suffix = select.value;
  localStorage["nat64_v4_suffix"] = suffix;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function restore_options() {
  var saved_suffix = localStorage["nat64_v4_suffix"];
  if (!saved_suffix) {
    return;
  }
  var select = document.getElementById("suffix");
  select.value = saved_suffix;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
