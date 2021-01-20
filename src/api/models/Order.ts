import { pool } from '../db';
import { Response, Request } from 'express'

// define table
const table: String = 'orders';

// set error message
pool.on('error', (err, client) => `Error, ${err},  occured on ${client}`);


// select current order by user id
const getCurrentOrderByUserId = async (req: Request, res: Response) => {
    const user_id = parseInt(req.params.user_id);
    const status = 'active';
    const currentOrdersByUserId = await pool.query(
        `SELECT * FROM ${table} WHERE user_id = $1 AND status = $2 LIMIT 1`, [
            user_id,
            status
        ]
    );
    res.status(200).json(currentOrdersByUserId.rows[0]);

};

// select completed order by user id
const getCompletedOrdersByUserId = async (req: Request, res: Response) => {
    const user_id = parseInt(req.params.user_id);
    const status = 'complete';
    const completedOrdersByUserId = await pool.query(
        `SELECT * FROM ${table} WHERE user_id = $1 AND status = $2`, [
            user_id, 
            status
        ]
    );
    res.status(200).json(completedOrdersByUserId.rows);

};

// update
// delete
// where

export {
    getCurrentOrderByUserId,
    getCompletedOrdersByUserId
}