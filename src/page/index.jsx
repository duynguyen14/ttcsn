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
import BuildDetail from "./BuildDetail"
import Laptop from "./LapTop"
import Mouse from "./Mouse"
import Keyboard from "./Keyboard"
import Dell from "./LapTop/dell"
import Lenovo from "./LapTop/Lenovo"
import Micro from "./LapTop/Microsuface"
import KhongDay from "./Mouse/KhongDay"
import Gamming from "./Mouse/Gamming"
import Logitech from "./Mouse/Logitech"
import Rapoo from "./Keyboard/Rapo"
import Microsoftk from "./Keyboard/Microsoftk"
import Logitechk from "./Keyboard/Logitechk"
const PublicPage=[
    {path:"/", component: Home, layout: Defaultlayout},
    {path:"/product/:id", component: Products, layout: Defaultlayout},
    {path:"/cartshopping", component: Cartshopping, layout: Defaultlayout},
    {path:"/about", component: About, layout: Defaultlayout},
    {path:"/profile", component: Profile, layout: Defaultlayout},
    {path:"/saleproduct", component: SaleProducts, layout: Defaultlayout},
    {path:"/order", component: Order, layout: Defaultlayout},
    {path:"/buildDetail/:id", component: BuildDetail, layout: Defaultlayout},
    {path:"/login", component: Login, layout: null},
    {path:"/regester", component: Regester, layout: null},
    {path:"/laptop", component: Laptop, layout: Defaultlayout},
    {path:"/mouse", component: Mouse, layout: Defaultlayout},
    {path:"/keyboard", component: Keyboard, layout: Defaultlayout},
    {path:"/laptop/dell", component: Dell, layout: Defaultlayout},
    {path:"/laptop/lenovo", component: Lenovo, layout: Defaultlayout},
    {path:"/laptop/micro", component: Micro, layout: Defaultlayout},
    {path:"/mouse/gamming", component: Gamming, layout: Defaultlayout},
    {path:"/mouse/khongday", component: KhongDay, layout: Defaultlayout},
    {path:"/mouse/logitech", component: Logitech, layout: Defaultlayout},
    {path:"/keyboard/logitech", component: Logitechk, layout: Defaultlayout},
    {path:"/keyboard/microsoft", component: Microsoftk, layout: Defaultlayout},
    {path:"/keyboard/rapoo", component: Rapoo, layout: Defaultlayout},

]
const PrivatePage=[

]
export {PrivatePage, PublicPage}