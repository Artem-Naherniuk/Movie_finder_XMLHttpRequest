const SEARCH = document.getElementById('search');
const SEARCHING_TEXT = document.getElementById('inpText');
const CONTAINET = document.querySelector('.container');
let allMovie = document.querySelector('.allMovie');



SEARCH.addEventListener('click', () => {
    let movie = SEARCHING_TEXT.value;
    fetch(`http://www.omdbapi.com/?s=${movie}&page=2&apikey=2cb08985`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (allMovie.firstElementChild) {
                allMovie.innerHTML = '';
            }

            for (let i = 0; i < 9; i++) {


                let div = document.createElement('div');
                div.classList.add('movie', `${i}`);

                let imgdiv = document.createElement('div');
                imgdiv.classList.add('movieImg');
                imgdiv.style.backgroundImage = `url(${data.Search[i].Poster})`;

                let spanName = document.createElement('span');
                spanName.classList.add('movieName');
                spanName.textContent = data.Search[i].Title;

                let spanType = document.createElement('span');
                spanType.classList.add('movieInfo');
                spanType.textContent = data.Search[i].Type;

                let spanYear = document.createElement('span');
                spanYear.classList.add('movieInfo');
                spanYear.textContent = data.Search[i].Year;

                let button = document.createElement('button');
                button.classList.add('movieButton');
                button.textContent = 'More Details';
                button.id = data.Search[i].imdbID;

                div.appendChild(imgdiv);
                div.appendChild(spanName);
                div.appendChild(spanType);
                div.appendChild(spanYear);
                div.appendChild(button);
                allMovie.appendChild(div);
                console.log(data);
                console.log(button.id);
            }
        });

})


const ALERT = document.querySelector('.alert');

document.querySelector('body').addEventListener('mouseup', () => {
    if (allMovie.firstElementChild) {
        let moreInfo = document.querySelector('body');
        moreInfo.addEventListener('click', function (e) {
            const MOVIE_NAME = document.querySelector('#nameMoreInfo');
            const MOVIE_IMG = document.querySelector('#imgeMoreInfo');
            const ABOUT_MOVIE = document.querySelector('#aboutMovieMoreInfo');
            const WRITTEN_BY = document.querySelector('#writtenByMoreInfo');
            const DIRECTEDBY = document.querySelector('#directedByMoreInfo');
            const STAR = document.querySelector('#starringMoreInfo');
            const RUNTIME = document.querySelector('#runtimeMoreInfo');
            const AWARDS = document.querySelector('#awardsMoreInfo');
            if (e.target.textContent == 'More Details') {
                fetch(`http://www.omdbapi.com/?i=${e.target.id}&page=2&apikey=2cb08985`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        MOVIE_IMG.style.backgroundImage = `url(${data.Poster})`;
                        MOVIE_NAME.textContent = data.Title;
                        ABOUT_MOVIE.textContent = data.Plot;
                        WRITTEN_BY.textContent = 'Written by: ' + data.Writer;
                        DIRECTEDBY.textContent = 'Directed By:' + data.Director;
                        STAR.textContent = 'Starring:' + data.Actors;
                        RUNTIME.textContent = 'Runtime:' + data.Runtime;
                        AWARDS.textContent = 'Awards:' + data.Awards;
                        ALERT.style.top = `${window.scrollY+150}px`;
                        ALERT.style.visibility = 'visible';
                        if (ALERT.style.visibility = 'visible') {
                            allMovie.style.opacity = 0.5;
                            CONTAINET.style.opacity = 0.5;
                        }
                    })

            }
        })
    }
})

document.querySelector('body').addEventListener('mouseup', () => {
    if (ALERT.style.visibility == 'visible') {

        let moreInfo = document.querySelector('body');

        moreInfo.addEventListener('click', function (e) {

            if (e.target.id == 'closeAlert') {
                allMovie.style.opacity = 1;
                CONTAINET.style.opacity = 1;
                ALERT.style.visibility = 'hidden';
            }
        })
    }
})