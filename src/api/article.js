import { Router } from 'express';

import { Article } from '../models/';

const articleRouter = new Router();

articleRouter.get('/', (req, res) => {
  Article.find().exec((err, articles) => {
    if (err) return res.status(500).send(err);

    return res.json(articles);
  });
});

articleRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return res.status(500).send(err);
    return res.json(article);
  });
});

articleRouter.post('/', (req, res) => {
  const { title, content, tags } = req.body;

  Article.create({
    title,
    content,
    tags
  }, (err, article) => res.json(article));
});

articleRouter.put('/:id', (req, res) => {
  const { title, content, tags } = req.body;
  const query = {
    _id: req.params.id,
  };
  Article.findOneAndUpdate(query, {
    title,
    content,
    tags
  }, { new: true }, (err, article) => res.json(article));
});

articleRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  Article.findByIdAndRemove(id, err => {
    if (err) return res.status(500).send(err);
    return res.json({
      status: 'ok',
      message: `article ${id} is deleted!`,
    });
  });
});

export default articleRouter;
