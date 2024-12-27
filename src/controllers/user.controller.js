import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/ApiError.js"
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res)=> {
    // get user detail from frontend
    // validation  not empty
    // check if user already exists: email or username
    // check for avatar check for coverimage
    // upload to cloudinary
    // create user object - create user db
    // remove password and refresh token field
    // check for user creation 
    // return response else error

    const { username, email, fullName, password } = req.body;
    console.log("Email", email)


    // if(fullName ===""){
    //     throw new apiError(400,"fullname is required")
    // }

    if (
        [fullName, email, username, password].some((field) => field?.trim()=== "" ) 
        // the optional chaining is use when we want check multiple conditons if anyj of the condition is not defined then if will return false or undefined
    ) 
    {
        throw new apiError(400, "all fields are not required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new apiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new apiError(400, "avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);


    if(avatar){
        throw new apiError(400, "avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        apiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registed Successfully")
    )

} )

export {registerUser}