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

// Création du tableau des produits suggérés
function setUpMoreProducts(){
    for(id_product in products){
        var p = products[id_product];

        var el = document.createElement('div');
        el.style="grid-column: 1;grid-row: 1;";
        el.className="grid_more_header_content_product";

        var elPrice = document.createElement('div');
        elPrice.className="grid_more_header_content_product_price";

        var elImage = document.createElement('img');

        var elText = document.createElement('div');

        var elButton = document.createElement('button');

        <div style="grid-column: 1;grid-row: 1;" class="">
            ---
            <div class="grid_more_header_content_product_price">
                ---
                <div class="grid_more_header_content_product_price_ttc">131.94€ TTC</div>
                ---
                <div class="grid_more_header_content_product_price_ht">109.95€ HT</div>
                ---
            </div>
            ---
            <img src="./assets/more-product-4.jpg" class="grid_more_header_content_product_image">
            ---
            <div class="grid_more_header_content_product_text">
                Fjallraven - Foldsack No. 1 Backpack
            </div>
            ---
            <button class="grid_more_header_content_product_add_to_cart">
                Ajouter au panier
            </button>
            ---
        </div>
        //el.className = (id_product >= 6 && 'carrousel-hide') || 'carrousel-column'; // On n'affiche que les 4 premiers éléments
        //el.innerHTML = '<img class="carrousel-thumnbail carrousel-cursor" src="' + p.imageUrl + '" onclick="showProduct('+ p.id + ')" alt="'+ p.title +'">'
        //document.querySelector('.grid_preview_second').append(el);
    }
}

// Affichage du produit séléctionné
function showProduct(id){
    var name = assetsMainNames[id];
    document.querySelector('.grid_preview_main').firstChild.src = './assets/' + name;
}

// SetUp des zonnes d'affichage
function setUpMain(){
    var el = document.createElement('div')
    el.innerHTML = '<img class="grid_preview_main_image" style="width: 100%;" src="./assets/img-4.jpg" onclick="showProduct(1)" alt="img-4.jpg">'
    document.querySelector('.grid_preview_main').innerHTML = el.innerHTML;
}

function setUpCarrousel(){
    for(i=3; i>=0; i--){
        var name = assetsMainNames[i]
        // Affichage des photos dans la zone secondaire
        var el = document.createElement('div')
        el.className = 'carrousel-thumnbail carrousel-cursor';
        console.log(document.querySelector('.grid_preview_main_image').offsetWidth)
        el.innerHTML = '<img class="carrousel-thumnbail carrousel-cursor" style="width:100%;height:100%" src="./assets/' + name + '"onclick="showProduct('+ i + ')" alt="' + name + '">'
        document.querySelector('.grid_preview_second').innerHTML += el.innerHTML;
    }
}

function addToCart(value){
    var oldValue = parseInt(document.querySelector('.cart_number').innerText)
    var quantity = parseInt(document.querySelector('.quantities').value)
    document.querySelector('.cart_number').innerText = oldValue + quantity;
}

function setUp(data){
    setUpMain();
    setUpCarrousel();
    setUpProducts(data);
    setUpMoreProducts();
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

