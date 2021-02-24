class Product{
    // Constructeur à partir des données JSON de l'api
    constructor(json){
        this.id = json.id
        this.title = json.title;
        this.price = json.price;
        this.imageUrl = json.image; // Rénommé en imageUrl pour plus de clarté
    }

    id(){
        // Id
        return this.id;
    }

    title(){
        // Titre
        return this.title;
    }

    titleCroped(){
        // Titre raccourci // '...' si le titre est raccouci
        return title.substring(0, 30) + (title.length >= 30 && '...');
    }
    
    priceTTC(){
        // Prix TTC // TVA (20%)
        return this.price * 1.2;
    }

    priceHT(){
        // Prix HT
        return this.price;
    }

    imageUrl(){
        // Description
        return this.imageUrl;
    }
}