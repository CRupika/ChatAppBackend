import ChannelModel from "../models/channel.model.js";

class ChannelService {
  
    static async createChannel(data){
        return await ChannelModel.createChannel(data);
    }

    static async getChannels(workspaceId){
        return await ChannelModel.getChannelsByWorkspace(workspaceId);
    }

    static async updateChannel(id, name){
        const channel = await ChannelModel.getChannelById(id, name);
        if(!channel){
            throw new Error('Channel not found');
        }
        return await ChannelModel.updateChannel(id, name);
    }

    static async deleteChannel(id){
        const channel = await ChannelModel.getChannelById(id);
        if(!channel){
            throw new Error('Channel not found');
        }
        return await ChannelModel.deleteChannel(id);
    }
}

export default ChannelService;