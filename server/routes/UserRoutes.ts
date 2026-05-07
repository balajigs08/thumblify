import express from 'express';
import { getThumbnailById, getUsersThumbnails } from '../controllers/UserController.js';
import protect from '../middlewares/auth.js';

const UserRouter = express.Router();

// 🔐 Get all thumbnails of logged-in user
UserRouter.get('/thumbnails', protect, getUsersThumbnails);

// 🔐 Get single thumbnail by ID
UserRouter.get('/thumbnail/:id', protect, getThumbnailById);

export default UserRouter;