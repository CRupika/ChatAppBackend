import ChannelMemberService from "../services/channelMember.service.js";

class ChannelMemberController{

    static async addMember (req,res){
       
        try{

            const member = await ChannelMemberService?.addMember(req.body);

            return res.status(201).json({
                success:true,
                message:'Member added successfully',
                data:member
            })

        } catch(err){
            return res.status(400).json({
                success:false,
                message:err?.message
            })
        }
    }

    static async getMembers (req,res){

        console.log('req ------> 27',req)
        console.log('res -------> 28',res)
      
        try{

            const member = await ChannelMemberService?.getMembers(req?.params?.id)

            return res.status(200).json({
                success:true,
                data:member
            })

        }catch(err){
            return res.status(400).json({
                success:false,
                message:err?.message
            })
        }
    }

    static async removeMember (req,res){
        
        try{

            const member = await ChannelMemberService?.removeMember(req?.params?.id)

            return res.status(200).json({
                success:true,
                data:member
            })

        }catch(err){
            return res.status(400).json({
                success:false,
                message:err?.message
            })
        }
    }

}

export default ChannelMemberController