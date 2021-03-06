function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
let songID = getParameterByName("id");


let songInfo={
	albumIMG:[],
	songName:[],
	artistName:[],
	albumName:[],
	lyricsData:[],
	writterName:[],
	releaseDate:[],
	producerName:[],
	youtubeLink:[],
	spotifyLink:[],
	artistID:[]
};

//----------------------------------------------------- EVENTOS AL PRESIONAR BOTON DE BUSCAR
const searchButton=document.querySelector(".search-btn");
const searchValue=document.querySelector(".search-txt");


searchButton.addEventListener("click",()=>{
    
   let wordSearch=searchValue.value;
    
   window.location.href = "search.html"+"?ask="+wordSearch;

});

//------------------------------Consultas

fetch("https://genius.com/songs/"+songID+"/embed.js", {
	"method": "GET",
})
.then(impureLyrics => impureLyrics.text())
.then(impureLyrics => {

	impureLyrics=impureLyrics.substring(impureLyrics.indexOf("JSON"));
	impureLyrics=impureLyrics.substring(0,impureLyrics.indexOf("iframe>")+11);
	songInfo.lyricsData=eval(impureLyrics);
})
.catch(errLyrics => {
	console.error(errLyrics);
});


fetch("https://genius.p.rapidapi.com/songs/"+songID, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "8d435613ebmsh06d579254d353f9p129f05jsn88bbdc279b2e",
		"x-rapidapi-host": "genius.p.rapidapi.com"
	}
})
.then(res => res.json())
.then(res => {


	//save data in the asocitive array
	if(res.response.song.album != null){
		songInfo.albumIMG=res.response.song.album.cover_art_url;
	}
	else{
		if(res.response.song.header_image_thumbnail_url != null){
			songInfo.albumIMG=res.response.song.header_image_thumbnail_url;
		}
	}
	
	songInfo.songName=res.response.song.title;
	if(res.response.song.album != null){
		songInfo.albumName=res.response.song.album.name;
	}
	else{
		songInfo.albumName="Desconocido";
	}
	
	if(res.response.song.album != null){
		songInfo.artistName=res.response.song.album.artist.name;
		songInfo.artistID=res.response.song.album.artist.id;
	}
	else{
		songInfo.artistName=res.response.song.full_title;
		songInfo.artistName=songInfo.artistName.slice(songInfo.artistName.indexOf("by")+3,songInfo.artistName.length);
		songInfo.artistID=res.response.song.primary_artist.id;
	}
	
	if(typeof res.response.song.writer_artists[0] !== 'undefined'){
		songInfo.writterName=res.response.song.writer_artists[0].name;
		document.querySelector(".info__writter").innerHTML=`<b>Escritor:</b>${songInfo.writterName}`;
	}
	if(res.response.song.release_date_for_display != null){
		songInfo.releaseDate=res.response.song.release_date_for_display;
		document.querySelector(".info__relase").innerHTML=`<b>Fecha de lanzamiento:</b>${songInfo.releaseDate}`;
	}
	
	if(typeof res.response.song.producer_artists[0] !== 'undefined'){
		songInfo.producerName=res.response.song.producer_artists[0].name;
		document.querySelector(".info__producer").innerHTML=`<b>Productor:</b>${songInfo.producerName}`;
	}

	// create media

	if(typeof res.response.song.media[0] !== 'undefined'){
		
		for(let i=0;i<res.response.song.media.length;i++){
			if(res.response.song.media[i].provider=="youtube"){
				songInfo.youtubeLink=res.response.song.media[i].url;
				songInfo.youtubeLink=songInfo.youtubeLink.replace("watch?v=","embed/");

		        document.querySelector(".youtube").innerHTML=`<iframe width="270em" height="170em" src=${songInfo.youtubeLink} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
			}
			if(res.response.song.media[i].provider=="spotify"){
				songInfo.spotifyLink=res.response.song.media[i].url;
				songInfo.spotifyLink=songInfo.spotifyLink.replace(".com",".com/embed");
				document.querySelector(".spotify").innerHTML=`<iframe src="${songInfo.spotifyLink}" width="270" height="75" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
			}
		}
		
		
	}
	else{
		document.querySelector(".youtube").innerHTML=`<h4>Escucha esta canción en Youtube</h4><a href="https://www.youtube.com/results?search_query=${songInfo.songName} ${songInfo.artistName}" class="youtube__link"><img src="https://e7.pngegg.com/pngimages/902/668/png-clipart-youtube-facebook-blog-google-youtube-logo-text-logo.png" alt="youtube logo"class="youtube__link--img"></a>`
	}
	
	document.querySelector(".card").style.background=`url('${songInfo.albumIMG}') center/cover fixed`;
	document.querySelector(".card__album").setAttribute("src",songInfo.albumIMG);
	document.querySelector(".card__info").getElementsByTagName("H1")[0].innerHTML=songInfo.songName;
	document.querySelector(".card__info").getElementsByTagName("H2")[0].innerHTML=`<a href="artist.html?id=${songInfo.artistID}">${songInfo.artistName}</a>`;
	document.querySelector(".card__info").getElementsByTagName("H3")[0].innerHTML=songInfo.albumName;

	
	document.querySelector(".lyrics").innerHTML=songInfo.lyricsData;
	document.querySelector(".lyrics").removeChild(document.querySelector(".rg_embed_analytics"));
	document.querySelector(".rg_embed").removeChild(document.querySelector(".rg_embed_header"));
	document.querySelector(".rg_embed").removeChild(document.querySelector(".rg_embed_footer"));



	//create info
	
	
	
})

.catch(err => {
	console.error(err);
});








