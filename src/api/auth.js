import { Router } from 'express';

import models from '../models';

const { User } = models;

const articleRouter = new Router();

articleRouter.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({
    email, password, name,
  });


  res.json({
    createdId: user.id,
  });
});

export default articleRouter;
