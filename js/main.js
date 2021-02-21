axios.get('https://fakestoreapi.com/products')
  .then(function (response) {
    // Récupération des données
    console.log(response.data);
  })
  .catch(function (error) {
    // Log Erreur
    console.log(error);
  })

var menu = document.querySelector('.grid_menu');

function stickyNavigation() {
  let navTop = menu.offsetTop;
  console.log('navTop = ' + navTop);
  console.log('scrollY = ' + window.scrollY);
}

window.addEventListener('scroll', stickyNavigation);