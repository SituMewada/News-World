//SELECTORS
let html_temp = document.querySelector(".news_data");
let newsErrTem = document.querySelector(".news_error");
let newsErrMsg = document.querySelector(".news_error_msg");
let newsErrCode = document.querySelector(".news_error_code");
let searchField = document.querySelector(".news_search_input");
let searchButton = document.querySelector(".news_search_button");
let backGroundImg = document.querySelector(".news_template");
//CONTROLLERS
const showAllarticles = function (data) {
  let articles_temp = "";
  console.log(data);
  data = data.articles.slice(0, 10);
  // console.log(data);
  data.forEach((element) => {
    let html = `<div class="news_template"> 
    <div class="overlay">
     <div class="news_auther">
      <img
        class="auther_img"
        src="./images/user-avatar.png"
      />
      <p class="auther_name">${element.author==null?'Anonymous':element.author}</p>
    </div>
    <div class="main_news">
      <h2 class="news_title">
        ${element.title}
      </h2>
      <p class="news_description">
        ${element.description}
      </p>
      <img
        class="news_img"
        src="${element.urlToImage}"
      />
      <p class="new_content">
        ${element.content}
      </p> 
      <button class="more_button">
              <a href="${element.url}" target="_blank">more</a>
            </button>
    </div>
   </div>
  </div>`;
    // let backGroundImg = document.querySelector(".news_template");
    // backGroundImg.body.style.backgroundImage = `url(${element.url})`;
    articles_temp = articles_temp + html;
  });
  // html_temp = html_temp.innerHTML = "";
  html_temp.innerHTML = articles_temp;
  // console.log(html_temp);
  // console.log(articles_temp);
};

//ERROR HANDLING
const showError = function (err) {
  let newsErrHtml = `<div class="news_error">
    <h1 class="news_error_code">ERROR:</h1>
    <h3 class="news_error_msg"> ${err.split('.')[0]} :)</h3>
  </div>`;
  html_temp.innerHTML = newsErrHtml;
};

//LOADING ANIMATION
// const loadAniamtion = function () {
//   let loderHtml=`<div class="load_animation">
//   <img
//     class="loading_img"
//     src="./images/—Pngtree—wooden cart wooden wheel illustration_5457878.png"
//   />
// </div>`
// };

//FETCHING THE NEWS
 
const getAllNews = async (searchData) =>
  fetch(
    `https://newsapi.org/v2/everything?q=${searchData}&from=2022-12-16&sortBy=publishedAt&language=en&apiKey=b6eb8c93b0da4c0aa99df134f280bc8d`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.status != "ok") {
        throw new Error(data.message);
      }
      // console.log(data.articles.slice(0, 10));
      if(data.articles[0]==null){
        showError('Opps! somthing went wrong :(');
      }
      showAllarticles(data);
    })
    .catch((err) => {
      console.log(err);
      showError(err);
    });

setTimeout(getAllNews('science'),5000);
     
 

//SEARCHING
const searchNews = function () {
  let search = searchField.value;
   
  setTimeout(getAllNews(search),3000);
};
searchButton.addEventListener("click", searchNews);
