document.addEventListener("DOMContentLoaded", () => {
  fetchNews("Olympics");
});

const key = "91ec3761607c475381cc00d274402595";
const url = "https://newsapi.org/v2/everything?q=";

async function fetchNews(query) {
  const res = await fetch(`/api/news?query=${query}`);
  if (!res.ok) {
    console.error("Failed to fetch news");
    return;
  }
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const template = document.getElementById("temp-card");
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = template.content.cloneNode(true);
    fillData(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillData(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage || "placeholder.jpg";
  newsTitle.textContent = article.title || "Untitled";
  newsDesc.textContent = article.description || "No description available";
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.textContent = `${
    article.source?.name || "Unknown Source"
  } - ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let currNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  if (currNav) currNav.classList.remove("active");
  const navItem = document.getElementById(id);
  currNav = navItem;
  currNav.classList.add("active");
}

const srchBtn = document.getElementById("search-button");
const srchTxt = document.getElementById("news-input");

function searchNews() {
  const query = srchTxt.value.trim();
  if (!query) return;
  fetchNews(query);
  if (currNav) currNav.classList.remove("active");
  currNav = null;
}

srchBtn.addEventListener("click", searchNews);

srchTxt.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchNews();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetchNews("India");
});
