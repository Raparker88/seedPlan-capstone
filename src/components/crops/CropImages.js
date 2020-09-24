import React, {useState, useRef, useContext} from 'react';
import {CropImageContext} from "./ImageProvider"
// import "/Crop.css"

export const ImageUpload = () => {
    const [image, setImage] = useState('')
    const[loading, setLoading] = useState(false)

    const{addImage} = useContext(CropImageContext)

    const label= useRef(null)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'plantPics')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/beccaparker/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
    }

    const constructNewImage = () => {
        const newImage = {
            cropId: parseInt(props.match.params.cropId),
            imageURL: image,
            label: label.current.value
        }
    }

    return (
        <>
        <form className="imageForm">
            <h2>Choose an Image</h2>
            <input type="file" name="file" 
            placeholder="Upload and image"
            onChange={uploadImage}></input>
            {loading ? (
                <h3>Loading...</h3>
            ):(
                <img src={image} style={{width: '300px'}}/>
            )
            }
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageLabel">Image description: </label>
                    <input type="text" id="imageLabel" ref={label} required autoFocus className="form-control" placeholder="add a description" />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() 
                    constructNewImage()
                }}
                className="btn btn-primary">
                Save Employee
            </button>
        </form>
        </>
    )
}