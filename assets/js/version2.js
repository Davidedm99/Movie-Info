//code for the search
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let pageBody = document.getElementById("result");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0951140ab4msh3c7f0ae64b745abp1b1ae7jsn6936fb45311a',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

//fetch data from api
let getMovie = () =>{
    let movieName = movieNameRef.value;
    let url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${movieName}&country=us`;

    //empty field
    if(movieName.length <= 0){
        pageBody.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    }
    else{
        fetch(url, options)
        .then(response => response.json())
        .then((data) => {
            //movie doesn't exists
            if(data.result.length === 0){
                pageBody.innerHTML = `<h3 class="msg">Movie not Found!</h3>`
            }
            //movie exists
            else{
                pageBody.innerHTML =`<div class="info">
                                        <img src=${data.result[0].posterURLs.original} class="poster">
                                        <div>
                                            <h2>${data.result[0].title}</h2>
                                            <div class="rating">
                                                <img src="star.png">
                                                <h4>${(data.result[0].imdbRating)/10}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    `;
                console.log(data.result[0].title)
            }   
            
        })
        //error catching
        .catch(() =>{
            pageBody.innerHTML = `<h3 class="msg>Error Occured</h3>`;
        });
    }};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
