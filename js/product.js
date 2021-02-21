class Product{
    // Constructeur à partir des données JSON de l'api
    constructor(productJson){
        this.title = productJson.title;
        this.price = productJson.price;
        this.imageUrl = productJson.image; // Rénommé en imageUrl pour plus de clarté
    }

    get title(){
        // Titre
        return this.title;
    }

    get titleCroped(){
        // Titre raccourci // '...' si le titre est raccouci
        return title.substring(0, 30) + (title.length >= 30 && '...');
    }
    
    get priceTTC(){
        // Prix TTC // TVA (20%)
        return this.price * 1.2;
    }

    get priceHT(){
        // Prix HT
        return this.price;
    }

    get imageUrl(){
        // Description
        return this.imageUrl;
    }
}
