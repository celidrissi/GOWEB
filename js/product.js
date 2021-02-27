class Product{
    // Constructeur à partir des données JSON de l'api
    constructor(json){
        this.id = json.id
        this.title = json.title;
        this.price = json.price;
        this.imageUrl = json.image; // Rénommé en imageUrl pour plus de clarté
    }

    getId(){
        // Id
        return this.id;
    }

    getTitle(){
        // Titre
        return this.title;
    }

    getTitleCroped(){
        // Titre raccourci // '...' si le titre est raccouci
        return this.title.substring(0, 30) + (this.title.length >= 30 && '...');
    }
    
    getPriceTTC(){
        // Prix TTC // TVA (20%)
        return (this.price * 1.2).toFixed(2);
    }

    getPriceHT(){
        // Prix HT
        return this.price;
    }

    getImageUrl(){
        // Description
        return this.imageUrl;
    }
}