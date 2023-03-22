import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ErrorPage from './ErrorPage';
import ZoomMeet from './ZoomMeet';

const ZoomMeetsRouting = () => {
    const [res, setRes] = useState(null);
    const fetchData = async () => {
        let response = await fetch('http://localhost:5000/api/get/conferencemeets')
        let json = await response.json();
        console.log(json);
        setRes(json);
    }

    useEffect(() => {
        fetchData();
        // console.log("fetching...")
    }, [])

    const { room } = useParams();
    if (res) {
        if (room === "room1") {
            return <ZoomMeet data={res.arr[9]} />
        }
        else if (room === "room2") {
            return <ZoomMeet data={res.arr[10]} />
        }
        else {
            return <ErrorPage />
        }
    }
}

export default ZoomMeetsRouting