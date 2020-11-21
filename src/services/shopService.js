import axios from 'axios'

const BASE_URL = 'https://nonchalant-fang.glitch.me'

function getListings(){
    return axios.get(`${BASE_URL}/listing`)
}

function submitOrder(orders){
    return axios.post(`${BASE_URL}/order`, orders)
}

export default {
    getListings,
    submitOrder
}