import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Return } from "../models/return.model.js";
import { Purchase } from "../models/purchase.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async (adminId) => {
  try {
    console.log("-1");

    const admin = await Admin.findById(adminId);
    console.log(admin);

    const accessToken = admin.generateAccessToken();
    console.log("1");

    const refreshToken = admin.generateRefreshToken();
    console.log("2");

    admin.refreshToken = refreshToken;
    console.log("3");
    await admin.save({ validateBeforeSave: false });
    console.log("4");
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerAdmin = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;
  //console.log("email: ", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedAdmin = await Admin.findOne({
    $or: [{ username }, { email }],
  });

  if (existedAdmin) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //console.log(req.files)

  const admin = await Admin.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while registering the admin");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdAdmin, "Admin registered Successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, password } = req.body;
  console.log(email);

  if (!email) {
    throw new ApiError(400, "username or email is required");
  }

  const admin = await Admin.findOne({
    email,
  });

  if (!admin) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    admin._id
  );

  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  // const admin= Admin.find({});
  console.log(accessToken);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          admin: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const admin = await Admin.findById(decodedToken?._id);

    if (!admin) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== admin?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(admin._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const allUsersList = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getPurchaseData = asyncHandler(async (req, res) => {
  const { userId } = req.body; //gets users Object id
  const count = -500;
  console.log(userId);
  // const user = await User.findById(incomingUser);
  console.log("Received");
  const incomingPurchaseData = await Purchase.findOne({
    $or: [{ userId }, { count }],
  });
  console.log(incomingPurchaseData);

  return res.json(
    new ApiResponse(200, incomingPurchaseData, "Purchases sended successfully")
  );
});

const returnData = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const countreturn = 10000;
  const incomingReturnData = await Return.findOne({
    $or: [{ userId }, { countreturn }],
  });

  return res.json(
    new ApiResponse(200, incomingReturnData, "Returned successfully")
  );
});

export {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  allUsersList,
  getPurchaseData,
  returnData,
};
