
 //conversar con bot----------------------------------
// fetch("https://acobot-brainshop-ai-v1.p.rapidapi.com/get?bid=178&key=sX5A2PcYZbsN5EY6&uid=mashape&msg=fine thanks", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "8d435613ebmsh06d579254d353f9p129f05jsn88bbdc279b2e",
// 		"x-rapidapi-host": "acobot-brainshop-ai-v1.p.rapidapi.com"
// 	}
// })
// .then(response => response.text())
// .then(response => console.log(response))
// .catch(err => {
// 	console.error(err);
// });

// Buscar------------------------------------------------

// let respuesta;
// fetch("https://genius.p.rapidapi.com/search?q=vicente fernandez", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "8d435613ebmsh06d579254d353f9p129f05jsn88bbdc279b2e",
// 		"x-rapidapi-host": "genius.p.rapidapi.com"
// 	}
// })
// .then(res => res.json())
// .then(res => {
//     respuesta=res.response.hits[0].result.header_image_url;
//     console.log(res);
// })
// .catch(err => {
// 	console.error(err);
// });

// OMD API ----------------------------------------

// fetch("http://www.omdbapi.com/?apikey=18103076&t=BATMAN")
// .then(response => response.json())
// .then(response => console.log(response))


const searchButton=document.querySelector(".search-btn");
const searchValue=document.querySelector(".search-txt");

//----------------------------------------------------- EVENTOS AL PRESIONAR BOTON DE BUSCAR
searchButton.addEventListener("click",()=>{
    
   let wordSearch=searchValue.value;
    
   window.location.href = "/search.html"+"?ask="+wordSearch;

});


