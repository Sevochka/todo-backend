import express from 'express';
import pool from '../utils/my-sql';

const router = express.Router({ mergeParams: true });
const jsonParser = express.json();

router.get('/', jsonParser, async (req, res) => {
  const { userId } = req.query;

  try {
    const [rows] = await pool.query(`
     SELECT f.folder_id, f.emoji, f.name, t.completed, t.todo_id, t.title FROM folder f 
     LEFT JOIN todos t ON t.folder_id = f.folder_id  
     WHERE f.user_id = ?`, [userId]);

    const result = rows.reduce((acc: any, row: any) => {
      const newTodo = row.todo_id ? {
        todoId: row.todo_id,
        title: row.title,
        completed: row.completed,
      } : null;

      // eslint-disable-next-line no-nested-ternary
      const todos = acc[row.folder_id]
        ? [...acc[row.folder_id].todos, newTodo]
        : newTodo ? [newTodo] : [];

      return {
        ...acc,
        [row.folder_id]: {
          folderId: row.folder_id,
          name: row.name,
          emoji: row.emoji,
          todos,
        },
      };
    }, {});

    return res.send(Object.values(result));
  } catch (err) {
    return res.send(err);
  }
});

router.post('/', jsonParser, async (req, res) => {
  const { folderName, emoji, userId } = req.body;

  try {
    const [rows] = await pool.query(`
      INSERT INTO folder (name, emoji, user_id) VALUES(?, ?, ?)`,
    [folderName, emoji, userId]);

    return res.send(rows);
  } catch (err) {
    return res.send(err);
  }
});

router.delete('/', jsonParser, async (req, res) => {
  const { folderId } = req.query;

  try {
    const [rows] = await pool.query(`
      DELETE FROM folder WHERE folder_id = ?`, [folderId]);

    return res.send(rows);
  } catch (err) {
    return res.send(err);
  }
});

export default router;
