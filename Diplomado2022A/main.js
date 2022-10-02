
Vue.component('product', {
    template: `
            <div class="product">
            <div class="product-image">
                <img v-bind:src="image" alt="Lenovo Black">
            </div>
            <div class="product-info">
                <h1>Laptop Lenovo IdeaPad 330-14AST - Windows 10 Home</h1>
                <h4> {{vendidoPor}}</h4>
                <a :href="product_link" target="_blank">Product Details</a>
                <p v-if="inventory > 10">In stock</p>
                <p v-else-if="inventory<= 10 && inventory > 0">Few are available, buy it now</p>
                <p v-else>Out of stock</p>
                <p v-else>Free delivery: {{premium}}</p>

                <!-- Product Details -->
                <ul>
                    <li v-for="detail in details"> {{detail}} </li>
                </ul>
                Available Products:
                <!-- Selecionar productos según el color disponible -->
                <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
                    :style="{backgroundColor:variant.variantColor}" @mouseover="updateProduct(index)">

                </div>
                <!-- Div para el boton Add to cart -->
                <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to
                    cart</button>
            </div>

        <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
          </li>
        </ul>
    
       </div>

                <product-review  @review-submitted="addReview"> </product-review>
        </div>
    `,
    data() {
        return {
            proveedor: 'intercompras',
            product: 'Laptop',
            // image: 'gray_lenovo.jpg',
            selectedProduct: 0,
            product_link:
                'https://intercompras.com/p/laptop-lenovo-ideapad-14ast-amd-a4-4gb-500gb-windows-home-159811',
            // inStock: false,
            inventory: 8,
            details: ["HD 500 GB", " 8 GB RAM", "Windows 10"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'Black',
                    variantImage: 'black_lenovo.jpg',
                    disponible: 10

                },
                {
                    variantId: 2235,
                    variantColor: 'Gray',
                    variantImage: 'gray_lenovo.jpg',
                    disponible: 0
                }
            ],
            reviews: []

        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedProduct].variantId)
        },
        updateProduct(index) {
            this.selectedProduct = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        vendidoPor() {
            return 'Provedor: ' + this.proveedor
        },
        image() {
            return this.variants[this.selectedProduct].variantImage
        },
        inStock() {
            return this.variants[this.selectedProduct].disponible
        }
    }

})

Vue.component('product-review', {
    template: `
          <form class="review-form" @submit.prevent="onSubmit">

              <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
              <li v-for="error in errors">{{ error }}</li>
              </ul>
              </p>
              
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
            }
        }
    }

})

var app = new Vue({
    el: '#app',
    data: {
        cart: []
    },
    methods: {
        updateCart(id) {
            // this.cart += 1
            this.cart.push(id)
        }
    }
})