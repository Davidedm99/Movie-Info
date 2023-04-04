//code for the search
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let pageBody = document.getElementById("result");
let background = document.getElementById("background");

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
                console.log(data.result[0]);
                
                //movie or series
                var releaseYear = "";
                if(data.result[0].type == "movie"){
                    releaseYear = data.result[0].year;
                }else{
                    releaseYear = data.result[0].firstAirYear;
                }

                //genres 
                var genresString = "";
                let genresLenght = data.result[0].genres.length;
                for(var i=0; i < genresLenght; i++){
                    if(i == genresLenght - 1){
                        genresString = genresString.concat(data.result[0].genres[i].name);
                    }else{
                        genresString = genresString.concat(data.result[0].genres[i].name, " ");
                    }
                }

                //cast 
                var castString = "";
                let castLength = data.result[0].cast.length;
                for(var i=0; i < castLength; i++){
                    if(i == castLength - 1){
                        castString = castString.concat(data.result[0].cast[i]);
                    }else{
                        castString = castString.concat(data.result[0].cast[i], ", ");
                    }
                }

                //streaming availability
                /* problem lays in case there's no streaming availability, check if is possible 
                to avoid putting a box if string is empty*/
                var streamString = "";
                if(Object.getOwnPropertyNames(data.result[0].streamingInfo).length != 0){
                    let streamtLength = Object.getOwnPropertyNames(data.result[0].streamingInfo.us).length;
                    for(var i=0; i < streamtLength; i++){
                        if(i == streamtLength - 1){
                            streamString = streamString.concat(Object.getOwnPropertyNames(data.result[0].streamingInfo.us)[i]);
                        }else{
                            streamString = streamString.concat(Object.getOwnPropertyNames(data.result[0].streamingInfo.us)[i], " ");
                        }
                    }
                }

                //change background based on the film chosen
                background.style.backgroundImage = 'url(' + data.result[0].posterURLs.original + ')';
                background.style.backgroundRepeat = "repeat-y";
                background.style.backgroundPosition = "center";
                background.style.backgroundSize = "cover";

                //building the page based on the result
                pageBody.innerHTML =`<div class="info">
                                        <img src=${data.result[0].posterURLs.original} class="poster">
                                        <div class="miscellaneous">
                                            <h2>${data.result[0].title}</h2>
                                            <div class="rating">
                                                <img src="./assets/images/star.png">
                                                <h4>${(data.result[0].imdbRating)/10}</h4>
                                            </div>
                                            <div class="details">
                                                <span>${data.result[0].type}</span>
                                                <span>${releaseYear}</span>
                                                <span>PEGI ${data.result[0].advisedMinimumAudienceAge}</span>
                                            </div>
                                            <div class="genre">
                                                <div>${genresString.split(" ", 3).join("</div><div>")}</div>
                                            </div>
                                            <h3>Available on: </h3>
                                            <div class="stream">
                                                <div>${streamString.split(" ", 3).join("</div><div>")}</div>
                                            </div>
                                            <h3>Youtube Trailer </h3>
                                            <div class="trailer">
                                                <a href="${data.result[0].youtubeTrailerVideoLink}" target="_blank">Youtube link</a>
                                            </div>
                                        </div>
                                    </div>
                                    <h3>Plot:</h3>
                                    <p>${data.result[0].overview}</p>
                                    <h3>Cast:</h3>
                                    <p>${castString}</p>
                                    `;
            }   
        })
        //error catching
        .catch(() =>{
            pageBody.innerHTML = `<h3 class="msg>Error Occured</h3>`;
            console.log(Error);
        });
    }};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
