const fetchCharacterApi = "https://gateway.marvel.com/v1/public/characters";
const ts = 1;
const publicKey = "369f783c1ee3d3a9ebacd8f981d7ee65";
const hash = "b0105084725317d4f69ddd38827117d9";


var superheroArrayList=[];
var searchKey=document.getElementById("search-Key");





const superheroList=document.getElementById("superhero-list");
async function fetchAllSuperhero(){
    var resp = await fetch(fetchCharacterApi+'?ts='+ts+'&apikey='+publicKey+'&hash='+hash);
    var data = await resp.json();
    var result = data.data.results;
    addToList(result);
}

async function superheroWithName(name){
    var resp = await fetch(fetchCharacterApi+'?ts='+ts+'&apikey='+publicKey+'&hash='+hash+'&nameStartsWith='+name);
    var data = await resp.json();
    var result = data.data.results;
    addToList(result);
}

function addToList(results){
    superheroList.innerHTML="";
    const li=document.createElement('li');
    results.map((item)=>{
        const li = document.createElement('li');
        li.innerHTML = `<div class="flex-container">
                                <p >Name : ${item.name}</p>
                                <img height="110" width="110" src=${item.thumbnail.path}.${item.thumbnail.extension} style="margin:5px 0px 0px 100px;">
                                
                                
                                <a href="detail.html?id=${item.id}"><button> Details </button></a>

                        </div>`;
                          
                        
        superheroList.append(li);

    })
}



searchKey.addEventListener('keyup',()=>{
    const searchKeyVal=searchKey.value.trim();
    if(searchKeyVal==0){
        fetchAllSuperhero(); 
    }
    if(searchKeyVal<2){
        return;
    }
    superheroWithName(searchKeyVal);

})



fetchAllSuperhero();