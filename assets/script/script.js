/*Access key from Unsplash API saved as a variable*/
const accessKey = 'UAKFlVfng-i_M1GxnOIMofj6Q52jyCzZyZrN7CFUsQQ';
/* Take all important html elements and store them inside variables (e.g search input, search button and search result or images)*/
/*Select form element*/
const formEl = document.querySelector('form');
/*Select input element */
const inputEl = document.getElementById('search-input');
/*get image container*/
const searchResults = document.querySelector(".search-results");
/*Get the show more button*/
const showMore = document.getElementById('show-more-button');
/* I have imported all the imported elements from html to my script file.*/
/* Now working on these variables*/

/*input data variable and set to default empty and also page set to default 1*/
/* Create function searchImages that stores all the keywords the user types in the search button.
The keywords are stored in variable inputData.
We use async because we use response and await.*/
async function searchImages() {
    /*input data is stored inside inputEl and we save the data to variable inputData.*/
    inputData = inputEl.value;
 /*API fetches data from unsplash.com if a user types a word in search button so a dynamic url is required.
 Url is created based on the search. /search because we are searching images.*/
    const url = `https://api.unsplash.com/search/photos? page=${page}&query=${inputData}&client_id=${accessKey}`;
/*page number is dynamic. below I create a variable to fetch data from url*/
    const response = await fetch(url);
    /*convert data from response variable into a jason format.*/
    const data = await response.json();
    /*Convert jason data into images and text and store into a variable (results).*/
    const results = data.results;
    /*initialise page number as it is dynamic If page===1, then search result is empty.*/
    if (page === 1) {
        searchResults.innerHTML = "";
    }
    /* Show results one by one using map method. results variable shows a lot of images*/
    results.map((result) => {
        /*Push data from div search image to this function and save the images into a container
        Create a div element using js to html.*/
        const imageWrapper = document.createElement("div");
        /*Created div will have class of "search-result".*/
        imageWrapper.classList.add("search-result");
        /*create image element inside this div.*/
        const image = document.createElement("img");
        /*Target image to add src and alt.*/
        image.src = result.urls.small;
        image.alt = result.alt_description;
        /*Create anchor tag below image*/
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        /*Push text to inside the link*/
        imageLink.textContent = result.alt_description;
        /*Append the elements to html page*/
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
        /*Show first page 1 and increment page by 1 to next page*/
        })
    page++; 
    /*If image query has more than one page numbers then show more button:*/
    if (page > 1) {
        showMore.style.display = "block";
    }
}
/*Add event listener to get the typed word (e.g dog) and run the function.
Target the form element (formEl) and add event listener but prevent default event.*/
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    /*Iniatialise page and call search image function.*/
    page = 1;
    searchImages();
})

/*I call this function again for the show more button and after a click on the button.*/
showMore.addEventListener("click", (event) => {
      searchImages();
})

