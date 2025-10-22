import express from 'express'
import { chatModel } from '../controller/nodeAI'

const router = express.Router();

router.post('/chat', chatModel)

export default router;
