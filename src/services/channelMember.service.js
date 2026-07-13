import ChannelMemberModel from "../models/channelMember.model.js";

class ChannelMemberService {

    static async addMember (data){
       
        const exist = await ChannelMemberModel?.findMember(
            data?.channel_id,
            data?.user_id
        )

        if(exist){
            throw new Error('User already joined this channel.')
        }

        return await ChannelMemberModel?.addMember(data)
    }

    static async getMembers(channelId){

        return await ChannelMemberModel?.getMembers(channelId)
    }

    static async removeMember (id){

        return await ChannelMemberModel?.removeMember(id)
    }
}

export default ChannelMemberService