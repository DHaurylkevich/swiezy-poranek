import axios from "axios";

const API_URL = VUE_APP_API_URL + "/contacts/66dedc0117c1de03b35e07b4";


export const getContactInfo = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data;
    } catch (error) {
        console.error("Ошибка при загрузке контактов:", error);
    }
}

export const updateContact= async (data) => {
    try {
        await axios.put(API_URL, data); 
        alert("Контактная информация обновлена");
    } catch (error) {
        console.error("Ошибка при обновлении контактов:", error);
    }
}