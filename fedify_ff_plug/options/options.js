function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    dog_killers: document.querySelector("#dog_killers").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#dog_killers").value = result.dog_killers || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("dog_killers");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
