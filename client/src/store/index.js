import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            basketItems: [],
            currentSection: "",
        };
    },
    mutations: {
        addToBasket(state, item) {
        state.basketItems.push(item);
        },
        removeFromBasket(state, index) {
        state.basketItems.splice(index, 1);
        },
        SET_SECTION(state, section) {
            state.currentSection = section;
        }
    },
    getters: {
            items: (state) => state.basketItems,
            currentSection: state => state.currentSection
    }
});
