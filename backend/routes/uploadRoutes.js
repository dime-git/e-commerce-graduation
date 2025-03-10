import express from 'express';
import {
  uploadMiddleware,
  uploadFile,
} from '../controller/uploadController.js';
import { isAuth } from '../utils.js';
import { isAdmin } from '../utils/isAdmin.js';
import dotenv from 'dotenv';

dotenv.config();

const uploadRouter = express.Router();

// Use the local file storage version for now
uploadRouter.post('/', isAuth, uploadMiddleware, uploadFile);

export default uploadRouter;
