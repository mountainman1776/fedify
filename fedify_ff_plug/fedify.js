let dog_killers = [];
document.body.style.border = "5px solid red";

let flags = {
  "FED": {icon:browser.extension.getURL("icons/atf_guy_peeker.jpg"), background_color:'#d2fdd9'},
  "TROLL": {icon:browser.extension.getURL("icons/trollface.png"), background_color:'rgb(153, 153, 153)'},
  "NPC": {icon:browser.extension.getURL("icons/NPC_wojak_meme.png"), background_color:'rgb(255, 254, 208)'},
  "FAV": {icon:browser.extension.getURL("icons/come_and_take_it.jpg"), background_color:'rgb(209, 208, 255)'},
  "GHOST": {icon:browser.extension.getURL("icons/ghost.png"), background_color:'rgb(243, 255, 208)'}
}


// document.getElementById('rocket-chat').addEventListener("DOMNodeInserted", function (event) {
//   console.log('rocket-chat | DOMNodeInserted !!!!!!!!!!!!!!!!!!!!!!');
//   fedCheck();
// }, false);

const mainElm = document.getElementById('rocket-chat');
const callback = function(mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for(const mutation of mutationsList) {
      if (mutation.type === 'childList') {
          console.log('A child node has been added or removed.');
      }
      else if (mutation.type === 'attributes') {
          console.log('The ' + mutation.attributeName + ' attribute was modified.');
      } else {
        console.log('The ' + mutation.type + ' was modified.');
      }
      fedCheck();
  }
};
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
// Start observing the target node for configured mutations
observer.observe(mainElm, { attributes: true, childList: true, subtree: true });



// document.getElementsByClassName('messages-box')[0].addEventListener("DOMNodeInserted", function (event) {
//   console.log('messages-box | DOMNodeInserted !!!!!!!!!!!!!!!!!!!!!!');
//   fedCheck();
// }, false);

// document.getElementsByClassName('thread-list ')[0].addEventListener("DOMNodeInserted", function (event) {
//   console.log('thread-list | DOMNodeInserted !!!!!!!!!!!!!!!!!!!!!!');
//   fedCheck();
// }, false);




// setTimeout(fedCheck, 3000);

function fedCheck() {
  console.log('dog_killers',dog_killers);
    document.body.style.border = "none";
    // var msgSection = document.getElementsByClassName('messages-container-main')[0];
    // let msgElms = document.getElementsByClassName('message');
    var msgElms = document.querySelectorAll("li.message:not(.fedify_checked)");
    var flaggedUsers = Object.keys(dog_killers);
    for(let i = 0; i<msgElms.length;i++) {
        let post = msgElms[i];
        let userHandle = post.dataset.username;
        let isFlagged = flaggedUsers.indexOf(userHandle)==-1?false:true;
        post.classList.add("fedify_checked");
        if(isFlagged) {
          let flagType = dog_killers[userHandle].type;
          let avatarElm = post.getElementsByClassName('avatar-image')[0];
          console.log('dog_killers[userHandle].type',userHandle,dog_killers[userHandle].type);
          if(!flags.hasOwnProperty(flagType)) {
            flagType = "GHOST";
          }
          let flatObj = flags[flagType];
          avatarElm.src = flatObj.icon;
          post.style.backgroundColor = flatObj.background_color;
          // alert('set '+flagType+ ' ' +userHandle);

          // if("FED"==dog_killers[userHandle].type) {
          // } else if("TROLL"==dog_killers[userHandle].type) {
          //   avatarElm.src = trollIcon;
          //   post.style.backgroundColor = 'rgb(153, 153, 153)';
          // } else if("NPC"==dog_killers[userHandle].type) {
          //   avatarElm.src = npcIcon;
          //   post.style.backgroundColor = 'rgb(255, 254, 208)';
          // } else if("FAV"==dog_killers[userHandle].type) {
          //   avatarElm.src = favIcon;
          //   post.style.backgroundColor = 'rgb(209, 208, 255)';
          // } else {
          //   avatarElm.src = ghostIcon;
          //   post.style.backgroundColor = 'rgb(243, 255, 208)';
          // }
        }
    }
    console.log(msgSection);
}

function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  function onGot(item) {
      dog_killers = JSON.parse(item.dog_killers);
      console.log('dog_killers',dog_killers);
  }
  
  let getting = browser.storage.sync.get("dog_killers");
  getting.then(onGot, onError);
  


  browser.contextMenus.create({
    id: "eat-page",
    title: "Eat this page"
  });
  
//   browser.contextMenus.onClicked.addListener(function(info, tab) {
//     if (info.menuItemId == "eat-page") {
//       browser.tabs.executeScript({
//         file: "page-eater.js"
//       });
//     }
//   });
