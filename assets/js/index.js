var background = document.getElementById('body');
images = ['./assets/images/image1.png', './assets/images/image2.png', './assets/images/image3.png'];

var imgCount = images.length
//alert(imgCount)
var number = Math.floor(Math.random() * imgCount);
//alert(number)

window.onload = function(){
    background.style.backgroundImage = 'url('+images[number]+')'
}


let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//fetch data from api

let getMovie = () =>{
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=a99e7701`;

    //empty field
    if(movieName.length <= 0){
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    }
    else{
        fetch(url).then(response => response.json()).then((data) =>{
            //movie exists
            if(data.Response == "True"){
                result.innerHTML = `<div class="info">
                                        <img src=${data.Poster} class="poster">
                                        <div>
                                            <h2>${data.Title}</h2>
                                            <div class="rating">
                                                <img src="../images/star.png">
                                                <h4>${data.imdbRating}</h4>
                                            </div>
                                            <div class="details">
                                                <span>${data.Rated}</span>
                                                <span>${data.Year}</span>
                                                <span>${data.Runtime}</span>
                                            </div>
                                            <div class="genre">
                                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3>Plot:</h3>
                                    <p>${data.Plot}</p>
                                    <h3>Cast:</h3>
                                    <p>${data.Actors}</p>
                                    `;
            }

            //movie don't exists
            else{
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`
            }   
        })
        //error catching
        .catch(() =>{
            result.innerHTML = `<h3 class="msg>Error Occured</h3>`;
        });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);