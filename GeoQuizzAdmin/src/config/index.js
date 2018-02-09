import axios from 'axios'

const api=axios.create({
	baseURL:"http://0.0.0.0:9990/geoquizzapi/api/",
})

export default api
