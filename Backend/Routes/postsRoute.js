import express from 'express'
import { AddPost, deletePost, getPost, getPosts, updatePost } from '../Controllers/postController.js';

const router = express.Router();
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', AddPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

export default router;