import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js";
import { Return } from "../models/return.model.js";
import { Purchase } from "../models/purchase.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { email, username, password } = req.body;
  //console.log("email: ", email);

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //console.log(req.files)

  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
    return:0,
  });
  //   console.log("HI")
  const createPurchases = await Purchase.create({
    month: [],
    luxery: [],
    high: [],
    regular: [],
    count: -1,
    userId: user._id,
  });

  const createReturnData= await Return.create({
    countreturn:0,
    productsreturn:[],
    userId: user._id,
  })
  //   console.log("Hello")

  const setPurchaseData = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        purchaseData: createPurchases._id,
      },
    },
    { new: true }
  );
  const setReturnData = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        returnsData: createReturnData._id,
      },
    },
    { new: true }
  );

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Admin.findById('66d9f3c28fb484b62b4565c1').users.push({
  //     createdUser: createdUser
  // });
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
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

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
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
    .json(new ApiResponse(200, {}, "User logged Out"));
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

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

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

const addPurchases = asyncHandler(async (req, res, next) => {
  const { month, luxery, high, regular } = req.body;

  

  console.log(month);

  !month || !luxery || !high || !regular
    ? () => {
        throw new ApiError(400, "All fields are required");
      }
    : null;
  // continue with the rest of the code

  const countincrease = await Purchase.findById(req.user.purchaseData);
  const countt = countincrease.count;
  await Purchase.findByIdAndUpdate(
    countincrease,
    {
      $set: {
        count: countt + 1,
      },
    },
    { new: true }
  );
  const userPurchase = await Purchase.findByIdAndUpdate(
    countincrease,
    {
      $push: {
        month: month,
        luxery: luxery,
        high: high,
        regular: regular,
      },
    },
    { new: true }
  );
  res.status(200).json(new ApiResponse(200, userPurchase, "Purchases added"));
});


const returnData = asyncHandler(async (req, res, next) => {
  const { productsreturn } = req.body;

  

  // console.log(month);

  !productsreturn 
    ? () => {
        throw new ApiError(400, "All fields are required");
      }
    : null;
  // continue with the rest of the code

  const returnObject = await Return.findById(req.user.returnsData);
  const countreturntt = returnObject.countreturn;
  await Return.findByIdAndUpdate(
    returnObject,
    {
      $set: {
        countreturn : countreturntt+1,
      },
    },
    { new: true }
  );
  const userpush = await Return.findByIdAndUpdate(
    returnObject,
    {
      $push: {
        productsreturn : productsreturn,
      },
    },
    { new: true }
  );
  res.status(200).json(new ApiResponse(200, userpush, "Returned Successfully"));
});


export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  addPurchases,
  returnData
};
