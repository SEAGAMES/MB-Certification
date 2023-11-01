import axios from "axios"
import { apiUrl } from '../service/getUrl'

const createCertificate = async(data, excel) => {
    const newData = []
    newData.push(data, excel)
    const result = axios.post(`${apiUrl}create_certificate`, newData)
    return result
}

const getDataCertificate_master = async() => {
    const data = axios.get(`${apiUrl}data_certificate`)
    return data
}

const getDataCertificate_detail = async() => {
    const data = axios.get(`${apiUrl}data_detail`)
    return data
}

const getDataFilter = async(pj_code) => {
    const data = axios.get(`${apiUrl}data_filter/${pj_code}`)
    return data
}

const duplicateCheck = async(pj_code) => {
    const data = axios.get(`${apiUrl}data_duplicate/${pj_code}`)
    return data
}

const deleteCertificate = async(pj_code) => {
    const result = axios.delete(`${apiUrl}delete_certificate/${pj_code}`)
    return result
}
  
export default {
    createCertificate,
    getDataCertificate_master,
    getDataFilter,
    duplicateCheck,
    deleteCertificate,
    getDataCertificate_detail
}