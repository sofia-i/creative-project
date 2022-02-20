let content = "";
content += "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">" + 
    "<a class=\"navbar-brand\" href=\"/index.html\"><img src='/images/radio-logo.png'/></a>" +
    "<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">" + 
    "<span class=\"navbar-toggler-icon\"></span>" +
    "</button>" +
    "<div class=\"collapse navbar-collapse\" id=\"navbarNav\">" +
    "<ul class=\"navbar-nav\">" +
        "<li class=\"nav-item active\">" +
        "<a class=\"nav-link\" href=\"/index.html\">Home <span class=\"sr-only\">(current)</span></a>" +
        "</li>" +
        "<li class=\"nav-item\">" +
        "<a class=\"nav-link\" href=\"/pages/genre-search.html\">Genre Search</a>" +
        "</li>" +
        "<li class=\"nav-item\">" +
        /* "<a class=\"nav-link\" href=\"/pages/radio-guide.html\">Radio Guides</a>" + */
        "<a class=\"nav-link\" href=\"/pages/discover.html\">Discover a Station</a>" + 
        "</li>" +
        "<li class=\"nav-item\">" +
        "<a class=\"nav-link\" href=\"/pages/about.html\">About</a>" +
        "</li>" +
    "</ul>" +
    "</div>" +
"</nav>";

document.getElementById("nbar-div").innerHTML = content;