import axios from './axios.config.js'

export default  {
    sent_data_payment(data, payment){
        return axios.post(`/${payment}`, data)
    }
}
