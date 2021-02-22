window.onload = function(){
    if (sessionStorage.getItem('banner') === 'false') {
        document.querySelector('.banner').style.display = 'none';
    } else {
        document.querySelector('.banner').style.display = 'block';
    }
}

console.log(document.getElementsByClassName("menu")[0]);

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
    console.log('yolo')
    document.querySelector('.banner').style.display = 'none';
    sessionStorage.setItem('banner', false);
}

axios.get('https://fakestoreapi.com/products')
    .then(function (response) {
        // Récupération des données
        console.log(response.data)
        response.data.forEach(element => {
            var carrouselInner = '<div class="slides"><div class="numbertext">' + element.id + '/' + response.data.length + '</div><img src="'+ element.image +'" style="width:100%"></div>'
            document.getElementsByClassName('carrousel')[0].innerHTML += carrouselInner;

            var columnInner = '<div class="column"><img class="demo cursor" src="' + element.image + '" style="width:100%" onclick="currentSlide('+ element.id + ')" alt="Nature and sunrise"></div>'
            document.querySelectorAll('.carrousel .row')[0].innerHTML += columnInner
        })
        
    })
    .catch(function (error) {
        // Log Erreur
        console.log(error);
    });