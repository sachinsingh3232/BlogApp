import { db } from "../database.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM railway.posts WHERE cat=?" : "SELECT * FROM railway.posts";
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    })
}
export const getPost = (req, res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM railway.users u JOIN railway.posts p ON u.id=p.userId WHERE p.id=?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    })
}
export const AddPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not Authenticated!");
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not Valid")


        const values = [
            req.body.title,
            req.body.desc,
            req.body.date,
            req.body.img,
            req.body.cat,
            userInfo.id
        ]
        const q = "INSERT INTO railway.posts(`title`, `desc`,`date`, `img`, `cat`, `userId`) VALUES (?)"

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Post has been created")
        })
    })
}
export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not Authenticated!");
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not Valid")

        const q = "DELETE FROM railway.posts WHERE id=? AND userId=?"

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your posts")
            return res.status(200).json("Post has been deleted")
        })
    })
}
export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not Authenticated!");
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not Valid")

        const q = "UPDATE railway.posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `userId`=?"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]

        db.query(q, [...values, req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can update only your posts")
            return res.status(200).json("Post has been updated")
        })
    })
}
