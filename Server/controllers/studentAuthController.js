
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import Student from "../models/student.js";
import asyncHandler from "../utils/asyncHandler.js";

const googleClient = new OAuth2Client();


// ======================================
// 1. CREATE JWT TOKEN
// ======================================

const generateToken = (studentId) => {
  return jwt.sign(
    {
      sub: studentId.toString(),
      role: "student"
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    }
  );
};


// ======================================
// 2. SEND STUDENT RESPONSE
// ======================================

const sendAuthResponse = (res, student, message, status = 200) => {

  const token = generateToken(student._id);

  res.status(status).json({
    success: true,
    message,

    token,

    student: {
      id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      profileImage: student.profileImage
    }
  });
};


// ======================================
// 3. STUDENT REGISTRATION
// ======================================

export const registerStudent = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required"
    });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (cleanName.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid name"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid email address"
    });
  }

  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters and at most 72 bytes"
    });
  }

  // Check existing student

  const existingStudent = await Student.findOne({
    email: cleanEmail
  });

  if (existingStudent) {
    return res.status(409).json({
      success: false,
      message: "Student already exists. Please login."
    });
  }

  // Hash password

  const passwordHash = await bcrypt.hash(password, 12);

  // Create student

  const student = await Student.create({
    name: cleanName,
    email: cleanEmail,
    passwordHash
  });

  sendAuthResponse(
    res,
    student,
    "Student registered successfully",
    201
  );

});


// ======================================
// 4. STUDENT EMAIL PASSWORD LOGIN
// ======================================

export const loginStudent = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  const cleanEmail = email.trim().toLowerCase();

  // Find student

  const student = await Student.findOne({
    email: cleanEmail
  }).select("+passwordHash");

  if (!student || !student.passwordHash) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  // Compare password

  const isPasswordCorrect = await bcrypt.compare(
    password,
    student.passwordHash
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  // Generate JWT

  sendAuthResponse(
    res,
    student,
    "Student login successful"
  );

});


// ======================================
// 5. GOOGLE LOGIN
// ======================================

export const googleLogin = asyncHandler(async (req, res) => {

  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({
      success: false,
      message: "Google ID token is required"
    });
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(503).json({
      success: false,
      message: "Google login is not configured"
    });
  }

  let ticket;

  try {

    ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid Google authentication token"
    });

  }

  const payload = ticket.getPayload();

  if (!payload || !payload.sub) {
    return res.status(401).json({
      success: false,
      message: "Invalid Google account"
    });
  }

  // Check if Google account already exists

  let student = await Student.findOne({
    googleId: payload.sub
  });

  if (student) {
    return sendAuthResponse(
      res,
      student,
      "Google login successful"
    );
  }

  if (!payload.email || !payload.email_verified) {
    return res.status(400).json({
      success: false,
      message: "A verified Google email is required"
    });
  }

  const cleanEmail = payload.email.trim().toLowerCase();

  // Prevent automatic linking with an existing account

  const existingStudent = await Student.findOne({
    email: cleanEmail
  });

  if (existingStudent) {
    return res.status(409).json({
      success: false,
      message: "This email already has an account. Login using your existing method."
    });
  }

  // Create new student through Google

  student = await Student.create({
    name: payload.name || cleanEmail.split("@")[0],
    email: cleanEmail,
    googleId: payload.sub,
    profileImage: payload.picture || ""
  });

  sendAuthResponse(
    res,
    student,
    "Google account login successful"
  );

});


// ======================================
// 6. FACEBOOK LOGIN
// ======================================

export const facebookLogin = asyncHandler(async (req, res) => {

  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({
      success: false,
      message: "Facebook access token is required"
    });
  }

  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const graphVersion = process.env.META_GRAPH_VERSION || "v27.0";

  if (!appId || !appSecret) {
    return res.status(503).json({
      success: false,
      message: "Facebook login is not configured"
    });
  }

  // Step 1: Verify Facebook access token

  const debugUrl = new URL(
    `https://graph.facebook.com/${graphVersion}/debug_token`
  );

  debugUrl.searchParams.set("input_token", accessToken);

  debugUrl.searchParams.set(
    "access_token",
    `${appId}|${appSecret}`
  );

  const debugResponse = await fetch(debugUrl);

  const debugResult = await debugResponse.json();

  const tokenInfo = debugResult.data;

  if (
    !debugResponse.ok ||
    !tokenInfo?.is_valid ||
    tokenInfo.app_id !== appId ||
    !tokenInfo.user_id
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid Facebook access token"
    });
  }

  // Step 2: Check existing Facebook account

  let student = await Student.findOne({
    facebookId: tokenInfo.user_id
  });

  if (student) {
    return sendAuthResponse(
      res,
      student,
      "Facebook login successful"
    );
  }

  // Step 3: Get Facebook profile details

  const profileUrl = new URL(
    `https://graph.facebook.com/${graphVersion}/me`
  );

  profileUrl.searchParams.set(
    "fields",
    "id,name,email"
  );

  profileUrl.searchParams.set(
    "access_token",
    accessToken
  );

  const profileResponse = await fetch(profileUrl);

  const profile = await profileResponse.json();

  if (
    !profileResponse.ok ||
    !profile.id ||
    String(profile.id) !== String(tokenInfo.user_id)
  ) {
    return res.status(401).json({
      success: false,
      message: "Unable to verify Facebook profile"
    });
  }

  if (!profile.email) {
    return res.status(400).json({
      success: false,
      message: "Facebook email permission is required"
    });
  }

  const cleanEmail = profile.email.trim().toLowerCase();

  // Prevent automatic account linking

  const existingStudent = await Student.findOne({
    email: cleanEmail
  });

  if (existingStudent) {
    return res.status(409).json({
      success: false,
      message: "This email already has an account. Login using your existing method."
    });
  }

  // Step 4: Create student account

  student = await Student.create({
    name: profile.name || cleanEmail.split("@")[0],
    email: cleanEmail,
    facebookId: tokenInfo.user_id,
    profileImage: ""
  });

  sendAuthResponse(
    res,
    student,
    "Facebook login successful"
  );

});
