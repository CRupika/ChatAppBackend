import pool from "../config/db.js";

class MessageModel {

    static async create(data) {
        const { channelId, senderId, message } = data;

        console.log('data ------> 6', data)

        const query = `
      INSERT INTO messages (channel_id,sender_id,message)
      VALUES ($1,$2,$3)
      RETURNING channel_id,sender_id, message
    `;
        const result = await pool.query(query, [channelId, senderId, message]);
        return result.rows[0];
    }

    static async getChannelMessages(channelId) {

        console.log('channelId ---> 21',channelId)

        const query = `
        select * from messages
        where channel_id = $1
        AND is_deleted = FALSE
        ORDER BY created_at ASC;
        `
        const result = await pool.query(query, [channelId])

        console.log('result ----> 31',result)
        console.log('result rows ----> 32',result?.rows)
        
        return result.rows;
    }

    static async updateMessage(id, message) {

        const query = `
        UPDATE messages
        SET message = $1
        WHERE id = $2
        RETURNING *;
    `;

        const result = await pool.query(query, [message, id]);

        return result.rows[0];
    }

    static async deleteMessage(id) {

        const query = `
        UPDATE messages
        SET is_deleted = TRUE
        WHERE id = $1
        RETURNING *;
    `;

        const result = await pool.query(query, [id]);

        return result.rows[0];
    }

}

export default MessageModel