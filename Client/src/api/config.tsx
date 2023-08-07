import axios from "axios"
import { animateScroll as scroll } from "react-scroll";
export const instance = axios.create({
    baseURL:"http://localhost:8080/api/"
})
export const scrollToTop =()=>{
    scroll.scrollToTop();
}