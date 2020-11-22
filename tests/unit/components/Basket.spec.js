import { mount, createLocalVue } from '@vue/test-utils'
import Basket from '@/components/Basket.vue'
import Vuex from 'vuex'
import actions from '@/store/actions'

const localVue = createLocalVue()

localVue.use(Vuex)

let url = ''
let body = {}
let mockError = false

jest.mock("axios", () => ({
    post: (_url, _body) => { 
      return new Promise((resolve) => {
        if (mockError) 
          throw Error("Mock error")
  
        url = _url
        body = _body
        resolve(true)
      })
    }
}))

describe('Basket.vue', () => {
    

    beforeEach(() => {

        mount(Basket, {
            localVue,
            propsData: {
                orders: [
                    {
                        id: 1,
                        name: 'Deodorant',
                        currency: 'TRY',
                        price: 26,
                        amount: 1
                    }
                ]
            },
        })
    })


    it('should submit cart when clicked', async () => {


        const commit = jest.fn()
        const orders = [{ id: 1, amount: 1}]

        await actions.submitOrder({commit}, orders)

        expect(url).toBe('https://nonchalant-fang.glitch.me/order')
        expect(body).toEqual(orders)

        
    }) 
})