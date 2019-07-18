import RequestApi from '../http/index.js'

//const requestApi = new RequestApi()
//console.log('RequestApi', new RequestApi())
const initialState = {
    rApi: new RequestApi()
}
const reducer  = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
  
export default reducer 