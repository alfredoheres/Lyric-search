
const searchButton=document.querySelector(".search-btn");
const searchValue=document.querySelector(".search-txt");

//----------------------------------------------------- EVENTOS AL PRESIONAR BOTON DE BUSCAR
searchButton.addEventListener("click",()=>{
    
   let wordSearch=searchValue.value;
    
   window.location.href = "search.html"+"?ask="+wordSearch;

});


