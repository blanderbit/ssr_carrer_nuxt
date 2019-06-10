import axios from './axios.config.js'

export default  {
    send_mail(data, vue){
        return axios.post('/api/sendmail', data)
    }
}
