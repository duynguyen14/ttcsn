import { Defaultlayout } from "../Component/Layouts"
import About from "./About"
import Cartshopping from "./Cartshopping"
import Home from "./Home"
import Login from "./Login"
import Products from "./Product"
import Regester from "./Regester"
import Profile from "./Profile"
import SaleProducts from "./SaleProducts"
import Order from "./Oder"
const PublicPage=[
    {path:"/", component: Home, layout: Defaultlayout},
    {path:"/product/:id", component: Products, layout: Defaultlayout},
    {path:"/cartshopping", component: Cartshopping, layout: Defaultlayout},
    {path:"/about", component: About, layout: Defaultlayout},
    {path:"/profile", component: Profile, layout: Defaultlayout},
    {path:"/saleproduct", component: SaleProducts, layout: Defaultlayout},
    {path:"/order", component: Order, layout: Defaultlayout},
    {path:"/login", component: Login, layout: null},
    {path:"/regester", component: Regester, layout: null},
    
]
const PrivatePage=[

]
export {PrivatePage, PublicPage}