var list = document.getElementById('list');
const SUPERHERO_KEY = 'superhero';
 
// document.getElementByClassName("removeFromFav").style.cssText = "font-size:20px;";

function getItemFromLS(){
	var favSuperHeroArray = JSON.parse(localStorage.getItem(SUPERHERO_KEY));
	if(!favSuperHeroArray){
		favSuperHeroArray = [];
	}
	return favSuperHeroArray;
}

function removeItemFromLS(item){
	var favSuperHeroArray = getItemFromLS();
	favSuperHeroArray = favSuperHeroArray.filter((tempItem)=>{
		return item != tempItem;
	});
	localStorage.setItem(SUPERHERO_KEY,JSON.stringify(favSuperHeroArray));
}

async function getAllSuperhero(){
	var favouriteSuperHeroArray = getItemFromLS();
	favouriteSuperHeroArray.map(async (item)=>{
		let resp = await fetch(`https://gateway.marvel.com/v1/public/characters/${item}?ts=1&apikey=b6260427a134aec96249939adf25e89a&hash=cb574ae77cc55b3d1d9aa05524029ab8`);
		let data = await resp.json();
		data = data.data.results[0];
		var li = document.createElement('li');
		console.log(data);
		console
        li.innerHTML = `<div class="container">
						<p data-id=${data.id}>${data.name}</p>
						<img height="250" width="250" src=${data.thumbnail.path}.${data.thumbnail.extension}>
						<button class='removeFromFav'>Remove From Favourites</button>
						</div>`;
		list.append(li);
        li.getElementsByClassName('removeFromFav')[0].addEventListener('click',function (){
            removeItemFromLS(data.id);
			location.reload();
        });
	})
}

getAllSuperhero();