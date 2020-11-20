import axios from 'axios'

const BASE_URL = 'https://nonchalant-fang.glitch.me'

function getListings(){
    return axios.get(`${BASE_URL}/listing`)
}

function submitOrder(order){
    return axios.post(`${BASE_URL}/order`, { order })
}

export default {
    getListings,
    submitOrder
}