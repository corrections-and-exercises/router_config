import { pool } from '../db.js';

export async function getUsers(req, res, next) {
    try {
        const { rows: users } = await pool.query('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export async function getUserWithId(req, res, next) {
    res.json(req.user);
}

export async function createUser(req, res, next) {
    const { first_name, last_name, email } = req.body;
    try {
        if (!first_name || !last_name || !email) {
            return res.sendStatus(400);
        }
        const { rows: user } = await pool.query(
            'INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *;',
            [first_name, last_name, email]
        );
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export async function updateUser(req, res, next) {
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
        return res.sendStatus(400);
    }

    try {
        const { rows: user } = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [req.user.id]
        );
        if (!user.length > 0) {
            return res.sendStatus(404);
        }

        const { rows: updatedUser } = pool.query(
            'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *',
            [first_name, last_name, email, req.user.id]
        );

        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export async function deleteUserWithId(req, res, next) {
    try {
        const { rows: deletedUser } = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [req.user.id]
        );
        res.json({ message: 'user deleted', deletedUser });
    } catch (error) {
        next(error);
    }
}
