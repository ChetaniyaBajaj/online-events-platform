import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductGallery1 from './ProductGallery1';
import ProductGallery2 from './ProductGallery2';
import ErrorPage from './ErrorPage';

const ProductGalleryRouting = () => {

    const [res, setRes] = useState(null);
    const fetchData = async () => {
        let response = await fetch('http://localhost:5000/api/get/exhibition')
        let json = await response.json();
        // console.log(json);
        setRes(json);
    }

    useEffect(() => {
        fetchData();
        // console.log("fetching...")
    }, [])

    const { product } = useParams();
    if (res) {
        if (product === "product1" && res.arr[1]) {
            return <ProductGallery1 data={res.arr[1]} logo={res.arr[0]} />
        }
        else if (product === "product2" && res.arr[2]) {
            return <ProductGallery2 data={res.arr[2]} logo={res.arr[0]} />
        }
        else if (product === "product3" && res.arr[3]) {
            return <ProductGallery1 data={res.arr[3]} logo={res.arr[0]} />
        }
        else if (product === "product4" && res.arr[4]) {
            return <ProductGallery2 data={res.arr[4]} logo={res.arr[0]} />
        }
        else if (product === "product5" && res.arr[5]) {
            return <ProductGallery1 data={res.arr[5]} logo={res.arr[0]} />
        }
        else if (product === "product6" && res.arr[6]) {
            return <ProductGallery2 data={res.arr[6]} logo={res.arr[0]} />
        }
        else if (product === "product7" && res.arr[7]) {
            return <ProductGallery1 data={res.arr[7]} logo={res.arr[0]} />
        }
        else if (product === "product8" && res.arr[8]) {
            return <ProductGallery2 data={res.arr[8]} logo={res.arr[0]} />
        }
        else {
            return <ErrorPage />
        }
    }
}

export default ProductGalleryRouting