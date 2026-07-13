// import pool from "../config/db.js";

// class ConversationModel {

//     static async createConversation() {

//         const query = `
//             INSERT INTO conversations
//             DEFAULT VALUES
//             RETURNING *;
//         `;

//         const result = await pool.query(query);

//         return result.rows[0];
//     }

//     static async getConversations() {

//         const query = `
//             SELECT *
//             FROM conversations
//             ORDER BY created_at DESC;
//         `;

//         const result = await pool.query(query);

//         return result.rows;
//     }

//     static async getConversationById(id) {

//         const query = `
//             SELECT *
//             FROM conversations
//             WHERE id = $1;
//         `;

//         const result = await pool.query(query, [id]);

//         return result.rows[0];
//     }

// }

// export default ConversationModel;


import pool from "../config/db.js";

class ConversationModel {

    static async findConversation(user1Id, user2Id) {

        const query = `
            SELECT cm1.conversation_id
            FROM conversation_members cm1
            JOIN conversation_members cm2
                ON cm1.conversation_id = cm2.conversation_id
            WHERE cm1.user_id = $1
              AND cm2.user_id = $2
              AND cm1.is_deleted = FALSE
              AND cm2.is_deleted = FALSE
            LIMIT 1;
        `;

        const result = await pool.query(query, [user1Id, user2Id]);

        return result.rows[0];
    }

    static async createConversation() {

        const query = `
            INSERT INTO conversations
            DEFAULT VALUES
            RETURNING *;
        `;

        const result = await pool.query(query);

        return result.rows[0];
    }

    static async addMember(conversationId, userId) {

        const query = `
            INSERT INTO conversation_members
            (conversation_id, user_id)
            VALUES ($1,$2)
            RETURNING *;
        `;

        const result = await pool.query(query, [
            conversationId,
            userId
        ]);

        return result.rows[0];
    }

    static async getConversations(userId) {

        const query = `
        SELECT
            c.id,
            c.created_at
        FROM conversations c
        INNER JOIN conversation_members cm
            ON c.id = cm.conversation_id
        WHERE cm.user_id = $1
        ORDER BY c.created_at DESC;
    `;

        const result = await pool.query(query, [userId]);

        return result.rows;
    }

    static async getConversationById(
        conversationId,
        userId
    ) {

        const query = `
        SELECT
            c.id,
            c.created_at
        FROM conversations c
        INNER JOIN conversation_members cm
            ON c.id = cm.conversation_id
        WHERE c.id = $1
        AND cm.user_id = $2;
    `;

        const result = await pool.query(
            query,
            [conversationId, userId]
        );

        return result.rows[0];
    }
}

export default ConversationModel;