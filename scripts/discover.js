document.getElementById("submit").addEventListener('click', loadResults);

function loadResults(e) {
    e.preventDefault();
    document.getElementById("results").innerHTML = "";
    document.getElementById("state-selection").style.display = "none";
    document.getElementById("genre-selection").style.display = "none";
    document.getElementById("language-selection").style.display = "none";
    

    let selectWay = document.getElementById("way-names");
    var way = selectWay.options[selectWay.selectedIndex].text;
    if(way.includes("State")) {
        document.getElementById("state-selection").style.display = "inline";
        document.getElementById("submit-state").addEventListener('click', loadStateResults);
    }
    else if(way.includes("Genre")) {
        document.getElementById("genre-selection").style.display = "inline";
        document.getElementById("submit-genre").addEventListener('click', loadGenreResults);
    }
    else if(way.includes("Language")) {
        document.getElementById("language-selection").style.display = "inline";
        loadLanguageResults();
    }
}

function loadStateResults(e) {
    e.preventDefault();
    let selectState = document.getElementById("state-names");
    var state = selectState.options[selectState.selectedIndex].text;
    let lstate = state.toLowerCase();

    if(!lstate.includes("select")) {
        let results = document.getElementById("results");
        let fullurl = "https://fr1.api.radio-browser.info/json/stations/search?";
        fullurl += "countrycode=us";
        fullurl += "&state=" + lstate;
        //console.log(fullurl);
        fetch(fullurl)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let results = document.getElementById("results");
            let randIndex = Math.floor(Math.random() * data.length)
            let station = data[randIndex];
            console.log(station);

            loadStationResults(station, results, false);

            
        })
    }
}

function loadGenreResults(e) {
    e.preventDefault();
    let selectGenre = document.getElementById("genre-names");
    var genre = selectGenre.options[selectGenre.selectedIndex].text;
    let lgenre = genre.toLowerCase();

    if(!lgenre.includes("select")) {
        let results = document.getElementById("results");
        let fullurl = "https://fr1.api.radio-browser.info/json/stations/search?";
        fullurl += "tag=" + lgenre;
        fetch(fullurl)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let results = document.getElementById("results");
            let randIndex = Math.floor(Math.random() * data.length)
            let station = data[randIndex];
            console.log(station);

            loadStationResults(station, results, true);
        })
    }
}

function loadLanguageResults() {
    let langUrl = "https://de1.api.radio-browser.info/json/languages";
    let language = null;
    fetch(langUrl)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        while(true) {
            let randIndex = Math.floor(Math.random() * data.length);
            console.log(data[randIndex]);
            language = data[randIndex].name;
            if(!language.includes("english")) {
                break;
            }
        }
        let fullurl = "https://fr1.api.radio-browser.info/json/stations/search?";
        fullurl += "language=" + language;
        console.log(fullurl);

        let results = document.getElementById("results");
        fetch(fullurl)
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            let randIndex = Math.floor(Math.random() * data.length)
            let station = data[randIndex];
            console.log(station);

            loadStationResults(station, results, true);

        })
    })
    

}

function loadStationResults(station, results, country) {
    let content = "<div class=\"station\">";

    content += "<div class=\"station-image\">";

    if(station.favicon != "") {
        content += "<img style=\"width:100px;\" src=\"" + station.favicon + "\"/>";
    }
    else {
        content += "<img style=\"width:100px;\" src=\"/images/generic.jpeg\"/>";
    }

    content += "</div>"

    content += "<div class=\"station-content\">"

    content += "<div class=\"station-title\">"
    content += "<h3>" + station.name + "</h3>";
    content += "</div>"

    content += "<div class=\"other-content\">"
    
    
    content += "<p>Language: " + station.language + "</p>";
    if(country) {
        content += "<p>Country: " + station.country + "</p>";  
    }
    
    content += "</div>" //the other content div

    content += "</div>" //the station content div

    content += "</div>" //the station div

    content += "<div class=\"station-description\">";
    const initDescr = station.tags;
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
    content += "<em>" + descr + "</em>";
    content += "</div>"

    results.innerHTML = content;
}