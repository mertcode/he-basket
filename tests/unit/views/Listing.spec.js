import { mount, createLocalVue } from '@vue/test-utils'
import Listing from '@/views/Listing.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

const $router = {
    push: jest.fn()
}

describe('Listing.vue', () => {
    
    let actions
    let store
    let getters
    let wrapper

    beforeEach(() => {

        getters =  {
            listings: () => [{}]
        }
        actions = {
            getListings: jest.fn(),
            addToBasket: jest.fn()
        }
        store = new Vuex.Store({
            actions,
            getters
        })
        wrapper = mount(Listing, {
            localVue,
            store,
            mocks: {
                $router
            }
        })
    })

    it('should dispatch action when created', () => {
        expect(actions.getListings).toHaveBeenCalled()
    })

    it('should dispatch action when button clicked', () =>{
        wrapper.find('.btn-orange').trigger('click')
        expect(actions.addToBasket).toHaveBeenCalled()
    })
})