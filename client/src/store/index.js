import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            basketItems: [] 
        };
    },
    mutations: {
        addToBasket(state, item) {
        state.basketItems.push(item);
        },
        removeFromBasket(state, index) {
        state.basketItems.splice(index, 1);
        }
    },
    getters: {
            items: (state) => state.basketItems
    }
});
