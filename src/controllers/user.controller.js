import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/nodeMailer.js";
// import SendmailTransport from "nodemailer/lib/sendmail-transport/index.js";

/*
  Generate access Tokens
*/
const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

/*
  Register User
*/
const registerUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    username,
    linkedinLink,
    githubLink,
    portfolioLink,
    skillsLearned,
    skillsNeedToLearn,
    education,
    bio,
    projects,
  } = req.body;
  if (
    !fullName ||
    !email ||
    !username ||
    skillsLearned.length === 0 ||
    skillsNeedToLearn.length === 0
  ) {
    throw new ApiError(400, "Please upload all the details");
  }
  if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
    throw new ApiError(400, "Please write valid email");
  }
  if (username.length < 3) {
    throw new ApiError(400, "Username should be atleast 3 characters long");
  }
  if (githubLink === "" && linkedinLink === "" && portfolioLink === "") {
    throw new ApiError(400, "Please upload atleast one link");
  }
  const githubRegex =
    /^(?:http(?:s)?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+(?:\/)?$/;
  const linkedinRegex =
    /^(?:http(?:s)?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+(?:\/)?$/;
  if (
    (linkedinLink && !linkedinLink.match(linkedinRegex)) ||
    (githubLink && !githubLink.match(githubRegex))
  ) {
    throw new ApiError(400, "Please provide valid github and linkedin links");
  }
  if (education.length === 0) {
    throw new ApiError(400, "Education is required");
  }
  education.forEach((edu) => {
    if (!edu.institution || !edu.degree) {
      throw new ApiError(400, "Please provide all the details");
    }
    if (
      !edu.startDate ||
      !edu.endDate ||
      !edu.score ||
      edu.score < 0 ||
      edu.score > 100 ||
      edu.startDate > edu.endDate
    ) {
      throw new ApiError(400, "Please provide valid score and dates");
    }
  });
  if (!bio) {
    throw new ApiError(400, "Bio is required");
  }
  if (bio.length > 500) {
    throw new ApiError(400, "Bio should be less than 500 characters");
  }
  if (projects.size > 0) {
    projects.forEach((project) => {
      if (
        !project.title ||
        !project.description ||
        !project.projectLink ||
        !project.startDate ||
        !project.endDate
      ) {
        throw new ApiError(400, "Please provide all the details");
      }
      if (project.projectLink.match(/^(http|https):\/\/[^ "]+$/)) {
        throw new ApiError(400, "Please provide valid project link");
      }
      if (project.startDate > project.endDate) {
        throw new ApiError(400, "Please provide valid dates");
      }
    });
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Handle profile image upload
  let imageUrl = "";
  if (req.file?.path) {
    const image = await uploadOnCloudinary(req.file.path);
    imageUrl = image?.url || "";
  }

  const user = await User.create({
    fullName: fullName,
    email: email,
    username: username ? username.toLowerCase() : undefined,
    linkedinLink: linkedinLink,
    githubLink: githubLink,
    portfolioLink: portfolioLink,
    skillsLearned: skillsLearned,
    skillsNeedToLearn: skillsNeedToLearn,
    education: education,
    bio: bio,
    projects: projects,
    picture: req.user.picture,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }
  const jwtToken = generateJWTToken_username(user);
  const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000);
  res.cookie("accessToken", jwtToken, {
    httpOnly: true,
    expires: expiryDate,
    secure: false,
  });
  res.clearCookie("accessTokenRegistration");
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

/*
  Update Registered User
*/
const updateRegisterUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    username,
    email,
    linkedinLink,
    githubLink,
    portfolioLink,
    skillsLearned,
    skillsNeedToLearn,
    picture,
  } = req.body;
  if (
    !fullName ||
    !username ||
    skillsLearned.length === 0 ||
    skillsNeedToLearn.length === 0
  ) {
    throw new ApiError(400, "Please provide all the details");
  }
  if (username.length < 3) {
    throw new ApiError(400, "Username should be atleast 3 characters long");
  }

  if (githubLink === "" && linkedinLink === "" && portfolioLink === "") {
    throw new ApiError(400, "Please provide atleast one link");
  }
  const newGithub =
    /^(?:http(?:s)?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+(?:\/)?$/;
  const newLinkedin =
    /^(?:http(?:s)?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+(?:\/)?$/;
  if (
    (linkedinLink && !linkedinLink.match(newLinkedin)) ||
    (githubLink && !githubLink.match(newGithub))
  ) {
    throw new ApiError(400, "Please provide valid github and linkedin links");
  }
  const user = await User.findOneAndUpdate(
    { username: req.user.username },
    {
      fullName: fullName,
      username: username,
      linkedinLink: linkedinLink,
      githubLink: githubLink,
      portfolioLink: portfolioLink,
      skillsLearned: skillsLearned,
      skillsNeedToLearn: skillsNeedToLearn,
      picture: picture,
    }
  );
  if (!user) {
    throw new ApiError(500, "Error in saving user details");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User saved successfully"));
});

/*
  update Education
*/

const updateEducation = asyncHandler(async (req, res) => {
  const { education } = req.body;
  if (education.length == 0) {
    throw new ApiError(400, "Update valid Education");
  }

  education.forEach((edu) => {
    if (
      !edu.institution ||
      !edu.degree ||
      !edu.startDate ||
      !edu.endDate ||
      edu.CGPA < 0 ||
      edu.CGPA > 10 ||
      edu.startYear > edu.endYear
    ) {
      throw new ApiError(400, "Valid Details required");
    }
  });
  const user = await User.findOneAndUpdate(
    { username: req.user.username },
    { education: education }
  );
  if (!user) {
    throw new ApiError(401, "Update Valid details of User");
  }
  return res
    .status(200)
    .json(new ApiResponse(300, user, "updated Education details"));
});

/*
  Update Project and Bio details
*/

const updateProjectAndBio = asyncHandler(async (req, res) => {
  const { projects, bio } = req.body;
  if (!bio) {
    throw new ApiError(400, "Bio is required");
  }
  if (bio.length > 400) {
    throw new ApiError(401, "Bio should be less than 400 characters");
  }
  if (projects.size > 0) {
    projects.forEach((project) => {
      if (
        !project.title ||
        !project.description ||
        !project.projectLink ||
        !project.startDate ||
        !project.endDate
      ) {
        throw new ApiError(400, "Details are required");
      }
      if (project.startDate > project.endDate) {
        throw new ApiError(400, "Enter valid Date");
      }
      try {
        new URL(project.projectLink);
      } catch {
        throw new ApiError(400, "Please provide valid project link");
      }
    });
  }
  const user = await User.findOneAndUpdate(
    { username: req.user.username },
    { bio: bio, projects: projects }
  );
  if (!user) {
    throw new ApiError(500, "Bio and Project not updated");
  }
  return res
    .status(200)
    .json(200, user, "Bio and project Updated successfully");
});

/* 
  Upload Image
*/
const uploadImage = asyncHandler(async (req, res) => {
  const localPath = req.file?.picture[0]?.path;
  if (!localPath) {
    throw new ApiError(400, "Image upload failed");
  }
  const image = await uploadOnCloudinary(localPath);
  if (!image) {
    throw new ApiError(400, "Image upload failed");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, { url: image.url }, "Image uploaded successfully")
    );
});

/*
  Login User
*/
const loginUser = asyncHandler(async (req, res) => {
  const {
    email,
    username,
    password,
  } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }
  let user;
  if (username) {
    user = await User.findOne({ username });
  } else {
    user = await User.findOne({ email });
  }
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };
  try {
    await sendMail(
      user.email,
      "Login Notification 🔑",
      `Hi ${user.fullName}, you just logged in at ${new Date().toLocaleString()}. If this wasn't you, please reset your password immediately.`
    );
  } catch (err) {
    console.error("❌ Mail error (ignored):", err.message);
  }
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});


/*
  Logout User 
*/
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: 1 },
  });

  const options = {
    httpOnly: true,
    // secure: true,
    // sameSite: "strict",
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

/*
  Refresh Token
*/
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
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

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token expired or already used");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessandRefreshToken(user._id);

    const options = {
      httpOnly: true,
      // secure: true,
    };

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

/*
 Change Password
*/
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

/*
  Get Current User
*/
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

/* 
  Update User Image
*/
const updateUserImage = asyncHandler(async (req, res) => {
  const localPath = req.file?.path;
  if (!localPath) {
    throw new ApiError(400, "Image file is missing");
  }

  const image = await uploadOnCloudinary(localPath);
  if (!image?.url) {
    throw new ApiError(400, "Error while uploading image");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { image: image.url } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Image updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  generateAccessandRefreshToken,
  updateUserImage,
  updateProjectAndBio,
  updateEducation,
  uploadImage,
  updateRegisterUser,
};
