import pool from "../config/db.js";

class ChannelMemberModel {

    static async addMember({channel_id,user_id}){

        console.log('channel_id ------> 7',channel_id)
        console.log('user_id ----------> 8',user_id)
     
        const query = `
           INSERT INTO channel_members
           (channel_id,user_id)
           VALUES ($1,$2)
           RETURNING *;
        `

        const result = await pool.query(query,[channel_id,user_id])
        return result?.rows[0];
    }

    static async findMember(channel_id,user_id){

        const query = `
           select * from channel_members
           where channel_id = $1 
           AND user_id      = $2
           AND is_deleted   = false
        `

        const result = await pool.query(query,[channel_id,user_id])
        return result?.rows[0];

    }

    static async getMembers(channel_id){
          
        const query = `
          SELECT 
             cm.id,
             u.id AS user_id,
             u.username,
             u.email,
             cm.joined_at
          FROM channel_members cm 
          JOIN users u 
          ON cm.user_id = u.id
          where cm.channel_id = $1
          AND cm.is_deleted = false 
          ORDER BY cm.joined_at
        `
        const result = await pool.query(query,[channel_id]);
        return result?.rows;
    }

    static async removeMember(id){
         
        const query = `
           UPDATE channel_members 
           SET is_deleted = TRUE
           where id = $1
           RETURNING *;
        `
        const result = await pool.query(query,[id]);
        return result?.rows[0]
    }

}

export default ChannelMemberModel