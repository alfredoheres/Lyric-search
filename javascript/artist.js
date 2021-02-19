

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let artistID = getParameterByName("id");

let artistInfo={
    artistIMG:[],
    descriptionInfo:[],
    artistName:[]
};
//----------------------------------------------------- EVENTOS AL PRESIONAR BOTON DE BUSCAR
const searchButton=document.querySelector(".search-btn");
const searchValue=document.querySelector(".search-txt");


searchButton.addEventListener("click",()=>{
    
   let wordSearch=searchValue.value;
    
   window.location.href = "search.html"+"?ask="+wordSearch;

});


fetch("https://genius.p.rapidapi.com/artists/"+artistID, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "8d435613ebmsh06d579254d353f9p129f05jsn88bbdc279b2e",
		"x-rapidapi-host": "genius.p.rapidapi.com"
	}
})
.then(res => res.json())
.then(res => {
    console.log(res);
    let elementP;

    artistInfo.artistIMG=res.response.artist.image_url;
    artistInfo.descriptionInfo=res.response.artist.description.dom.children;
    artistInfo.artistName=res.response.artist.name;

    document.querySelector(".card").style.background=`url('${artistInfo.artistIMG}') center/cover fixed`;
    document.querySelector(".card").getElementsByTagName("IMG")[0].setAttribute("src",artistInfo.artistIMG);
    //obtaining and procesing description
    let contenido=[];
    if (artistInfo.descriptionInfo.length>=1){
        for(let i=0;i<artistInfo.descriptionInfo.length;i++){
            if((typeof artistInfo.descriptionInfo[i])=="object"){
                if(typeof artistInfo.descriptionInfo[i].children !=="object"){
                    if(typeof artistInfo.descriptionInfo[i].children !=="object"){//depurar
                        contenido=contenido+artistInfo.descriptionInfo[i].children;
                    }
                    
                }
                else if(typeof artistInfo.descriptionInfo[i].children ==="object"){
                    for(let n=0;n<artistInfo.descriptionInfo[i].children.length;n++){
                        if(typeof artistInfo.descriptionInfo[i].children[n]==="object"){
                            if(typeof artistInfo.descriptionInfo[i].children[n].children !== 'undefined'){
                                if(typeof artistInfo.descriptionInfo[i].children[n].children !=="object"){//depurar
                                    contenido=contenido+artistInfo.descriptionInfo[i].children[n].children;
                                }
                                else{
                                    for(let m=0;m<artistInfo.descriptionInfo[i].children[n].children.length;m++){
                                        
                                            if(typeof artistInfo.descriptionInfo[i].children[n].children[m] !=="object"){//depurar
                                               
                                                    contenido=contenido+artistInfo.descriptionInfo[i].children[n].children[m];
                                                
                                                
                                            }
                                        
                                    }
                                }
                                
                                
                                
                            }
                            
                        }
                        else{
                            if(typeof artistInfo.descriptionInfo[i].children[n] !=="object"){//depurar
                                contenido=contenido+artistInfo.descriptionInfo[i].children[n];
                            }
                            
                        }
                    }
                }
                
            }
        }
    }

    elementP=document.createElement("P");
    elementP.innerHTML=contenido;
    document.querySelector(".about").appendChild(elementP);




    document.querySelector(".card__info").getElementsByTagName("H1")[0].innerHTML=artistInfo.artistName;
})
.catch(err => {
	console.error(err);
});


fetch("https://genius.p.rapidapi.com/artists/"+artistID+"/songs?sort=popularity", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "8d435613ebmsh06d579254d353f9p129f05jsn88bbdc279b2e",
		"x-rapidapi-host": "genius.p.rapidapi.com"
	}
})
.then(res => res.json())
.then(res => {
    let newLI=[];
    let newA=[];

    for(let i=0;i<res.response.songs.length;i++){
        newLI[i]=document.createElement("LI");
        newA[i]=document.createElement("A");
        newA[i].innerHTML=`${i+1}. `+`${res.response.songs[i].title}`;
        document.querySelector(".popular__songs").appendChild(document.createElement("LI"));
        document.querySelector(".popular__songs").getElementsByTagName("LI")[i].appendChild(newA[i]);
        document.querySelector(".popular__songs").getElementsByTagName("LI")[i].getElementsByTagName("A")[0].setAttribute("href","song.html"+"?id="+res.response.songs[i].id)
    }


    console.log(res);
})
.catch(err => {
	console.error(err);
});



