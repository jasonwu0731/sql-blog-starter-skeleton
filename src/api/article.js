import { Router } from 'express';

import models from '../models';

const { Article, Tag, ArticleTag } = models;

const articleRouter = new Router();

articleRouter.get('/', async (req, res) => {
  try {
    //console.log(models);
    let articles = await Article.all();
    articles = await Promise.all( articles.map( async article => {
        let tags;
        let article_tags;
        article_tags = await ArticleTag.findAll({ where: { articleId: article.id } });
        //console.log('article_tags', article_tags);
        tags = await Promise.all( article_tags.map( async article_tag => {
            let name;
            name = await Tag.findAll({ where: { id: article_tag.tagId } });
            //console.log('name', name);
            return name
          })
        )
        article.dataValues.tags = tags;
        //console.log('tags in api', tags);
        //console.log('tags[0] in api', tags[0]);
        return article;
      }),
    )
    //console.log('articles in api', articles )
    //console.log('articles[0].tags in api', articles[0].tags)
    //console.log('typeof(articles)', typeof(articles)) 
    res.send(articles);
  } catch (err) {
    console.error('GET ERROR ',err);
  }
});

articleRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  res.json(article);
});

articleRouter.post('/', async (req, res) => {
  const { userId, title, content, tags } = req.body;

  const article = await Article.create({
    title,
    content,
    userId,
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

  //console.log("PUT NOT IMPLEMENT!!!!!!!!!!!!")
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
