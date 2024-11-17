import axios from "axios";
const request=axios.create({
    baseURL: 'http://localhost:8888/',
}
)
const request1=axios.create({
    baseURL: 'http://127.0.0.1:8888/api/',
})
export {request,request1} ;