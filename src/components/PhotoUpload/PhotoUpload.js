import React , {useState} from 'react';
import { useDispatch } from 'react-redux';
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
const UploadImageToS3WithReactS3 = () => {
    const dispatch = useDispatch();


    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        setSelectedFileUrl(URL.createObjectURL(e.target.files[0]))
        console.log(selectedFile);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => {
                console.log(data);
                dispatch({
                    type: 'SET_CAR',
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
            <input type="file" onChange={handleFileInput}/><br/>
            <img className="uploadPreview" src={selectedFileUrl}></img><br/>
            <button onClick={() => handleUpload(selectedFile)}> Upload</button>
        </div>
    )
}

export default UploadImageToS3WithReactS3