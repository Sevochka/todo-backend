import express from 'express';

import user from './user';
import folders from './folders';
import todos from './todos';

const router = express.Router({ mergeParams: true });

router.use('/user', user);
router.use('/folders', folders);
router.use('/todos', todos);

router.get('/service-ping/', (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.send('Express status: Ready');
});

router.get('/test/', (req, res) => {
  res.status(200);
  res.send({
    message: 'Test route',
  });
});

export default router;
