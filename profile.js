var reader = new FileReader();
var image = new Image();
image.src = "img/blank-profile.png"
reader.readAsDataURL(image);
var image2 = new Image();
image2.src = "img/blank-background.png"
reader.readAsDataURL(image2);
function showImage() {
    // Lekérjük az input elemet
    var input = document.getElementById("input-file");
    // Lekérjük az első kiválasztott fájlt
    var file = input.files[0];
    // Létrehozunk egy változót, ami a fájl útvonalát tartalmazza
    var url = URL.createObjectURL(file);
    // Lekérjük az image elemet
    var image = document.getElementById("image");
    // Beállítjuk az image elem src attribútumát a változóra
    image.src = url;
}
function showImage2() {
    // Lekérjük az input elemet
    var input = document.getElementById("input-file2");
    // Lekérjük az első kiválasztott fájlt
    var file = input.files[0];
    // Létrehozunk egy változót, ami a fájl útvonalát tartalmazza
    var url = URL.createObjectURL(file);
    // Lekérjük az image elemet
    var image2 = document.getElementById("image2");
    // Beállítjuk az image elem src attribútumát a változóra
    image2.src = url;
}