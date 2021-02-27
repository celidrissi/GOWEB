var products = []; // Tableau des produits
var online; // Variable de connexion // Permet de bloquer des actions en mode 'Hors Ligne'
var assetsMainNames = ['img-1.jpg','img-2.jpg','img-3.jpg','img-4.jpg']; // Nom des assets pour l'affichage principal

// Fonction lancé lorsque le chargement de la page est terminé
window.onload = function(){
    // En fonction des données en sessionStroage, on affiche ou non la banniere
    if (sessionStorage.getItem('banner') === 'false') {
        document.querySelector('.banner').style.display = 'none';
    } else {
        document.querySelector('.banner').style.display = 'block';
    }
}

// Fonction lancé au redimensiionnement de la page
window.onresize = function(){
    alert("Il s'emblerait que votre page est été redimensionné, rechargement ...");
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
    console.log(products)
}

// Création du tableau des produits suggérés
function setUpMoreProducts(){
    for(id_product in products){
        // Récupération du produit
        var p = products[id_product];
        // Calcul du n° de colonne et de ligne
        var col = p.id % 4;
        var row = Math.ceil(p.id / 4); // Arrondi sup
        //  Création de la div principale + style + class
        var el = document.createElement('div');
        el.style.cssText = 'grid-column: ' + col + ';grid-row: ' + row +';';
        el.className = 'grid_more_header_content_product';
            // Création d'un des éléments de la div + Ajout au parent // Les prix
            var elPrice = document.createElement('div');
            elPrice.className = 'grid_more_header_content_product_price';
                // Création du sous-element + Ajout au parent // Prix TTC
                var elPriceTTC = document.createElement('div')
                elPriceTTC.className = 'grid_more_header_content_product_price_ttc';
                elPriceTTC.innerHTML = p.getPriceTTC() + '€ TTC';
                elPrice.appendChild(elPriceTTC);
                // Création du sous-element + Ajout au parent // Prix HT
                var elPriceHT = document.createElement('div')
                elPriceHT.className = 'grid_more_header_content_product_price_ht';
                elPriceHT.innerHTML = p.getPriceHT() + '€ HT';
                elPrice.appendChild(elPriceHT);
            el.appendChild(elPrice)
            // Création du sous-element + Ajout au parent // Image
            var elImage = document.createElement('img');
            elImage.className = 'grid_more_header_content_product_image';
            elImage.src = p.getImageUrl();
            el.appendChild(elImage);
        // Création du sous-element + Ajout au parent // Texte
        var elText = document.createElement('div');
        elText.className = 'grid_more_header_content_product_text';
        elText.innerHTML = p.getTitleCroped();
        el.appendChild(elText)
        // Création du sous-element + Ajout au parent // Button
        var elButton = document.createElement('button');
        elButton.className = 'grid_more_header_content_product_add_to_cart';
        elButton.innerHTML = 'Ajouter au panier';
        elButton.setAttribute("onclick", "addToCart(1)");
        el.appendChild(elButton);
        // Ajout de la div crée dans le DOM
        document.querySelector('.grid_more_header_content').appendChild(el);
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
        el.innerHTML = '<img class="carrousel-thumnbail carrousel-cursor" style="width:100%;height:100%" src="./assets/' + name + '"onclick="showProduct('+ i + ')" alt="' + name + '">'
        document.querySelector('.grid_preview_second').innerHTML += el.innerHTML;
    }
}

// Fonction d'ajout au panier // oldValue + quantity
function addToCart(value){
    var quantity;
    var oldValue = parseInt(document.querySelector('.cart_number').innerText);
    if(value !== undefined){
        quantity = 1; // Ajout depuis More Product // +1
    } else {
        quantity = parseInt(document.querySelector('.quantities').value); // Ajout depuis la selection principale // +Quantity
    }
    document.querySelector('.cart_number').innerText = oldValue + quantity;
    // Idée pour plus tard : Ajouter un affichage des articles dans le panier
}

// Fonction de setup  // Lancé  au chargement de la page
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

