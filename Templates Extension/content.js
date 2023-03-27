// const copiedContentBadge = `<div style="position: absolute; bottom: 20px; right: 20px; background-color: green;">Copied to clipboard!</div>`;
// let targetForm;
// document.addEventListener("click", (event) => {
//   console.log(event);
//   // console.log(event.target.value);
//   // console.log(event.target.localName);
//   // console.log(event.target.attributes.class.value);
//   // console.log(event.target.defaultValue);
//   targetForm = event.target.attributes.class.value;
//   console.log(document.querySelectorAll(`.${targetForm}`)[0]);
//   console.log(document.querySelectorAll(`.${targetForm}`)[1].value);
//   // console.log(document.querySelectorAll(`.${targetForm}`)[1].target.value);
// });

const displayLogin = () => {
  const html = `<div id="template-extension-popup" style="z-index:9999; background: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
  <div style="background: white; border-radius: 20px; padding: 30px; max-width: 500px; width: 100%;">
  <a href='http://templates-extension/users/sign_in' target="_blank">Sign in</a>
  </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", html);
};

const displayCategories = (categories) => {
  // const realForm = document.querySelectorAll(`.${targetForm}`)[1];
  const buildCategory = (category) => {
    let categoriesHtml = `<ul class="category" style="padding: 5px; margin-bottom: 5px;"><strong>${category.title}</strong>`;
    let templatesHtml = "";

    category.templates.forEach((template) => {
      templatesHtml += `<li class="template tooltip" style="background-color: "lightgrey"; border-radius: 5px; padding: 5px; margin-bottom: 5px;"><p style="cursor: pointer">${template["title"]}<span class="tooltiptext">Tooltip text${template["content"]["body"]}</span></p> <div class="template-body" style="display: none;">${template["content"]["body"]}</div></li>`;
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
  <div class="scroll" style="background: white; border-radius: 20px; padding: 30px; max-width: 500px; max-height: 50%; width: 100%;overflow-y:scroll;">
  <div><h2>My Categories</h2></div>
  ${buildCategories(categories)}
      <div id="template-content"></div>
    </div>
  </div>`;
  console.log(html);
  console.log(document.querySelectorAll("*:not(.scroll)"));
  document
    .querySelectorAll("*:not(.template, .scroll, .category )")
    .forEach((element) => {
      element.addEventListener("click", (event) => {
        document.querySelector("#template-extension-popup").remove();
      });
    });
  document.body.insertAdjacentHTML("beforeend", html);

  document.querySelectorAll(".template").forEach((templateCard) => {
    templateCard.addEventListener("click", (event) => {
      // add to clipboard
      const templateBody =
        event.currentTarget.querySelector(".template-body").innerText;

      navigator.clipboard.writeText(templateBody);
      // realForm.value = templateBody;
      document.querySelector("#template-extension-popup").remove();
      document.querySelector("body").insertAdjacentHTML = copiedContentBadge;
    });
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.message);
  console.log(request.content);
  if (request.message === "successfulFetch") {
    displayCategories(request.content);
  } else if (request.message === "noCookie") {
    displayLogin();
  }
});

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//

// // document.body.style.backgroundColor = 'grey';

// // console.log('Running script')
// // alert("hello")

// // const reddenPage = {

// }
// let targetForm;
// document.addEventListener("click", (event) => {
//   console.log(event);
//   // console.log(event.target.value);
//   // console.log(event.target.localName);
//   // console.log(event.target.attributes.class.value);
//   // console.log(event.target.defaultValue);
//   targetForm = event.target.attributes.class.value;
//   console.log(document.querySelectorAll(`.${targetForm}`)[0]);
//   console.log(document.querySelectorAll(`.${targetForm}`)[1].value);
//   // console.log(document.querySelectorAll(`.${targetForm}`)[1].target.value);
// });

// const displayLogin = () => {
//   const html = `<div id="template-extension-popup" style="z-index:9999; background: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
//     <div style="background: white; border-radius: 20px; padding: 30px; max-width: 500px; width: 100%;">
//     <a href='http://localhost:3000//users/sign_in' target="_blank">Sign in</a>
//     </div>
//   </div>`;
//   document.body.insertAdjacentHTML("beforeend", html);
// };

// const displayCategories = (categories, realTarget) => {
//   const realForm = document.querySelectorAll(`.${targetForm}`)[1];

//   const buildCategory = (category) => {
//     let categoriesHtml = `<ul style="padding: 5px; margin-bottom: 5px;"><strong>${category.title}</strong>`;
//     let templatesHtml = "";

//     category.templates.forEach((template) => {
//       templatesHtml += `<li class="template" style="background-color: "lightgrey"; border-radius: 5px; padding: 5px; margin-bottom: 5px;"><p style="cursor: pointer">${template["title"]}</p><div class="template-body" style="display: none;">${template["content"]["body"]}</div></li>`;
//       // templateContent(template, i);
//     });
//     return categoriesHtml + templatesHtml + "</ul>";
//   };

//   // const templateContent = (currentTemplate, i) => {
//   //   // avigator.clipboard.writeText(event.currentTarget.textContent tem.content.body)
//   //   console.log(currentTemplate.content.body);
//   //   console.log(i);
//   //   // document.querySelectorAll(".template").forEach((templateCard) => {
//   //   const className = `.template${i}`;
//   //   console.log(className);
//   //   templateCard = document.querySelector(className);
//   //   templateCard.addEventListener("click", (event) => {
//   //     // add to clipboard
//   //     console.log(event.currentTarget.content);
//   //     navigator.clipboard.writeText(currentTemplate.content.body);
//   //     document.querySelector("#template-extension-popup").remove();
//   //   });
//   // };

//   const buildCategories = (cats) => {
//     let catsHTML = "";
//     cats.forEach((cat) => {
//       catsHTML += buildCategory(cat);
//     });
//     return catsHTML;
//   };

//   const html = `<div id="template-extension-popup" style="z-index:9999;background: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
//   <div style="background: white; border-radius: 20px; padding: 30px; max-width: 500px; max-height: 50%; width: 100%;overflow-y:scroll;">
//   <h2>My Categories</h2>
//   ${buildCategories(categories)}
//       <div id="template-content"></div>
//     </div>
//   </div>`;
//   document.body.insertAdjacentHTML("beforeend", html);
//   // let b = 0;
//   // categories.forEach((category) => {
//   //   category.templates.forEach((template) => {
//   //     b++;
//   //     templateContent(template, b);
//   //   });
//   // });
//   document.querySelectorAll(".template").forEach((templateCard) => {
//     templateCard.addEventListener("click", (event) => {
//       // add to clipboard
//       const templateBody =
//         event.currentTarget.querySelector(".template-body").innerText;
//       realForm.value = templateBody;
//       // realForm.innerText = templateBody;
//       // navigator.clipboard.writeText(templateBody).then(() => {
//       //   alert(realTarget);
//       // });

//       document.querySelector("#template-extension-popup").remove();
//     });
//   });

//   const popButton = document.querySelector("#populate-template");
//   popButton.addEventListener("click", (event) => {
//     const templateContent = document.querySelector(
//       "#template-extension-popup #template-content"
//     );
//     templateContent.innerHTML = "Random test for content";
//   });
// };
