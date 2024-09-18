import { createStore } from 'vuex';
import { getPackages } from '@/services/packageServices';

export default createStore({
    state() {
        return {
            basketItems: [],
            currentSection: "",
            packages: [], // Add packages to state
        };
    },
    mutations: {
        addToBasket(state, item) {
            for (const basketItem of state.basketItems) {
                if (item.index === basketItem.index) {
                    basketItem.count += 1;
                    return;
                }
            }
            state.basketItems.push({
                ...item,
                count: 1
            });
        },
        setPackages(state, packages) {
            state.packages = packages; // Mutation to set packages
        },
        removeFromBasket(state, index) {
            state.basketItems.splice(index, 1);
        },
        SET_SECTION(state, section) {
            state.currentSection = section;
        }
    },
    actions: {
        async loadPackages({ commit }) {
            try {
                const packages = await getPackages();
                commit('setPackages', packages); // Save packages to Vuex state
            } catch (error) {
                console.error('Failed to load packages:', error);
            }
        }
    },
    getters: {
        items: (state) => state.basketItems,
        currentSection: (state) => state.currentSection,
        packages: (state) => state.packages // Getter for accessing packages
    }
});
