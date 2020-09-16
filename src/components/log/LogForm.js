import React, { useState, useContext, useEffect } from "react"
import { LogContext } from "./LogProvider"
import { CropContext } from "../crops/CropProvider"

export const LogForm = (props) => {
    const { crops, getCrops } = useContext(CropContext)
    const { addLog, logs, updateLog, getLogs } = useContext(LogContext)
    
    const [log, setLog] = useState({}) 

    const editMode = props.match.params.hasOwnProperty("logId")

    const handleControlledInputChange = (eve) => {
        const newLog = Object.assign({}, log)
        newLog[eve.target.name] = eve.target.value
        setLog(newLog)
    } 

    const getLogInEditMode = () => {
        if (editMode) {
            const logId = parseInt(props.match.params.logId)
            const selectedLog = logs.find(l => l.id === logId) || {}
            setLog(selectedLog)
        }
    }

    useEffect(() => {
        getLogs()
        getCrops()
    },[])

    useEffect(() => {
        getLogInEditMode()
    },[logs])

    const constructNewLog = () => {
        const cropId = parseInt(log.cropId)

        if (editMode) {
            updateLog({
                id: log.id,
                userId: parseInt(localStorage.getItem("seedPlan_user")),
                notes: log.notes,
                success: log.success,
                cropId,
                date: log.date,
                type: log.type
            }) 
        }else{
            const newLogObject = {
                userId: parseInt(localStorage.getItem("seedPlan_user")),
                notes: log.notes,
                cropId,
                date: log.date,
                type: log.type
            }
            if(log.type === "harvest"){
                newLogObject.success = true
                addLog(newLogObject)
                document.getElementById("logForm").reset()
            }else{
                newLogObject.success = false
                addLog(newLogObject)
                document.getElementById("logForm").reset()

            }
        }
    }

        return (
            <form className="logForm" id="logForm">
                <h2 className="logForm_title">{editMode ? "Update Log": "Log an Activity"}</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="cropId">Crop: </label>
                        <select name="cropId" className="form-control"
                            proptype="int"
                            defaultValue={log.cropId}
                            onChange={handleControlledInputChange}>

                            <option value="0">Select a crop</option>
                            {crops.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date">Date: </label>
                        <input type="date" id="date" name="date" 
                            proptype="varchar"
                            placeholder="log date"
                            defaultValue={log.date}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label>
                            <input type="radio" name="type" value="planting" checked={log.type === "planting"}
                                onChange={handleControlledInputChange}/>
                        </label>planting
                        <label>
                            <input type="radio" name="type" value="harvest" checked={log.type === "harvest"}
                                onChange={handleControlledInputChange}/>
                        </label>harvest
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="notes">Notes: </label>
                        <textarea type="text" name="notes" required className="form-control"
                            proptype="varchar"
                            defaultValue={log.notes}
                            onChange={handleControlledInputChange}>
                        </textarea>
                    </div>
                </fieldset>
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        constructNewLog()
                    }}
                    className="btn btn-primary">
                    {editMode ? "Save Updates" : "Add to log"}
            </button>
            </form>
        )

}

