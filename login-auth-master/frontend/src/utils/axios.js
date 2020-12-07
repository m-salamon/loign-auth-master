import axios from 'axios'

const instanceAxios = axios.create({
   headers: { 'x-access-token': localStorage.getItem('userId') }
})

export default instanceAxios