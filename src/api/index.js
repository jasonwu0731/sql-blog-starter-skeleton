import { Router } from 'express';

import authRouter from './auth';
import articleRouter from './article';

const router = new Router();

router.use('/auth', authRouter);
router.use('/articles', articleRouter);

export default router;
