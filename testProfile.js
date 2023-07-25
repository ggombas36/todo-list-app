//PROFILE//
var profileInput = document.getElementById("input-profile");
var saveProfile = document.getElementById("save-profile");
var showProfile = document.getElementById("profile");
var fileReaderP = new FileReader();
var kep = localStorage.getItem("profileImage");
if (!(profileInput.files && profileInput.files[0])){
    showProfile.src = kep;
}

// change->show
fileReaderP.onload = function(event) {
    var adatURI = event.target.result;
    showProfile.src = adatURI;
};

// change
profileInput.onchange = function() {
    var kepFile = profileInput.files[0];
    fileReaderP.readAsDataURL(kepFile);
};

// set
saveProfile.onclick = function() {
    // Megkeressük az adat-URI-t az img elem forrásából, és elmentjük egy változóba
    var adatURI = showProfile.src;

    // Ellenőrizzük, hogy van-e értelmes adat-URI
    if (adatURI.startsWith("data:image/")) {
        // Ha igen, akkor elmentjük a local storage-ba "kep" kulcs alatt
        localStorage.setItem("profileImage", adatURI);

        // Kiírunk egy üzenetet, hogy sikeres volt a mentés
        //alert("A kép elmentve local storage-ba!");
    } else {
        // Ha nem, akkor kiírunk egy üzenetet, hogy nincs kiválasztva kép
        alert("You haven't chosen a profile picture!");
    }
};


//BACKGROUND//
var backgroundInput = document.getElementById("input-background");
var saveBackground = document.getElementById("save-background");
var showBackground = document.getElementById("background");
var fileReaderB = new FileReader();
var backImage = localStorage.getItem("backgroundImage");
if (!(profileInput.files && profileInput.files[0])){
    showBackground.src = backImage;
}

// change->show
fileReaderB.onload = function(event) {
    var adatURI = event.target.result;
    showBackground.src = adatURI;
};

// change
backgroundInput.onchange = function() {
    var kepFile = backgroundInput.files[0];
    fileReaderB.readAsDataURL(kepFile);
};

// set
saveBackground.onclick = function() {
    // Megkeressük az adat-URI-t az img elem forrásából, és elmentjük egy változóba
    var adatURI = showBackground.src;

    // Ellenőrizzük, hogy van-e értelmes adat-URI
    if (adatURI.startsWith("data:image/")) {
        // Ha igen, akkor elmentjük a local storage-ba "kep" kulcs alatt
        localStorage.setItem("backgroundImage", adatURI);
        backgroundElement.style.cssText = "background: url('" + adatURI + "'); background-size: cover;\n" +
            "  border-radius: 5px 5px 0 0;\n" +
            "  height: var(--header-height);\n" +
            "  width: 100%;";
        // Kiírunk egy üzenetet, hogy sikeres volt a mentés
        //alert("A kép elmentve local storage-ba!");
    } else {
        // Ha nem, akkor kiírunk egy üzenetet, hogy nincs kiválasztva kép
        alert("You haven't chosen a background picture!");
    }
};

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
    backgroundElement.style.background = "url('img/blank-profile.png')";
    //showProfile.src = 'img/blank-profile.png';
}