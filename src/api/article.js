import { Router } from 'express';

import models from '../models';

const { Article, Tag, ArticleTag } = models;

const articleRouter = new Router();

articleRouter.get('/', async (req, res) => {
  try {
    const articles = await Article.all();

    res.json(articles);
  } catch (err) {
    console.error(err);
  }
});

articleRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  res.json(article);
});

articleRouter.post('/', async (req, res) => {
  const { title, content, tags } = req.body;

  const article = await Article.create({
    title,
    content,
    userId: 1,
  });

  for (let i = 0; i < tags.length; i += 1) {
    const [tag] = await Tag.findOrCreate({
      where: {
        name: tags[i],
      },
    });

    await ArticleTag.create({
      articleId: article.id,
      tagId: tag.id,
    });
  }

  res.json(article);
});

articleRouter.put('/:id', async (req, res) => {
  const { title, content, tags } = req.body;
  const id = req.params.id;
  await Article.update({
    title,
    content,
  }, {
    where: {
      id,
    },
  });

  // FIXME: tags

  const article = await Article.findById(id);
  res.json(article);
});

articleRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await Article.destroy({
    where: {
      id,
    },
  });

  res.json({
    deletedId: +id,
  });
});

export default articleRouter;
