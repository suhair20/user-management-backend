import express from 'express'
const router =express.Router();
import { protect } from '../middleware/authMiddelware.js';
import { authUser, RegisterUser,LogoutUser,UpdateUserProfile, GetUserProfile,adminGet} from '../controllers/userControllers.js'



 router.post('/',RegisterUser)
 router.post('/auth',authUser)
 router.post('/logout',LogoutUser)
 router.route('/profile').get(protect,GetUserProfile).put(protect,UpdateUserProfile)
 router.get('/admin',adminGet)
 export default router