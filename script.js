const API_key='eff5cec806cf281194ea35863cacf913';
const API='https://api.themoviedb.org/3';
const imagePath='https://image.tmdb.org/t/p/original';
// const trending='https://api.themoviedb.org/3/trending/movie/week?api_key=eff5cec806cf281194ea35863cacf913';

const api_Paths={
fetchAllCategories:`${API}/genre/movie/list?api_key=${API_key}`,
fetchMovies:(id)=> `${API}/discover/movie?with_genres=${id}&api_key=${API_key}`,
fetchTrending:`https://api.themoviedb.org/3/trending/all/day?api_key=${API_key}&language=en-US`,
fetchPopularTVShows:`https://api.themoviedb.org/3/tv/popular?api_key=${API_key}&language=en-US`,
fetchTVShows:`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_key}&language=en-US`,
// fetchTrailers:(id)=>`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_key}&language=en-US`
 fetchTrailer : (id)=>`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_key}`
}



function init(){
    allCategories(api_Paths.fetchTrending,'Trending Now');

     allCategories(api_Paths.fetchPopularTVShows,'Popular TV Shows');
     allCategories(api_Paths.fetchTVShows,'TV Shows');
  fetchAllSections();
  
    trendingMovies();

}

function fetchAllSections(){
    fetch(api_Paths.fetchAllCategories)
  .then(response => response.json())
  .then(response => {
    const categories=response.genres;   
   
    categories.forEach(category=>{
     
             allCategories(api_Paths.fetchMovies(category.id),category.name);
         })  ;  
           
    // console.table(categories);
  })
  .catch(err => console.error(err));
}

function fetchbannerSection(movie){
      const bannerCont=document.getElementById('banner-section');
      bannerCont.style.backgroundImage=`url(${imagePath}${movie.backdrop_path})`;
      const formattedDate=convertDateFormat(movie.release_date);
      const div=document.createElement('div');
      const value=movie.title;
      div.innerHTML=`
      <div class="banner-main-content">
        <h2 class="heading">${value==movie.title?movie.title:movie.name}
        </h2>
         <p class="trending-no">Trending with ${movie.vote_average} average vote.</p>
         <p class="trending-no">Released on ${formattedDate} </p>
        <p class="banner-info">${movie.overview}</p>
        
        <div class="buttons-cont">
            <button class="action-btn"><i class="fa-solid fa-play"></i>Play</button>
            <button class="action-btn info"><i class="fa-solid fa-circle-info"></i>More Info</button>
        </div>
    </div>
        `;
        bannerCont.innerHTML='';
        bannerCont.appendChild(div);
}
function convertDateFormat(originalDate) {
  const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Parse the original date using the "yyyy-mm-dd" format
  const [year, month, day] = originalDate.split('-');
  const parsedDate = new Date(year, month - 1, day); // Month is 0-based in JavaScript Dates

  // Format the target date as "dd month yy"
  const formattedDate = `${day} ${months[parsedDate.getMonth()].slice(0,3)} ${parsedDate.getFullYear().toString().slice(-2)}`;

  return formattedDate;
}
function trendingMovies(){
  //  allCategories(api_Paths.fetchTrending,'Trending Now')
   fetch(api_Paths.fetchTrending)
  .then(response=>response.json())
  .then(response=>{
    console.log(response.results);
    const trendingList = response.results;
    const randomIndex=parseInt(Math.random()* trendingList.length)
    if (Array.isArray(trendingList) && trendingList.length > 0) {
      fetchbannerSection(trendingList[randomIndex]);
    }
  })
  .catch(err => {
    console.error(err);
  });
}

function allCategories(fetchURL,categoryName){
    console.log(fetchURL,categoryName);
    fetch(fetchURL)
    .then(response=>response.json())
    .then(response=>{
      console.table(response.results);
      const movies=response.results;
      if (Array.isArray(movies) && movies.length){
       movieSection(movies,categoryName)
      }
    })
    .catch(err => console.error(err));
  }


  function movieSection(list,categoryName){
console.log(list,categoryName);
const moviesCont=document.getElementById('movies-cont');
const moviesListHTML=list.map(item=>{
  return   `

  <img src="${imagePath}${item.backdrop_path}" alt="${item.title}" class="movie-item">
  
  `;
  
}).join('');

//  console.log(moviesListHTML);
const moviesSectionHTML= 
`<div class="movies-section">
<h1 class="movies-sec-heading">${categoryName}</h1>
<div class="movie-row">${moviesListHTML}
</div>

</div>`
// console.log(moviesListHTML);
const div=document.createElement('div');
div.className='movies-section';
div.innerHTML=moviesSectionHTML;

moviesCont.append(div);
  }

// function trailers(){
//   fetch(api_Paths.fetchTrailer)
//     .then(response => response.json())
//     .then(data => {
//         const trailers = data.results.filter(video => video.type === 'Trailer');
        
//         if (trailers.length > 0) {
//             const firstTrailerKey = trailers[0].key;
//             const youtubeURL = `https://www.youtube.com/watch?v=${firstTrailerKey}`;
            
//             // Now, 'youtubeURL' contains the link to the first trailer on YouTube
//             console.log(youtubeURL);
//         } else {
//             console.log('No trailers found for this movie.');
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching trailers:', error);
//     });
// }

window.addEventListener('load',function(){
init();

const header=document.getElementById('header');
window.addEventListener('scroll',()=>{
if(window.scrollY>50)
{
  header.classList.add('black-bg');
}
else 
header.classList.remove('black-bg');
})


})

