fetch("https://fakestoreapi.com/products")
.then( response => response.json() )
.then( json => console.log(json) )
.catch( error => console.error('error:', error) );