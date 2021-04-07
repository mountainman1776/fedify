let dog_killers = [];
document.body.style.border = "5px solid red";


document.getElementsByClassName('messages-box')[0].addEventListener("DOMNodeInserted", function (event) {
    console.log('New Stuff loaded!~1!!!!!!!!!!!!!!!!!!!!!!');
    fedCheck();
  }, false);


setTimeout(function(){
    fedCheck();
}, 5000);

function fedCheck() {
    let fedIcon = browser.extension.getURL("icons/atf_guy_peeker.jpg");
    document.body.style.border = "none";
    // var msgSection = document.getElementsByClassName('messages-container-main')[0];
    // let msgElms = document.getElementsByClassName('message');
    var msgElms = document.querySelectorAll("li.message:not(.fedchecked)");

    console.log('dog_killers',dog_killers);
    for(let i = 0; i<msgElms.length;i++) {
        let post = msgElms[i];
        let userHandle = post.dataset.username;
        let isFed = dog_killers.indexOf(userHandle)==-1?false:true;
        post.classList.add("fedchecked");
        if(isFed) {
            // post.style.borderColor = '#ed9e9e';
            // post.style.boxShadow = '0 0 10px #ed9e9e';
            post.style.backgroundColor = '#d2fdd9';
            let avatarElm = post.getElementsByClassName('avatar-image')[0];
            avatarElm.src = fedIcon;
        }
    }
    console.log(msgSection);
}

function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  function onGot(item) {
      dog_killers = item.dog_killers.split('\n');
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
