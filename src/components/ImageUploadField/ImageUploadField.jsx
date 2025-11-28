import './ImageUploadField.css'

export default function ImageUploadField({labelText}) {

    return (
        <>
            <label htmlFor="profileimage">Upload Travel Post Image</label>
            < input type="file" name="travelPostImage" id="travelPostImage" />
        </>
    )
}