const express = require('express');
const app = express();
const { User, Story } = require('./db');
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');

app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll({
      attributes: {
        exclude: ['bio']
      } 
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:id', async(req, res, next)=> {
  try {
    res.send(await User.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:id/stories', async(req, res, next)=> {
  try {
    const stories = await Story.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.send(stories);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/users', async(req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('api/users/:id', async(req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  }
  catch(ex) {
    next(ex);
  }
});


app.post('/api/users/:id/stories', async(req, res, next) => {
  try{
    res.status(201).send(await Story.create( { userId: req.params.userId, storyId: req.body.storyId}))
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/stories/:id', async(req, res, next) => {
  try{
    const reservation = await Story.findByPk(req.params.id);
    await reservation.destroy();
    res.sendStatus(204);
  }
  catch(ex) {
    next(ex);
  }
})

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));
