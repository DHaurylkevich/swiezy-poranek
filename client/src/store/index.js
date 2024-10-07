import { createStore } from "vuex";
import { getPackagesWithMenu } from "@/services/packageServices";

export default createStore({
    state() {
        return {
            basketItems: [],
            currentSection: "",
            packages: [],
            orderData: [],
        };
    },
    mutations: {
        addToBasket(state, item) {
            const existingItem = state.basketItems.find(basketItem => item.index === basketItem.index);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.basketItems.push({
                    ...item,
                    count: 1
                });
            }
        },
        setPackages(state, packages) {
            state.packages = packages;
        },
        setOrderData(state, orderData) {
            state.orderData = orderData;
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
                const packages = await getPackagesWithMenu();
                commit("setPackages", packages);
            } catch (error) {
                console.error("Failed to load packages:", error);
            }
        }
    },
    getters: {
        items: (state) => state.basketItems,
        currentSection: (state) => state.currentSection,
        packages: (state) => state.packages,
        orderData: (state) => state.orderData,
    }
});