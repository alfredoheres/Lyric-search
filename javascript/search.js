function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
let searchID = getParameterByName("ask");
console.log(searchID);




let dataSearch={
    artistID:[],
    artistName:[],
    artistIMG:[],
    songID:[],
    songName:[],
    songIMG:[],
    typeOfResult:[] //three posibilities : song, artist, none
};
let totalArtistSearch=[];
let totalSongSearch=[];
let totalSuggestionsSearch=[];



const searchButton=document.querySelector(".search-btn");
const searchValue=document.querySelector(".search-txt");
let wordSearch=searchID;
wordSearch=wordSearch.toUpperCase();
let flagFind=false;

searchValue.value=searchID;


search();


//----------------------------------------------------- EVENTOS AL PRESIONAR BOTON DE BUSCAR
searchButton.addEventListener("click",()=>{

    wordSearch=searchValue.value;
    wordSearch=wordSearch.toUpperCase();
    search();
});





function search(){
        //reset values
        if(document.querySelector(".container-info").classList.contains("suggestions")){
            document.querySelector(".container-info").removeChild(document.querySelector(".container-suggestions"));
            document.querySelector(".container-info").classList.remove("suggestions");
        }
        if(document.querySelector(".container-info").classList.contains("songs")){
            document.querySelector(".container-info").removeChild(document.querySelector(".container-songs"));
            document.querySelector(".container-info").classList.remove("songs");
        }
        if(document.querySelector(".container-info").classList.contains("artist")){
            document.querySelector(".container-info").removeChild(document.querySelector(".container-artist"));
            document.querySelector(".container-info").classList.remove("artist");
        }
        artistID=[],
        artistName=[],
        artistIMG=[],
        songID=[],
        songName=[],
        songIMG=[],
        typeOfResult=[]
        totalArtistSearch=[];
        totalSongSearch=[];
        totalSuggestionsSearch=[];
    
    
       
        
        let lengthSearch;
    
        let numTotalArtistSearch=0;
        let numTotalSongSearch=0;
        let numTotalSuggestionsSearch=0;
        let newDIVArtist=[];
        let newIMGArtist=[];
        let newPArtist=[];
        let newAArtist=[];
        let newDIVSong=[];
        let newIMGSong=[];
        let newASong=[];
        let newPSSong=[];
        let newPASong=[];
        let newDIVSuggestions=[];
        let newIMGSuggestions=[];
        let newPSSuggestions=[];
        let newPASuggestions=[];
        let newASuggestions=[];
        // pedir datos de busqueda por fech
        fetch("https://genius.p.rapidapi.com/search?q="+wordSearch, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "8d435613ebmsh06d579254d353f9p129f05jsn88bbdc279b2e",
            "x-rapidapi-host": "genius.p.rapidapi.com"
        }
        })
        .then(res => res.json())
        .then(res => {
            lengthSearch=res.response.hits.length;
            
            for(let numSearch=0;numSearch<lengthSearch;numSearch++){
    
                //save data in the asocitive array
                dataSearch.artistID[numSearch]=res.response.hits[numSearch].result.primary_artist.id;
                dataSearch.artistName[numSearch]=res.response.hits[numSearch].result.primary_artist.name;
                dataSearch.artistName[numSearch]=dataSearch.artistName[numSearch].normalize("NFD").replace(/[\u0300-\u036f]/g, "");//remove tildes of the word
                dataSearch.artistName[numSearch]=dataSearch.artistName[numSearch].toUpperCase();//transform to UperCase Name artist
                dataSearch.artistIMG[numSearch]=res.response.hits[numSearch].result.primary_artist.image_url;
                dataSearch.songID[numSearch]=res.response.hits[numSearch].result.id;
                dataSearch.songName[numSearch]=res.response.hits[numSearch].result.title;
                dataSearch.songName[numSearch]=dataSearch.songName[numSearch].normalize("NFD").replace(/[\u0300-\u036f]/g, "");//remove tildes of the word
                dataSearch.songName[numSearch]=dataSearch.songName[numSearch].toUpperCase();//transform to UperCase Name song
                dataSearch.songIMG[numSearch]=res.response.hits[numSearch].result.header_image_url;
               
                //Separate the songs from the artist
                if(dataSearch.songName[numSearch].includes(wordSearch)){
                    if(numTotalSongSearch===0)
                        {   //create main div of songs
                            document.querySelector(".container-info").appendChild(document.createElement("DIV")); 
                            document.querySelector(".container-info").lastElementChild.classList.add("container-songs");
                            document.querySelector(".container-info").classList.add("songs");
    
                            //create title h3
                            document.querySelector(".container-songs").appendChild(document.createElement("H3"));
                            document.querySelector(".container-songs").getElementsByTagName("H3")[0].innerHTML="Canciones";
                        }
                    totalSongSearch[numTotalSongSearch]=dataSearch.songName[numSearch];
                    dataSearch.typeOfResult[numSearch]="song";
                    //create card containers with atributes
                        //create DIV
                        newDIVSong[numTotalSongSearch]=document.createElement("DIV");
                        document.querySelector(".container-songs").appendChild(newDIVSong[numTotalSongSearch]);
                        document.querySelector(".container-songs").getElementsByTagName("DIV")[numTotalSongSearch].classList.add("result-s"+numTotalSongSearch);
                        //create a link
                        newASong[numTotalSongSearch]=document.createElement("A");
                        document.querySelector(".result-s"+numTotalSongSearch).appendChild(newASong[numTotalSongSearch]);
                        document.querySelector(".result-s"+numTotalSongSearch).getElementsByTagName("A")[0].setAttribute("href","song.html"+"?id="+dataSearch.songID[numSearch]);
                        //create IMG
                        newIMGSong[numTotalSongSearch]=document.createElement("IMG");
                        document.querySelector(".result-s"+numTotalSongSearch).getElementsByTagName("A")[0].appendChild( newIMGSong[numTotalSongSearch]);
                        document.querySelector(".result-s"+numTotalSongSearch).getElementsByTagName("IMG")[0].classList.add("result-s"+numTotalSongSearch+"__img");
                        //put SCR to IMG
                        var imagen=document.querySelector(".result-s"+numTotalSongSearch+"__img");
                        imagen.setAttribute("src",dataSearch.songIMG[numSearch]);
                        //Create the name of the Song
                        newPSSong[numTotalSongSearch]=document.createElement("P");
                        document.querySelector(".result-s"+numTotalSongSearch).appendChild( newPSSong[numTotalSongSearch]);
                        newPSSong[numTotalSongSearch].innerHTML=`<a href="song.html?id=${dataSearch.songID[numSearch]}"><b>Canción:</b> <span>${dataSearch.songName[numSearch]}</span></a>`;
    
                        newPASong[numTotalSongSearch]=document.createElement("P");
                        document.querySelector(".result-s"+numTotalSongSearch).appendChild(newPASong[numTotalSongSearch]);
                        newPASong[numTotalSongSearch].innerHTML=`<a href="artist.html?id=${dataSearch.artistID[numSearch]}"><b>Artista:</b> <span>${dataSearch.artistName[numSearch]}</span></a>`;
                        //counter of Song find
                        numTotalSongSearch=numTotalSongSearch+1;
                }
                else if(dataSearch.artistName[numSearch].includes(wordSearch)){
                       
                    if(totalArtistSearch.includes(dataSearch.artistName[numSearch])==false){
                        if(numTotalArtistSearch===0)
                        {
                            //create main div of artist
                            document.querySelector(".container-info").appendChild(document.createElement("DIV")); 
                            document.querySelector(".container-info").lastElementChild.classList.add("container-artist");
                            document.querySelector(".container-info").classList.add("artist");
                            //create title h3
                            document.querySelector(".container-artist").appendChild(document.createElement("H3"));
                            document.querySelector(".container-artist").getElementsByTagName("H3")[0].innerHTML="Artistas";
                        }
                        totalArtistSearch[numTotalArtistSearch]=dataSearch.artistName[numSearch];
                        dataSearch.typeOfResult[numSearch]="artist";
                        //create card containers with atributes
                        //create DIV
                        newDIVArtist[numTotalArtistSearch]=document.createElement("DIV");
                        document.querySelector(".container-artist").appendChild(newDIVArtist[numTotalArtistSearch]);
                        document.querySelector(".container-artist").getElementsByTagName("DIV")[numTotalArtistSearch].classList.add("result-a"+numTotalArtistSearch)
                        //create a link
                        newAArtist[numTotalArtistSearch]=document.createElement("A");
                        document.querySelector(".result-a"+numTotalArtistSearch).appendChild(newAArtist[numTotalArtistSearch]);
                        document.querySelector(".result-a"+numTotalArtistSearch).getElementsByTagName("A")[0].setAttribute("href","artist.html"+"?id="+dataSearch.artistID[numSearch]);
                        //create IMG
                        newIMGArtist[numTotalArtistSearch]=document.createElement("IMG");
                        document.querySelector(".result-a"+numTotalArtistSearch).getElementsByTagName("A")[0].appendChild( newIMGArtist[numTotalArtistSearch]);
                        document.querySelector(".result-a"+numTotalArtistSearch).getElementsByTagName("IMG")[0].classList.add("result-a"+numTotalArtistSearch+"__img");
                        //put SCR to IMG
                        var imagen=document.querySelector(".result-a"+numTotalArtistSearch+"__img");
                        imagen.setAttribute("src",dataSearch.artistIMG[numSearch]);
                        //Create the name of the artist
                        newPArtist[numTotalArtistSearch]=document.createElement("P");
                        document.querySelector(".result-a"+numTotalArtistSearch).appendChild( newPArtist[numTotalArtistSearch]);
                        newPArtist[numTotalArtistSearch].innerHTML=`<a href="artist.html?id=${dataSearch.artistID[numSearch]}"><b>Artista:</b> <span>${dataSearch.artistName[numSearch]}</span></a>`;
    
                        //counter of artist find
                        numTotalArtistSearch=numTotalArtistSearch+1;
                    }   
                    else{
                        
                        dataSearch.typeOfResult[numSearch]="artist2";
                    }          
                }
                else{
                    if(numTotalSuggestionsSearch===0)
                    {
                        //create main div of suggestions
                        document.querySelector(".container-info").appendChild(document.createElement("DIV")); 
                        document.querySelector(".container-info").lastElementChild.classList.add("container-suggestions");
                        document.querySelector(".container-info").classList.add("suggestions");
                         //create title h3
                         document.querySelector(".container-suggestions").appendChild(document.createElement("H3"));
                         document.querySelector(".container-suggestions").getElementsByTagName("H3")[0].innerHTML="Sugerencias";
                    }
                    totalSuggestionsSearch[numTotalSuggestionsSearch]=dataSearch.songName[numSearch];
                    dataSearch.typeOfResult[numSearch]="sugestions";  
                   
                    //create card containers with atributes
                        //create DIV
                        newDIVSuggestions[numTotalSuggestionsSearch]=document.createElement("DIV");
                        document.querySelector(".container-suggestions").appendChild(newDIVSuggestions[numTotalSuggestionsSearch]);
                        document.querySelector(".container-suggestions").getElementsByTagName("DIV")[numTotalSuggestionsSearch].classList.add("result-su"+numTotalSuggestionsSearch)
                         //create a link
                         newASuggestions[numTotalSuggestionsSearch]=document.createElement("A");
                         document.querySelector(".result-su"+numTotalSuggestionsSearch).appendChild(newASuggestions[numTotalSuggestionsSearch]);
                         document.querySelector(".result-su"+numTotalSuggestionsSearch).getElementsByTagName("A")[0].setAttribute("href","song.html"+"?id="+dataSearch.songID[numSearch]);
                        //create IMG
                        newIMGSuggestions[numTotalSuggestionsSearch]=document.createElement("IMG");
                        document.querySelector(".result-su"+numTotalSuggestionsSearch).getElementsByTagName("A")[0].appendChild( newIMGSuggestions[numTotalSuggestionsSearch]);
                        document.querySelector(".result-su"+numTotalSuggestionsSearch).getElementsByTagName("IMG")[0].classList.add("result-su"+numTotalSuggestionsSearch+"__img");
                        //put SCR to IMG
                        var imagen=document.querySelector(".result-su"+numTotalSuggestionsSearch+"__img");
                        imagen.setAttribute("src",dataSearch.songIMG[numSearch]);
                        //Create the name of songs and artist
                        newPASuggestions[numTotalSuggestionsSearch]=document.createElement("P");
                        document.querySelector(".result-su"+numTotalSuggestionsSearch).appendChild( newPASuggestions[numTotalSuggestionsSearch]);
                        newPASuggestions[numTotalSuggestionsSearch].innerHTML=`<a href="artist.html?id=${dataSearch.artistID[numSearch]}"><b>Artista:</b> <span>${dataSearch.artistName[numSearch]}</span></a>`;
    
    
                        newPSSuggestions[numTotalSuggestionsSearch]=document.createElement("P");
                        document.querySelector(".result-su"+numTotalSuggestionsSearch).appendChild( newPSSuggestions[numTotalSuggestionsSearch]);
                        newPSSuggestions[numTotalSuggestionsSearch].innerHTML=`<a href="song.html?id=${dataSearch.songID[numSearch]}"><b>Canción:</b> <span>${dataSearch.songName[numSearch]}</span></a>`;
    
                        //counter of Suggestions find
                        numTotalSuggestionsSearch=numTotalSuggestionsSearch+1;
                }
                            
                
            }
            console.log(res);  
        })
        .catch(err => {
            console.error(err);
        });
    
    
}



