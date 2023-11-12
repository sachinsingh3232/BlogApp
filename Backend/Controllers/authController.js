import { db } from "../database.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const Register = (req, res) => {
    let q = "SELECT * from blog_app.users WHERE email=? OR username=?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("user already exist")

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        q = "INSERT INTO blog_app.users(`username`,`email`,`password`,`img`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.img
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Registered Successfully");
        })
    });
}
export const Login = (req, res) => {
    let q = "SELECT * from blog_app.users WHERE username=?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (!data.length) return res.status(404).json("user doesn't exist")

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password")

        const token = jwt.sign({ id: data[0].id }, process.env.SECRET_KEY, { expiresIn: "30d" });
        const { password, ...other } = data[0];
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other)
    });
}
export const LogOut = (req, res) => {
    res.clearCookie("access_token").status(200).json("logged Out!")
}
