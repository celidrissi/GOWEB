window.onload = function(){
    if (sessionStorage.getItem('banner') === 'false') {
        document.querySelector('.banner').style.display = 'none';
    } else {
        document.querySelector('.banner').style.display = 'block';
    }
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickyMenu()};

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyMenu() {
    // Get the header
    var header = document.getElementsByClassName("menu")[0];
    // Get the offset position of the navbar
    var sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

function closeBanner(){
    document.querySelector('.banner').style.display = 'none';
    sessionStorage.setItem('banner', false);
}

function showProduct(id){
    var product = document.createElement('div');
    
    document.querySelector('.grid_preview_main').append(product);
}

axios.get('https://fakestoreapi.com/products')
    .then(function (response) {
        // Récupération des données  
        response.data.forEach(element => {
            var product = document.createElement('div');
            product.className = 'carrousel-column';
            product.innerHTML = '<img class="carrousel-thumnbail carrousel-cursor" src="' + element.image + '" style="width:100%" onclick="showProduct('+ element.id + ')" alt="Nature and sunrise">'
            document.querySelector('.grid_preview_second').append(product);
        })
        
    })
    .catch(function (error) {
        // Log Erreur
        console.log(error);
    });