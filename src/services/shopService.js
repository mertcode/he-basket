import axios from 'axios'

function getListings(){
    return axios.get('https://nonchalant-fang.glitch.me/listing')
}

function submitOrder(order){
    return axios.post('https://nonchalant-fang.glitch.me/order', { order })
}

export default {
    getListings,
    submitOrder
}