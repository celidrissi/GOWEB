var products = []; // Tableau des produits
var online; // Variable de connexion // Permet de bloquer des actions en mode 'Hors Ligne'

// Fonction lancé lorsque le chargement de la page est terminé
window.onload = function(){
    // En fonction des données en sessionStroage, on affiche ou non la banniere
    if (sessionStorage.getItem('banner') === 'false') {
        document.querySelector('.banner').style.display = 'none';
    } else {
        document.querySelector('.banner').style.display = 'block';
    }
}

// Appel de la fonction stickyMenu au scroll
window.onscroll = function() {stickyMenu()};

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyMenu() {
    // Foncton qui ajoute la classe homemade-sticky
    var menu = document.getElementsByClassName("menu")[0];
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
        el.className = (id_product >= 4 && 'carrousel-hide') || 'carrousel-column'; // On n'affiche que les 4 premiers éléments
        el.innerHTML = '<img class="carrousel-thumnbail carrousel-cursor" src="' + p.imageUrl + '" style="width:100%" onclick="showProduct('+ p.id + ')" alt="'+ p.title +'">'
        document.querySelector('.grid_preview_second').append(el);
    }
}

function setUp(data){
    setUpProducts(data);
    setUpCarrousel();
    showProduct(1); 
}

// Affichage du produit séléctionné
function showProduct(id){
    console.log('ShowProduct('+id-1+')');
    var p = products[id-1];
    var el = document.createElement('div');
    el.innerHTML = '<img src="' + p.imageUrl + '" style="width:100%" alt="'+ p.title +'">'
    document.querySelector('.grid_preview_main').innerHTML = el.innerHTML;
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

