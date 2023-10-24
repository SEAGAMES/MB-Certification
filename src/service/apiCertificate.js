import axios from "axios"
import { apiUrl } from '../service/getUrl'

const createCertificate = async(data) => {
    console.log('API : ', data)
    const result = axios.post(`${apiUrl}create_certificate`, data)
    return result
}

export default {
    createCertificate
}