var app = new Vue({
    el: "#app",
    data: {
        products: [
            {
                id: 1, 
                title: "Grape_Biancone",
                name: "Biancone", 
                short_text: 'Biancone is a light-skinned grape.',
                image: "01_Biancone.jpg",
                desc: "Full desc"
            },
            {
                id: 2, 
                title: "Grape_Brun-Fourca",
                name: "Brun Fourca",
                short_text: 'Brun Fourca is an ancient red wine grape.',
                image: "02_Brun-Fourca.jpg",
                desc: "Full desc"
            },
            {
                id: 3, 
                title: "Grape_Bigolona",
                name: "Bigolona",
                short_text: 'Bigolona is an ancient and rare Italian white wine.',
                image: "03_Bigolona.jpg",
                desc: "Full desc"
            },
            {
                id: 4, 
                title: "Grape_Abrustine",
                name: "Abrustine",
                short_text: 'Abrustine (Abrostine) is an ancient – and near-extinct.',
                image: "04_Abrustine.jpg",
                desc: "Full desc"
            },
            {
                id: 5, 
                title: "Grape_Rebo",
                name: "Rebo",
                short_text: "Rebo is a dark-skinned crossing of Merlot.",
                image: "05_Rebo.jpg",
                desc: "Full desc"
            }
        ],
        product: {},
        cart: [],
        contactFields:[
            {
                name:'',
                company_name:'',
                position:'',
                city:'',
                country:'',
                telephone:'',
                email:'',
                you_are_a:'',
                specify:'',
                interested:''
            }
        ],
        isOrderPlaced: false,
        btnVisible: false
    },
    methods: {

        getProduct: function() {
            console.log("getProduct started");

            if (window.location.hash) {
                var id = window.location.hash.replace('#','');
                if (this.products && this.products.length > 0) {
                    for (var i = 0; i < this.products.length; i++) {
                        if (this.products[i] && this.products[i].id && id == this.products[i].id) {
                            this.product = this.products[i];
                        }
                    }
                }
            }
            console.log("getProduct end");
        },

        addToCart: function(id) {
            console.log("addToCart started");

            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if (cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible = true;
            }
            console.log("addToCart end");

        },

        checkInCart: function() {
            console.log("checkInCart started");
            if (this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1) {
                this.btnVisible = true;
            }
            console.log("checkInCart end");

        },
        
        getCart: function(id) {
            var cartIds = localStorage.getItem('cart');
            console.log("getCart started");
            console.log(typeof cartIds);
            if (cartIds) {
              cartIds = cartIds.split(',');
              var cart = [];
              for (var i = 0; i < cartIds.length; i++) {
                var product = this.products.find(function(item) {
                  return item.id === parseInt(cartIds[i]);
                });

                if (product) {
                  cart.push(product);
                }
              }
              console.log(cart);
              this.cart = cart;
              console.log("getCart end"); 
            }         
        },
        removeFromCart: function(id) {
            console.log("removeFromCart started");
            var index = this.cart.findIndex(function(item) {
                return item.id === id;
            });

            if (index !== -1) {
                this.cart.splice(index, 1);
                window.localStorage.setItem('cart', this.cart.map(function(item) {
                    return item.id;
                }).join());
            }

            if (window.localStorage.getItem('cart').split(',').indexOf(String(id)) === -1) {
                this.btnVisible = false;
            }

            console.log("removeFromCart end");
        },
        makeOrder() {
            console.log('Order placed!');
            
            localStorage.removeItem('cart');
            this.cart = [];
            this.btnVisible = false;
      
            this.isOrderPlaced = true;
        }
    },
    mounted: function() {
        console.log("Start mounted");
        this.getProduct();
        this.checkInCart();
        this.getCart();
        console.log("End mounted");
    }
});