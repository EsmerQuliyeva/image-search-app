let formEl = document.querySelector(".input-search")
let inputText = document.getElementById("search-text")
let searchBtn = document.getElementById("search-btn")
let searchResults = document.querySelector(".search-results")
let showBtn = document.getElementById("show-btn")
let accessKey = "xiBA3iRtimacC_ZB1mdZTjzb2j3H_3WjlUI9FA0LaTs"
let inputData = 0
let page = 1;

async function searchImages() {
    inputData = inputText.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showBtn.style.display = "block";
    }
    inputText.value=""
} catch (error) {
    console.error("Error fetching data:", error);
}

}

searchBtn.addEventListener("click", searchImages);

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
    
  
});

showBtn.addEventListener("click",()=>{
    searchImages()
}
);