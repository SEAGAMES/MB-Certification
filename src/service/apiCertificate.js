import axios from "axios"
import { apiUrl } from '../service/getUrl'

const createCertificate = async(data, excel) => {
    const newData = []
    newData.push(data, excel)
    const result = axios.post(`${apiUrl}create_certificate`, newData)
    return result
}

const getDataCertificate = async() => {
    const data = axios.get(`${apiUrl}data_certificate`)
    return data
}

const duplicateCheck = async(pj_code) => {
    const result = axios.get(`${apiUrl}data_duplicate/${pj_code}`)
    return result
}

const deleteCertificate = async(pj_code) => {
    const result = axios.delete(`${apiUrl}delete_certificate/${pj_code}`)
    return result
}
  
export default {
    createCertificate,
    getDataCertificate,
    duplicateCheck,
    deleteCertificate
}