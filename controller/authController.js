import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (isUser) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    const hash_password = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    const access_token = jsonwebtoken.sign({
      email: email
    }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24
    })

    const createdata = await prisma.user.create({
      data: {
        email,
        password: hash_password,
        access_token
      }
    })

    console.log(createdata)

    return res
      .status(200)
      .json({ msg: 'User registered successfully' });

  } catch (error) {
    return res.status(401).json(error.message)
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const isUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!isUser) return res.status(404).json({
      msg: 'User not found',
    })

    const isMatch = await bcrypt.compare(password, isUser.password);

    if (!isMatch) return res.status(401).json({
      msg: 'Invalid password',
    })

    const token = jsonwebtoken.sign({
      email: isUser.email
    }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24
    })

    await prisma.user.update({
      where: {
        email
      },
      data: {
        access_token: token
      }
    })

    res.cookie('token', token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: false, // if true -> only browser
      withCredentials: true,
      // secure: true, // only works on https
      // sameSite: "None", // only works on production
    })

    return res
      .status(200)
      .json({
        msg: 'User logged in successfully',
        data: isUser
      })
  } catch (error) {
    return res
      .status(500).json({
        msg: error.message
      })
  }
}

export const logout = async (req, res) => {

  try {

    const access_token = req.cookies.token;

    console.log(access_token)

    await prisma.user.updateMany({
      where: {
        access_token
      },
      data: {
        access_token: "USER LOGOUT"
      }
    })

    res.clearCookie("token");
    res.send({ success: true });
  } catch (error) {
    return res
      .status(500).json({
        msg: error.message
      })
  }


}