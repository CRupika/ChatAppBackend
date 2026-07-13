import pool from "../config/db.js";

class WorkspaceModel {

    static async createWorkspace(name, createdBy) {

        const query = `
            INSERT INTO workspaces (name, created_by)
            VALUES ($1, $2)
            RETURNING *;
        `;

        const result = await pool.query(query, [
            name,
            createdBy
        ]);

        return result.rows[0];
    }

    static async getAllWorkspaces() {

        // const query = `
        //     SELECT *
        //     FROM workspaces
        //     where is_deleted = FALSE
        //     ORDER BY created_at DESC;
        // `;

        const query = `
            select ws.* ,u.email from workspaces ws
            Left join users u
            ON ws.created_by = u.id
            Where ws.is_deleted = FALSE 
            ORDER BY ws.created_at DESC;
        `;

        const result = await pool.query(query);

        return result.rows;
    }

    static async getWorkspaceById(id) {

        const query = `
        SELECT *
        FROM workspaces
        WHERE id = $1
        AND is_deleted = FALSE
        ORDER BY created_at ASC;
    `;

        const result = await pool.query(query, [id]);

        return result.rows[0];
    }


    static async updateWorkspace(id, name) {

        const query = `
        UPDATE workspaces
        SET name = $1
        WHERE id = $2
        RETURNING *;
    `;

        const result = await pool.query(query, [
            name,
            id
        ]);

        return result.rows[0];
    }

    static async deleteWorkspace(id) {

        //     const query = `
        //     DELETE FROM workspaces
        //     WHERE id = $1
        //     RETURNING *;
        // `;

        const query = `
        UPDATE workspaces
        SET is_deleted = TRUE
        WHERE id = $1
        RETURNING *;
    `;

        const result = await pool.query(query, [id]);

        return result.rows[0];
    }

}

export default WorkspaceModel;