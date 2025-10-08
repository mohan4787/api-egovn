const cloudinary = require('cloudinary').v2;
const {AppConfig} = require("../config/config");
const { deleteFile } = require('../utilities/helper');

class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: AppConfig.cloudinaryCloudName,
            api_key: AppConfig.cloudinaryApiKey,
            api_secret: AppConfig.cloudinaryApiSecret
        })
    }

    fileUpload = async(filePath, dir='/') => {
        try {
            const {public_id,url ,secure_url} = await cloudinary.uploader.upload(filePath, {
                unique_filename: true,
                folder: "/api-egovn"+dir,
                resource_type: "auto"
            })
            deleteFile(filePath)

            const optimized = cloudinary.url(public_id,{
                transformation:[
                    {width:500,crop: "scale"},
                    {quality: "auto", fetch_format: "auto"},
                ],
            })
            return {
                public_id,
                secure_url,
                optimized_url: optimized
            }
        } catch (exception) {
            console.log(exception);
            throw {
                code: 500,
                message: "File upload failed, please try again later",
                status: "FILE_UPLOAD_FAILED"
            }   
        }
    }
}

const cloudinarySvc = new CloudinaryService()
module.exports = cloudinarySvc