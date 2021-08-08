import React , {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from 'react-s3';


const S3_BUCKET ='serviceme';
const REGION ='us-east-2';
const ACCESS_KEY =process.env.AWS_ACCESS_KEY;
const SECRET_ACCESS_KEY =process.env.AWS_SECRET_KEY;

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}
const UploadImageToS3WithReactS3 = ({oldPhoto}) => {
    const dispatch = useDispatch();


    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        setSelectedFileUrl(URL.createObjectURL(e.target.files[0]))
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => {
                console.log(data);
                dispatch({
                    type: 'CHANGE_CAR_DETAILS',
                    payload: {
                        property: "photo_url",
                        value: data.location
                    }
                })
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <img className="uploadPreview" src={selectedFileUrl ? selectedFileUrl:oldPhoto}></img><br/>
            <input type="file" onChange={handleFileInput}/><br/>
            <button onClick={() => handleUpload(selectedFile)}> Upload</button>
        </div>
    )
}

export default UploadImageToS3WithReactS3