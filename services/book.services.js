import { fetchWrapper } from '../helpers'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const baseUrl = `${publicRuntimeConfig.apiUrl}/book`

export const bookService = {
  getBook,
  newDate
}

function getBook(day,month,year){
  
  return fetchWrapper.post(`${baseUrl}/bookInfo`, {day, month, year})
}

function newDate(startTime, day, month, year, email){
  //console.log(date)
  return fetchWrapper.post(`${baseUrl}/dateControl`, {startTime, day, month, year, email})
}
