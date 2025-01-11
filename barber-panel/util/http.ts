import axios from "axios";

export async function fetchOffers() {
    const { data } = await axios.get('https://localhost:7190/offers');
    return data;
};