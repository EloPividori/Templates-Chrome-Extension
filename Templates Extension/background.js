chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a context script:" + sender.tab.url :
      "from the extension");
      if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
  });

const baseURL = 'http://localhost:3000/'

const getCategories = (token) => {
  fetch(`${baseURL}api/v1/categories`, {
    Headers: {'X-User-Token': token}
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      // document.insertAdjacentHTML('beforeend', `
      //     <div style="position: fixed; top: 0; left: 0; z-index: 1000; background: white; padding: 20px;">
      //       ${data}
      //       </div>
      //       `)
            // chrome.tabs.executeScript(tab.ib, {
            //   file: 'content.js'
            //  });
    })
}



// chrome.commands.onCommand.addListener((command) => {
//   console.log(`Command: ${command}`);

  chrome.cookies.get(
    {url: baseURL, name: 'auth_token'},
    async (cookie) => {
        console.log(cookie)
      const authToken = cookie.value
      if (authToken === '') {
        // if this cookie doesnt exist show them link to sign in
        console.log("NO COOKIE, DIRECT USER TO LOGIN :)")
      } else {
          // if it does exist, then fetch the categories and display on the page
          await getCategories(authToken)
        }
      }
      )


// });
