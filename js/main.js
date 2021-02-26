var products = []; // Tableau des produits
var online; // Variable de connexion // Permet de bloquer des actions en mode 'Hors Ligne'
var preview_height; // Variable contenant la largeur de la preview // #PasOuf #Triche
var preview_width; // Variable contenant la largeur de la preview // #PasOuf #Triche
var assetsMainNames = ['img-1.jpg','img-2.jpg','img-3.jpg','img-4.jpg']; // Nom des assets pour l'affichage principal

// Fonction lancé lorsque le chargement de la page est terminé
window.onload = function(){
    preview_height = document.querySelector('.grid_preview_main').clientHeight;
    preview_width = document.querySelector('.grid_preview_main').clientWidth;
    // En fonction des données en sessionStroage, on affiche ou non la banniere
    if (sessionStorage.getItem('banner') === 'false') {
        document.querySelector('.banner').style.display = 'none';
    } else {
        document.querySelector('.banner').style.display = 'block';
    }
}

// Fonction lancé au redimensiionnement de la page
window.onresize = function(){
    alert("Il s'emblerait que votre page est été redimensionné, rechargement ..");
    location.reload();
}

// Appel de la fonction stickyMenu au scroll
window.onscroll = function() {stickyMenu()};

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyMenu() {
    // Foncton qui ajoute la classe homemade-sticky
    var menu = document.getElementsByClassName("grid_header")[0];
    var sticky = menu.offsetTop;
    // On active la classe seulement quand le scroll arrive à la possition (Y) du menu
    if (window.pageYOffset > sticky) {
        menu.classList.add("homemade-sticky");
    } else {
        menu.classList.remove("homemade-sticky");
    }
}

// Fonction de fermeture de la banniere + Sauvegarde de l'etat en sessionStorage
function closeBanner(){
    // Configuration du display à none quand on ferme la banniere 
    document.querySelector('.banner').style.display = 'none';
    sessionStorage.setItem('banner', false);
}

// Fonction lancé lorsque un choix est fait (sur les selects)
function selectChange(){
    console.log('hey');
    var colorValue = document.querySelector('.colors').selectedIndex;
    var sizeValue = document.querySelector('.size').selectedIndex
    if (colorValue && sizeValue){
        document.querySelector('.grid_add_to_cart').disabled = false
        document.querySelector('.grid_add_to_cart').style.cursor = 'default';
    }
}

// Création du tableau de produits 
function setUpProducts(data) {
    // Pour chaque produit on ajoute dans le tableau de produit un object Product crée à partir des doonées de l'API
    data.forEach(obj => {
        products.push(new Product(obj));
    });
    return true
}

// Création du carrousel des choix de produits
function setUpCarrousel(){
    for(id_product in products){
        var p = products[id_product];
        var el = document.createElement('div');
        el.className = (id_product >= 6 && 'carrousel-hide') || 'carrousel-column'; // On n'affiche que les 4 premiers éléments
        el.innerHTML = '<img class="carrousel-thumnbail carrousel-cursor" src="' + p.imageUrl + '" onclick="showProduct('+ p.id + ')" alt="'+ p.title +'">'
        document.querySelector('.grid_preview_second').append(el);
    }
}

// Affichage du produit séléctionné
function showProduct(id){
    var name = assetsMainNames[id];
    document.querySelector('.grid_preview_main').firstChild.src = './assets/' + name;
}

// SetUp des zonnes d'affichage
function setUpMain(){
    for(i=3; i>=0; i--){
        var name = assetsMainNames[i]
        var el = document.createElement('div')
        if (name == 'img-4.jpg'){
            // Affichage de la premiere photo dans zone principal
            el.innerHTML = '<img style="max-width:100%; max-height:100%" src="./assets/' + name + '" onclick="showProduct('+ i + ')"' + name + '">'
            document.querySelector('.grid_preview_main').innerHTML = el.innerHTML;
        }
        // Affichage des photos dans la zone secondaire
        el.className = 'carrousel-thumnbail carrousel-cursor';
        var w = document.querySelector('.grid_preview_second').clientWidth/4 - 10;
        el.innerHTML = '<img class="carrousel-thumnbail carrousel-cursor" style="width:' + w + 'px" src="./assets/' + name + '"onclick="showProduct('+ i + ')" alt="' + name + '">'
        document.querySelector('.grid_preview_second').innerHTML += el.innerHTML;
    }
}

function addToCart(value){
    var oldValue = parseInt(document.querySelector('.cart_number').innerText)
    var quantity = parseInt(document.querySelector('.quantities').value)
    document.querySelector('.cart_number').innerText = oldValue + quantity;
}

function setUp(data){
    setUpMain()
    //setUpProducts(data);
    //setUpCarrousel();
    //showProduct(1); 
}



// Api Axios qui récupére les données
function callApi(){
    axios.get('https://fakestoreapi.com/products')
    .then(function (response) {
        // Récupération et traitement des données
        setUp(response.data);
    })
    .catch(function (error) {
        // Log Erreur
        console.log(error);
    });
}

// Test de connexion + setup de la variable online
if (online = navigator.onLine){
    callApi();
} else {
    console.log('Mode Hors-Ligne');
    // Dans le cas où il n'y à pas de connexion internet on importe des données locales
    var offline_data = require('../json/products.json');
    callApi(require(offline_data));
}

