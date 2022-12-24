import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import pool from '../utils/my-sql';

const router = express.Router({ mergeParams: true });
const jsonParser = express.json();

router.get('/auth', jsonParser, async (req, res) => {
  console.log(1);
  try {
    const userId = uuidv4();
    await pool.query(`
      INSERT INTO user (user_id)
      VALUES (?);
    `, [userId]);

    return res.send({
      userId,
    });
  } catch (err) {
    return res.send(err);
  }
});

export default router;
