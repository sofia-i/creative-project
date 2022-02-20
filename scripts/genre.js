document.getElementById("submit").addEventListener('click', loadResults);

function loadResults(e) {
    e.preventDefault();

    let selectState = document.getElementById("state-names");
    var state = selectState.options[selectState.selectedIndex].text;
    let lstate = state.toLowerCase();
    console.log(state);

    let selectGenre = document.getElementById("genre-names");
    var genre = selectGenre.options[selectGenre.selectedIndex].text;
    let lgenre = genre.toLowerCase();
    console.log(genre);

    let response = document.getElementById("select-response");
    response.innerHTML = "";

    if(lstate.includes("select") || lgenre.includes("select")) {
        let content = "<p><em> Error: "
        if(state.includes("Select")) {
            content += "Select a state. ";
        }
        if(genre.includes("Select")) {
            content += "Select a genre.";
        }
        content += "</em></p>";
        response.innerHTML = content;
        response.style.display = "inline";
    }
    else {
        let results = document.getElementById("results");
        let fullurl = "https://fr1.api.radio-browser.info/json/stations/search?";
        fullurl += "countrycode=us";
        fullurl += "&state=" + lstate;
        fullurl += "&tag=" + lgenre;
        fullurl += "&limit=10";
        console.log(fullurl);
        fetch(fullurl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let results = document.getElementById("results");
            let content = "<p>Results for <strong>" + genre + "</strong> in <strong>" + state + "</strong></p>";
            if(data.length === 0) {
                content += "<p class='no-results'>**No results found. Try another selection.**</p>"
            }
            else {
                content += "<table class=\"result-table\">"
                content += "<tr>" + "<th>Station Name</th>" + "<th>Description</th>" + "<th>Website Link</th>" + "</tr>";
                for(let elem of data) {
                    content += "<tr>"
                    content += "<td class='station-name'>" + elem.name + "</td>";
                    content += "<td>"
                    const initDescr = elem.tags;
                    let descr = "";
                    let startIndex = 0;
                    let tagCount = 0;
                    while(initDescr.indexOf(",", startIndex) != -1) {
                        let commaIndex = initDescr.indexOf(",", startIndex);
                        if(isNaN(initDescr.substring(startIndex, commaIndex)) && tagCount < 2) {
                            descr += initDescr.substring(startIndex, commaIndex + 1) + " ";
                            ++tagCount;
                        }
                        startIndex = commaIndex + 1;
                    }
                    descr += initDescr.substring(startIndex);
                    content += descr + "</td>";
                    content += "<td>";
                    content += "<a href=\"" + elem.homepage + "\">" + elem.homepage + "</a>";
                    content += "</td>";
                    content += "</tr>";
                }
                content += "</table>"
            }

            results.innerHTML = content;
        })
    }

}