import pool from "../config/db.js";

class ChannelModel {

    static async createChannel({ name, workspace_id, created_by }) {
        const query = `
            INSERT INTO channels (name, workspace_id, created_by)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        const values = [name, workspace_id, created_by];

        const { rows } = await pool.query(query, values);

        return rows[0];
    }


    static async getChannelsByWorkspace(workspaceId) {

        const query = `
            SELECT *
            FROM channels
            WHERE workspace_id = $1
            AND is_deleted = FALSE
            ORDER BY created_at ASC;
        `;

        const { rows } = await pool.query(query, [workspaceId]);

        return rows;
    }

    static async getChannelById(id) {

        const query = `
            SELECT *
            FROM channels
            WHERE id = $1
            AND is_deleted = FALSE
            ;
        `;

        const { rows } = await pool.query(query, [id]);

        return rows[0];
    }

    static async updateChannel(id, name) {
        const query = `
        UPDATE channels
        SET name = $1
        WHERE id = $2
        RETURNING *;
    `;

        const values = [name, id];
        const { rows } = await pool.query(query, values);

        return rows[0];
    }

    static async deleteChannel(id) {
        const query = `
        UPDATE channels
        SET is_deleted = TRUE
        WHERE id = $1
        RETURNING *;
    `;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }


}

export default ChannelModel;