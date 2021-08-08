import React , {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from 'react-s3';
import { Grid } from '@material-ui/core';

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
const UploadImageToS3WithReactS3 = ({oldPhoto, type}) => {
    const dispatch = useDispatch();

    type = type === 'add' ? 'SET_CAR': 'CHANGE_CAR_DETAILS';
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);

    const handleFileInput = async (e) => {
        setSelectedFile(e.target.files[0]);
        setSelectedFileUrl(URL.createObjectURL(e.target.files[0]))
        uploadFile(e.target.files[0], config)
        .then(data => {
            dispatch({
                type: type,
                payload: {
                    property: "photo_url",
                    value: data.location
                }
            })
        })
        .catch(err => console.error(err))
    }

    return (
        <Grid item container spacing={1} justifyContent="center" alignContent="center" direction="column">
            <Grid item container justifyContent="center" alignContent="center"><img className="uploadPreview" src={selectedFileUrl ? selectedFileUrl:oldPhoto}></img><br/></Grid>
            <Grid item container justifyContent="center" alignContent="center"><input type="file" onChange={handleFileInput}/><br/></Grid>
        </Grid>
    )
}

export default UploadImageToS3WithReactS3