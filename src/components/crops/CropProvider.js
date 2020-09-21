import React, { useState, useEffect } from "react"


export const CropContext = React.createContext()

export const CropProvider = (props) => {
    const [crops, setCrops] = useState([])
    const [searchTerms, setTerms] = useState("")
    const [scheduleSearchTerms, setScheduleTerms] = useState("")
    const [logSearchTerms, setLogSearchTerms] = useState("")

    const getCrops = () => {
        return fetch("http://localhost:8088/crops")
            .then(res => res.json())
            .then(setCrops)
    }

    const addCrop = crop => {
        return fetch("http://localhost:8088/crops", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crop)
        })
            .then(getCrops)
    }
   
    const deleteCrop = cropId => {
        return fetch(`http://localhost:8088/crops/${cropId}`, {
            method: "DELETE"
        })
            .then(getCrops)
    }
    const updateCrop = crop => {
        return fetch(`http://localhost:8088/crops/${crop.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crop)
        })
            .then(getCrops)
    }
    const getCropById = (id) => {
        return fetch(`http://localhost:8088/crops/${ id }`)
            .then(res => res.json())
    }

    return (
        <CropContext.Provider value={{
            crops, addCrop, getCrops, setTerms, searchTerms, deleteCrop, updateCrop, getCropById,
            scheduleSearchTerms, setScheduleTerms, logSearchTerms, setLogSearchTerms
        }}>
            {props.children}
        </CropContext.Provider>
    )
}