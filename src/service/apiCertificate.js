import axios from "axios"
import { apiUrl } from '../service/getUrl'

const createCertificate = async(data) => {
    const result = axios.post(`${apiUrl}create_certificate`, data)
    return result
}

const getDataCertificate = async() => {
    const data = axios.get(`${apiUrl}data_certificate`)
    return data
}

export default {
    createCertificate,
    getDataCertificate
}