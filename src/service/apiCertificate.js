import axios from "axios"
import { apiUrl } from '../service/getUrl'

const getDataQrCode = async(pj_code, no) => {
    const data = axios.get(`${apiUrl}data_formqrcode/${pj_code}/${no}`)
    return data
}

const createCertificate = async(data, excel) => {
    const newData = []
    newData.push(data, excel)
    const result = axios.post(`${apiUrl}create_certificate`, newData)
    return result
}

const updateCertificate = async(data, listName) => {
    const newData = []
    newData.push(data, listName)
    const result = axios.post(`${apiUrl}update_certificate`, newData)
    return result
}

const getDataCertificate_master = async() => {
    const data = axios.get(`${apiUrl}data_certificate`)
    return data
}

const getDataCertificate_detail = async(datalist) => {
    const data = axios.post(`${apiUrl}data_detail`, datalist)
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

const editName = async(data) => {
    const result = axios.post(`${apiUrl}updateName`, data)
    return result
}

const deleteCertificate = async(pj_code) => {
    const result = axios.delete(`${apiUrl}delete_certificate/${pj_code}`)
    return result
}
  
export default {
    getDataQrCode,
    createCertificate,
    updateCertificate,
    getDataCertificate_master,
    getDataFilter,
    duplicateCheck,
    editName,
    deleteCertificate,
    getDataCertificate_detail
}