// const baseURL = "http://localhost:3000/";

// const getCategories = (token) => {
//   fetch(`${baseURL}api/v1/categories`, {
//     Headers: { "X-User-Token": token },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       // document.insertAdjacentHTML('beforeend', `
//       //     <div style="position: fixed; top: 0; left: 0; z-index: 1000; background: white; padding: 20px;">
//       //       ${data}
//       //       </div>
//       //       `)
//       // chrome.tabs.executeScript(tab.ib, {
//       //   file: 'content.js'
//       //  });
//     });
// };

// // chrome.commands.onCommand.addListener((command) => {
// //   console.log(`Command: ${command}`);

// chrome.cookies.get({ url: baseURL, name: "auth_token" }, async (cookie) => {
//   console.log(cookie);
//   const authToken = cookie.value;
//   if (authToken === "") {
//     // if this cookie doesnt exist show them link to sign in
//     console.log("NO COOKIE, DIRECT USER TO LOGIN :)");
//   } else {
//     // if it does exist, then fetch the categories and display on the page
//     await getCategories(authToken);
//   }
// });

// // });

let authToken;
let categories = [];
const baseURL = "http://localhost:3000/";

// const getCategories = () => {
//   fetch(`${baseURL}api/v1/categories`, {
//     Headers: { "X-User-Token": authToken },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("authToken: ", authToken);
//       console.log(data);
//       categories = data;
//       // document.insertAdjacentHTML('beforeend', `
//       //     <div style="position: fixed; top: 0; left: 0; z-index: 1000; background: white; padding: 20px;">
//       //       ${data}
//       //       </div>
//       //       `)
//     });
// };

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab);

  chrome.cookies.get({ url: baseURL, name: "auth_token" }, (cookie) => {
    console.log(cookie);
    authToken = cookie.value;
    if (authToken === "") {
      // if this cookie doesnt exist show them link to sign in
      console.log("NO COOKIE, DIRECT USER TO LOGIN :)");
      categories = "Not good";
    } else {
      // if it does exist, then fetch the categories and display on the page
      fetch(`${baseURL}api/v1/categories`, {
        Headers: { "X-User-Token": authToken },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("authToken: ", authToken);
          console.log(data);
          categories = data;
          // document.insertAdjacentHTML('beforeend', `
          //     <div style="position: fixed; top: 0; left: 0; z-index: 1000; background: white; padding: 20px;">
          //       ${data}
          //       </div>
          //       `)
        });
    }
  });

  if (request.greeting === "Hello!!!") {
    console.log("gbla");
    sendResponse({ farewell: categories });
  }
});
