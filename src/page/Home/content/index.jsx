import { useState } from 'react';
import Product_1 from '../../../assets/images/Product_1.png';
import Laptop from './Laptop';
import Ultrabook from './Ultrabook';
import PhuKien from './PhuKien';
function Content() {
    return(
        <div>
            <Laptop/>
            <Ultrabook/>
            <PhuKien/>
        </div>

    )
}

export default Content;