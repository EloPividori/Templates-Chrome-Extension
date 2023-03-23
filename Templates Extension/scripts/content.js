// document.body.style.backgroundColor = 'grey';

// console.log('Running script')
// alert("hello")
console.log("Helloooooo")
chrome.runtime.sendMessage({greeting: "Hello!!!"}, function(response) {
  console.log(response.farewell)
})
console.log("Helloooooo")
