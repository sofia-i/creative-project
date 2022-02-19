document.getElementById("submit").addEventListener('click', loadResults);

function loadResults(e) {
    e.preventDefault();

    let selectState = document.getElementById("state-names");
    var state = selectState.options[selectState.selectedIndex].text;
    console.log(state);

    let selectGenre = document.getElementById("genre-names");
    var genre = selectGenre.options[selectGenre.selectedIndex].text;
    console.log(genre);

    let response = document.getElementById("select-response");
    response.innerHTML = "";

    if(state.includes("Select") || genre.includes("Select")) {
        if(state.includes("Select")) {
            response.innerHTML += "<p><em>" + "Error: Select a state." + "</em></p>";
            response.style.display = "inline";
        }
        if(genre.includes("Select")) {
            response.innerHTML += "<p><em>" + "Error: select a genre." + "</em></p>";
            repsonse.style.display = "inline";
        }
    }
    else {

    }

}