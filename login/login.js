var backgroundSet = localStorage.getItem("backgroundImage");
var backgroundElement = document.getElementById("header-background")
// Ellenőrizzük, hogy van-e értelmes adat-URI
if (backgroundSet && backgroundSet.startsWith("data:image/")) {
    // Ha igen, akkor beállítjuk az img elem forrását az adat-URI-ra, hogy megjelenítsük a képet
    backgroundElement.style.cssText = "background: url('" + backgroundSet + "'); background-size: cover;\n" +
        "  border-radius: 5px 5px 0 0;\n" +
        "  height: var(--header-height);\n" +
        "  width: 100%;";
    //showProfile.src = adatURI;
} else {
    backgroundElement.style.background = "url('img/blank-background.png')";
    //showProfile.src = 'img/blank-profile.png';
}