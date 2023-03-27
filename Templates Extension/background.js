const baseURL = "http://www.templates-extension.com/";

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(sender.tab);

//   chrome.cookies.get({ url: baseURL, name: "auth_token" }, (cookie) => {
//     console.log(cookie);
//     authToken = cookie.value;
//     if (authToken === "") {
//       // if this cookie doesnt exist show them link to sign in
//       console.log("NO COOKIE, DIRECT USER TO LOGIN :)");
//       categories = "Not good";
//     } else {
//       // if it does exist, then fetch the categories and display on the page
//       fetch(`${baseURL}api/v1/categories`, {
//         Headers: { "X-User-Token": authToken },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log("authToken: ", authToken);
//           console.log(data);
//           categories = data;
//         });
//     }
//   });

//   if (request.greeting === "Hello!!!") {
//     console.log("gbla");
//     sendResponse({ farewell: categories });
//   }
// });

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);

  chrome.cookies.get({ url: baseURL, name: "auth_token" }, (cookie) => {
    authToken = cookie.value;

    if (authToken) {
      fetch(`${baseURL}api/v1/categories`, {
        Headers: { "X-User-Token": authToken },
      })
        .then((res) => res.json())
        .then((data) => {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                message: "successfulFetch",
                content: data,
              });
            }
          );
        });
    } else {
      chrome.tabs.sendMessage(tab.id, {
        message: "noCookie",
      });
    }
  });
});
// browser.runtime.connect(console.log("tabs tabs"));

// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   console.log("tabs tabs");
//   chrome.tabs.sendMessage(tabId, {
//     type: "NEW",
//     videoId: urlParameters.get("v"),
//   });
// });
// browser.windows.onCreated.addListener(console.log("tabs tabs"));
// chrome.windows.onCreated.addListener(console.log("tabs tabs"));
// browser.tabs.onUpdated.addListener(console.log("tabs tabs"));
// browser.tabs.onCreated.addListener(console.log("tabs tabs"));
// chrome.tabs.onUpdated.addListener(console.log("tabs tabs"));
// chrome.tabs.onCreated.addListener(console.log("tabs tabs"));
// browser.tabs.onUpdated.addListener((tabId, tab) => {
//   console.log("tabs tabs");
//   chrome.tabs.sendMessage(tabId, {
//     type: "NEW",
//     videoId: urlParameters.get("v"),
//   });
// });
