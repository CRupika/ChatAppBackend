import pool from "../config/db.js";

class DirectMessageModel {

    static async create(data) {

        const { conversationId, senderId, message } = data;

        const query = `
            INSERT INTO direct_messages
            (
                conversation_id,
                sender_id,
                message
            )
            VALUES
            (
                $1,
                $2,
                $3
            )
            RETURNING *;
        `;

        const result = await pool.query(query, [
            conversationId,
            senderId,
            message
        ]);

        return result.rows[0];
    }

    static async getConversationMessages(conversationId) {

        const query = `
            SELECT *
            FROM direct_messages
            WHERE conversation_id = $1
            AND is_deleted = FALSE
            ORDER BY created_at ASC;
        `;

        const result = await pool.query(query, [conversationId]);

        return result.rows;
    }

    static async updateMessage(id, message) {

        const query = `
            UPDATE direct_messages
            SET
                message = $1,
                updated_at = NOW()
            WHERE id = $2
            RETURNING *;
        `;

        const result = await pool.query(query, [
            message,
            id
        ]);

        return result.rows[0];
    }

    static async deleteMessage(id) {

        const query = `
            UPDATE direct_messages
            SET
                is_deleted = TRUE
            WHERE id = $1
            RETURNING *;
        `;

        const result = await pool.query(query, [id]);

        return result.rows[0];
    }

}

export default DirectMessageModel;