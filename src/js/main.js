const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <div onclick="showDetails(${pokemon.number})" style="cursor: pointer; id="pokeDiv">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        </div>`
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function convertPokemonToDiv(pokemon) {
    console.log(pokemon);
    return `
    <header class="header_detail">
    <div class="${pokemon.type}">
    <span id="pokemonName" class="header_detail_name">${pokemon.name} </span>
    <span id="pokemonNumber" class="header_detail_id"> - N° ${pokemon.number}</span>
    </div>
    </header>
<main>
    <div class="apresentacao_pokemon" >
        <img class="apresentacao_pokemon_foto" src="${pokemon.photo}" alt="${pokemon.name}">
        <div class="apresentacao_pokemon_label apresentacao_pokemon_type">
            ${pokemon.types.map((type) => `<span class="apresentacao_pokemon_tipo ${type}">${type}</span>`).join('')}
        </div>
        <br/>
        <span class="apresentacao_pokemon_label">Detalhes:</span>
        <div class="apresentacao_pokemon_caracteristica_conteiner" >
            <div class="apresentacao_pokemon_caracteristica">
            <span class="apresentacao_pokemon_caracteristica_detalhe2">Peso</span>
                <span class="apresentacao_pokemon_caracteristica_detalhe">${pokemon.weight} kg</span>
            </div>
            <div class="apresentacao_pokemon_caracteristica">
            <span class="apresentacao_pokemon_caracteristica_detalhe2">Altura</span>
                <span class="apresentacao_pokemon_caracteristica_detalhe">${pokemon.height} m</span>
            </div>
        </div>
        <div class="apresentacao_pokemon_habilities">
            <span class="apresentacao_pokemon_label">Habilidades:</span>
            <ul class="pokemon_habilities">
                 ${pokemon.abilities.map((ability) => `<li class="${pokemon.type} ability ${ability}">${ability}</li>`).join('')}
            </ul>
        </div>
    </div>
</main>
    `;
}

function loadPokemonDetail(id) {

    pokeApi.getPokemonDetailId(id).then((pokemon) => {
        const pokemonHtml = convertPokemonToDiv(pokemon);
        const pokemonDetailElement = document.getElementById('pokemonDetail');
        pokemonDetailElement.classList.add(pokemon.type);
        document.getElementById("pokemonDetailModal").style.display = "block";

        if (pokemonDetailElement) {
            pokemonDetailElement.innerHTML = pokemonHtml;
        } else {
            console.error('Elemento pokemonDetail não encontrado na nova janela.');
        }
    });
}

function showDetails(id) {

    const link = document.createElement("a");
    loadPokemonDetail(id);
}



var modal = document.getElementById("pokemonDetailModal");
var span = document.getElementById("closeModal");
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}
