const copiedContentBadge = `<div style="position: absolute; bottom: 20px; right: 20px; background-color: green;">Copied to clipboard!</div>`

const displayLogin = () => {
  const html = `<div id="template-extension-popup" style="z-index:9999; background: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
    <div style="background: white; border-radius: 20px; padding: 30px; max-width: 500px; width: 100%;">
    <a href='http://templates-extension/users/sign_in' target="_blank">Sign in</a>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", html);
};

const displayCategories = (categories) => {
  const buildCategory = (category) => {
    let categoriesHtml = `<ul style="padding: 5px; margin-bottom: 5px;"><strong>${category.title}</strong>`;
    let templatesHtml = "";

    category.templates.forEach((template) => {
      templatesHtml += `<li class="template" style="background-color: "lightgrey"; border-radius: 5px; padding: 5px; margin-bottom: 5px;"><p style="cursor: pointer">${template["title"]}</p><div class="template-body" style="display: none;">${template["content"]["body"]}</div></li>`;
    });
    return categoriesHtml + templatesHtml + "</ul>";
  };

  const buildCategories = (cats) => {
    let catsHTML = "";
    cats.forEach((cat) => {
      catsHTML += buildCategory(cat);
    });
    return catsHTML;
  };

  const html = `<div id="template-extension-popup" style="z-index:9999;background: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
  <div style="background: white; border-radius: 20px; padding: 30px; max-width: 500px; max-height: 50%; width: 100%;overflow-y:scroll;">
  <h2>My Categories</h2>
  ${buildCategories(categories)}
      <div id="template-content"></div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", html);

  document.querySelectorAll(".template").forEach((templateCard) => {
    templateCard.addEventListener("click", (event) => {
      // add to clipboard
      const templateBody =
        event.currentTarget.querySelector(".template-body").innerText;

      navigator.clipboard.writeText(templateBody);

      document.querySelector("#template-extension-popup").remove();
      document.querySelector("body").insertAdjacentHTML = copiedContentBadge;
    });
  });
};


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request.message)
  console.log(request.content)
  if (request.message === 'successfulFetch') {
    displayCategories(request.content)
  } else if (request.message === 'noCookie') {
    displayLogin();
  }
});
