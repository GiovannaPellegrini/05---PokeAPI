document.addEventListener('DOMContentLoaded', function(){
    // Para carregar todos os pokémons
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        const pokemonSelect = document.getElementById('pokemon-select');

        const pokemonList = data.results;
        pokemonList.sort((a, b) => a.name.localeCompare(b.name));


        pokemonList.forEach(pokemon => {

            const option = document.createElement('option');
            option.value = pokemon.name;
            option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            pokemonSelect.appendChild(option);
        });
    });
});

document.getElementById('pokemon-select').addEventListener('change',function(){

    // const pokemonName = document.getElementById('pokemon-select').value;
    const pokemonName = this.value;

    if (pokemonName == '' || pokemonName == null) {
            const pokemonDisplay = document.getElementById('pokemon-display');
            pokemonDisplay.style.display = 'none'
        return;
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
            document.getElementById('pokemon-image').src = data.sprites.other.home.front_default; 
            document.getElementById('pokemon-sound').src = data.cries.latest; 

            const spritesContainer = document.getElementById('pokemon-sprites');
            spritesContainer.innerHTML = '';

            // Captura a URL
            const spritUrl = [
                data.sprites.front_default,
                data.sprites.back_default,
                data.sprites.front_shiny,
                data.sprites.back_shiny
            ];

            // Cria um elemento
            spritUrl.forEach(url => {

                const imgElement = document.createElement('img');
                imgElement.src = url;
                spritesContainer.appendChild(imgElement);

            });        
            
            const pokemonDisplay = document.getElementById('pokemon-display');
            pokemonDisplay.style.display = 'block'

        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Pokémon não encontrado!')
        })

});