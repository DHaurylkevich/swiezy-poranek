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
            for (const basketItem of state.basketItems) {
                if (item.index === basketItem.index){
                    basketItem.count += 1;
                    return;
                }
            }
            state.basketItems.push({
                ...item,
                count: 1
            });        
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
