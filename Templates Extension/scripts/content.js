// document.body.style.backgroundColor = 'grey';

// console.log('Running script')
// alert("hello")

// const reddenPage = {

// }

const displayLogin = () => {
  const html = `<div id="template-extension-popup" style="z-index:9999; background: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
    <div style="background: white; border-radius: 20px; padding: 30px; max-width: 500px; width: 100%;">
    <a href='http://localhost:3000//users/sign_in' target="_blank">Sign in</a>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", html);
};

const displayCategories = (categories) => {
  const buildCategory = (category) => {
    let categoriesHtml = `<ul style="padding: 5px; margin-bottom: 5px;"><strong>${category.title}</strong>`;
    let templatesHtml = "";

    category.templates.forEach((template) => {
      templatesHtml += `<li class="template" style="background-color: "lightgrey"; border-radius: 5px; padding: 5px; margin-bottom: 5px;">${template["title"]}<div class="template-body" style="display: none;">${template["content"]["body"]}</div></li>`;
      // templateContent(template, i);
    });
    return categoriesHtml + templatesHtml + "</ul>";
  };

  // const templateContent = (currentTemplate, i) => {
  //   // avigator.clipboard.writeText(event.currentTarget.textContent tem.content.body)
  //   console.log(currentTemplate.content.body);
  //   console.log(i);
  //   // document.querySelectorAll(".template").forEach((templateCard) => {
  //   const className = `.template${i}`;
  //   console.log(className);
  //   templateCard = document.querySelector(className);
  //   templateCard.addEventListener("click", (event) => {
  //     // add to clipboard
  //     console.log(event.currentTarget.content);
  //     navigator.clipboard.writeText(currentTemplate.content.body);
  //     document.querySelector("#template-extension-popup").remove();
  //   });
  // };

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
  // let b = 0;
  // categories.forEach((category) => {
  //   category.templates.forEach((template) => {
  //     b++;
  //     templateContent(template, b);
  //   });
  // });
  document.querySelectorAll(".template").forEach((templateCard) => {
    templateCard.addEventListener("click", (event) => {
      // add to clipboard
      const templateBody =
        event.currentTarget.querySelector(".template-body").innerText;

      navigator.clipboard.writeText(templateBody);

      document.querySelector("#template-extension-popup").remove();
    });
  });

  const popButton = document.querySelector("#populate-template");
  popButton.addEventListener("click", (event) => {
    const templateContent = document.querySelector(
      "#template-extension-popup #template-content"
    );
    templateContent.innerHTML = "Random test for content";
  });
};

// const displayCategories = (categories) => {
//   const buildCategory = (category) => {
//     return `<div style="border: 1px solid black; padding: 5px; margin-bottom: 5px;">${category.title}</div>`;
//   };

//   const buildCategories = (cats) => {
//     let catsHTML = "";
//     cats.forEach((cat) => {
//       catsHTML += buildCategory(cat);
//     });
//     return catsHTML;
//   };

//   const random = () => {
//     console.log("YOOO");
//   };

//   const html = `<div id="template-extension-popup" style="background: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
//     <div style="background: white; border-radius: 20px; padding: 30px; max-width: 500px; width: 100%;">
//       <h2>My Categories</h2>
//       ${buildCategories(categories)}
//       <button id="populate-template">fill template</button>
//       <div id="template-content"></div>
//     </div>
//   </div>`;
//   document.body.insertAdjacentHTML("beforeend", html);

//   const popButton = document.querySelector("#populate-template");
//   popButton.addEventListener("click", (event) => {
//     const templateContent = document.querySelector(
//       "#template-extension-popup #template-content"
//     );
//     templateContent.innerHTML = "Random test for content";
//   });
// };

console.log("Helloooooooo");
chrome.runtime.sendMessage({ greeting: "Hello!!!" }, function (response) {
  console.log(response.farewell);
  if (response.farewell != "Not good") {
    document.addEventListener(
      "keydown",
      (event) => {
        const name = event.key;
        const code = event.code;
        if (name === "Control") {
          console.log(1);
          return;
        }
        if (event.ctrlKey && name === "b") {
          // alert(`Combination of ctrlKey + ${name} \n Key code Value: ${code}`);
          displayCategories(response.farewell);
        }
      },
      false
    );
  } else {
    document.addEventListener(
      "keydown",
      (event) => {
        const name = event.key;
        const code = event.code;
        if (name === "Control") {
          console.log(1);
          return;
        }
        if (event.ctrlKey && name === "b") {
          // alert(`Combination of ctrlKey + ${name} \n Key code Value: ${code}`);
          displayLogin();
        }
      },
      false
    );
  }
});
console.log("Helloooooo");

// chrome.action.onClicked.addListener((tab) => {
//   if (!tab.url.includes()) {
//     target: { tabId: tab.id },
//     function: reddenPage
//   }
// })
