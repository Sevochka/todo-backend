import express from 'express';
import pool from '../utils/my-sql';

const router = express.Router({ mergeParams: true });
const jsonParser = express.json();

router.post('/', jsonParser, async (req, res) => {
  const { title, folderId } = req.body;

  try {
    const [rows] = await pool.query(`
      INSERT INTO todos (title, folder_id, completed) VALUES (?, ?, ?)`,
    [title, folderId, false]);

    return res.send(rows);
  } catch (err) {
    return res.send(err);
  }
});

router.delete('/', jsonParser, async (req, res) => {
  const { todoId } = req.query;

  try {
    const [rows] = await pool.query(`
      DELETE FROM todos WHERE todo_id = ?`, [todoId]);

    return res.send(rows);
  } catch (err) {
    return res;
  }
});

router.get('/changeComplete', jsonParser, async (req, res) => {
  const { complete, todoId } = req.query;

  try {
    const [rows] = await pool.query(`
      UPDATE todos SET completed = ? WHERE todo_id = ?`, [complete, todoId]);

    return res.send(rows);
  } catch (err) {
    return res;
  }
});

export default router;
