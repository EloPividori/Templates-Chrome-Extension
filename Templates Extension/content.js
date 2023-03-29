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
  <div style="background: white; border-radius: 20px; padding: 30px; width: 500px;;">
  <a href='http://templates-extension/users/sign_in' target="_blank">Sign in</a>
  </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", html);
};

const displayCategories = (categories) => {
  let i = 0;
  // const realForm = document.querySelectorAll(`.${targetForm}`)[1];
  const buildCategory = (category) => {
    let categoriesHtml = `<ul class="category" style="padding: 5px; margin-bottom: 5px;"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2" viewBox="0 0 16 16">
    <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"/>
  </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2-open" viewBox="0 0 16 16">
  <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"/>
</svg></div><div class="category-title"><strong>${category.title}</strong></div></div>`;
    let templatesHtml = "";
    category.templates.forEach((template) => {
      templatesHtml += `<li class="template template${i} tooltip2" style="background-color: "lightgrey"; border-radius: 5px; padding: 5px; margin-bottom: 5px;"><p style="cursor: pointer">${template["title"]}<span class="tooltip2text scroll" data-boundary="viewport"></span></p></li>`;
      i++;
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
  <div class="scroll" style="font-family: sans-serif; border: 2rem solid whitesmoke; box-shadow: 0px 0px 10px #3c3333; background: white; border-radius: 20px; padding: 100px; padding-top: 30px; max-width: 700px; max-height: 50%; width: 100%;overflow-y:scroll;">
  <div style="margin-bottom: 32px; text-align: center"><img src="https://www.templates-extension.com/assets/te-logo-main-a1884bf37dbf02714f9894c7ae81001749875b4a16f7058cd543d1cf6b6c0d1d.png" style="height: 130px;"><h2 class="h2-margin h2-size">My Categories</h2></div>
  ${buildCategories(categories)}
      <div id="template-content"></div>
    </div>
  </div>`;
  document
    .querySelectorAll("*:not(.template, .scroll, .category )")
    .forEach((element) => {
      element.addEventListener("click", (event) => {
        document.querySelector("#template-extension-popup").remove();
      });
    });

  document.body.insertAdjacentHTML("beforeend", html);

  tooltip2texts = document.querySelectorAll(".tooltip2text");
  let j = 0;
  categories.forEach((category) => {
    category.templates.forEach((template) => {
      console.log(template.content.body.replaceAll("<br>", "\n"));
      const wihtoutBr = template.content.body.replaceAll("<br>", "\n");
      const regex = /(<([^>]+)>)/gi;
      const templateBody = wihtoutBr.replaceAll(regex, "");

      document
        .querySelector(`.template${j}`)
        .addEventListener("click", (event) => {
          navigator.clipboard.writeText(templateBody);
          // realForm.value = templateBody;
          document.querySelector("#template-extension-popup").remove();
        });

      tooltip2texts[j].innerHTML = template["content"]["body"];
      j++;
    });
  });
  // document.querySelectorAll(".tooltip2text").forEach((tooltip2text) => {
  //   console.log(tooltip2text.innerText);
  //   console.log(tooltip2text.innerHTML);

  //   tooltip2text.innerText = tooltip2text.innerText;
  // });

  // document.querySelectorAll(".template").forEach((templateCard) => {
  //   templateCard.addEventListener("click", (event) => {
  //     // add to clipboard
  //     const regex = /(<([^>]+)>)/gi;
  //     const wihtoutBr = event.currentTarget
  //       .querySelector(".template-body")
  //       .innerHTML.replaceAll("<br>", "\n");
  //     const templateBody = wihtoutBr.replaceAll(regex, "");

  //     navigator.clipboard.writeText(templateBody);
  //     // realForm.value = templateBody;
  //     document.querySelector("#template-extension-popup").remove();
  //     document.querySelector("body").insertAdjacentHTML = copiedContentBadge;
  //   });
  // });
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
