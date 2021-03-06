import React, { useContext } from "react"
import { CropContext } from "./CropProvider"
import "./Crop.css"

export const CropSearch = (props) => {
    const { setTerms, searchTerms } = useContext(CropContext)

    return (
        <>
        <div className="cropSearch">

            <input type="text"
                className="input--wide"
                defaultValue = {searchTerms}
                onKeyUp={
                    (keyEvent) => setTerms(keyEvent.target.value)
                }
                placeholder="Search Crops... " />
        </div>
        </>
    )
}