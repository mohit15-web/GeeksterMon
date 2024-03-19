const pokemonContainer = document.getElementById("pokemonContainer");
const searchPok = document.getElementById("searchPok");
const filterbtn = document.getElementById("filterbtn");
let select = document.querySelector("select");
// console.log(select.value);
let colors = {
  grass: "#A0CF59",
  fire: "#FC842E",
  water: "#4E98C7",
  bug: "#79A449",
  normal: "#A9B0B3",
  poison: "#BC85CD",
  electric: "#EFD73F",
  ground: "#F7E049",
  fairy: "#FDBDEA",
  fighting: "#D66F2F",
  psychic: "#F56FBD",
  rock: "#A9932C",
  ghost: "#836AA9",
  ice: "#5BC6E8",
  dragon: "#DDAA2A",
};

function renderCard(detail) {
  let card = document.createElement("card");
  card.classList.add("card");

  card.innerHTML = `
    <div class="py-6 card-front flex justify-center items-center flex-col rounded-md box-shadow shadow-2xl shadow-black">
    <p class="bg-white my-2 w-full text-center">#${detail.id}</p>

    <img src="${detail.sprites.other.dream_world.front_default}" class="h-32 w-32 mx-16 mt-10 transition-transform transform hover:scale-125" alt="${detail.name}">

  
    <h1 class="text-2xl font-bold mt-10">${detail.name}</h1>
    <span class="text-2xl rounded-full px-6 py-1 text-black mt-9 bg-white" >${detail.types[0].type.name}</span>
    </div>`;

  card.querySelector(".card-front").style.backgroundColor =
    colors[detail.types[0].type.name];
  // card.querySelector(".card-back").style.backgroundColor =
  //   colors[detail.types[0].type.name];

  return card;
}

filterbtn.addEventListener("click", () => {
   let allCards = document.querySelectorAll(".card");
   let pokArray = Array.from(allCards);
   pokArray.forEach((element) => {
    // console.log(element);
    let pokemonType = element.children[0].children[3].innerText
    // console.log(pokemonType);
    console.log(select.value);
    if(select.value == pokemonType){
        element.style.display = "block";
    }else{
        element.style.display = "none";
    }
   })
})
async function fetchPokemon() {
  for (let i = 1; i <= 300; i++) {
    let respons = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let data = await respons.json();
    let card = renderCard(data);
    console.log(data);
    pokemonContainer.appendChild(card);
    // console.log(data);
  }
}

searchPok.addEventListener("input", (e) => {
  let allCards = document.querySelectorAll(".card");
  // console.log(allCards);
  let pokeArray = Array.from(allCards);
  pokeArray.forEach((element) => {
    let pokemonName = element.children[0].children[2].innerText;
    if (pokemonName.startsWith(searchPok.value)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(pokemonName);
  });
});

fetchPokemon();