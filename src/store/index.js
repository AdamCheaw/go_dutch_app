import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        products: [
            {name: 'Banana Skin', price: 20},
            {name: 'Shiny Star', price: 40},
            {name: 'Green Shells', price: 60},
            {name: 'Red Shells', price: 80}
        ],
        friends: [
          {id: "123", userName:"fred"},
          {id: "456", userName:"alex"},
          {id: "789", userName:"chris"}
        ],
        dutchBills: [{
            id: "abc123",
            owners:"I",
            billTitle:"這是測試賬本",
            persons:['I','Adam'],
            bills: [{
              payer: "I",
              debtor: "Adam",
              records: [{
                  title: 'Food',
                  total: 500,
                  divide: 3,
                  payerDivide: 1,
                  debtorDivide: 2
                }
              ]
            },
            {
              payer: "Adam",
              debtor: "I",
              records: [{
                  title: 'Food',
                  total: 500,
                  divide: 2,
                  payerDivide: 1,
                  debtorDivide: 1
                }
              ]
            }] ,
            total:84
          }]
    },
    getters: {
        saleProducts: (state) => {
            var saleProducts = state.products.map( product => {
                return {
                    name:  '**' + product.name + '**',
                    price: product.price / 2,
                };
            });
            return saleProducts;
        }
    },
    mutations: {
        reducePrice: state => {
            state.products.forEach( product => {
                product.price -= 1
            });
        }
    }
});
