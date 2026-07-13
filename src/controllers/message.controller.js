import MessageService from '../services/message.service.js'

class MessageController {

    static async sendMessage(req, res) {
        try {
            const message = await MessageService.sendMessage(req.body);

            return res.status(201).json({
                success: true,
                message: "Message sent successfully",
                data: message
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    static async getMessages(req, res) {

        try {

            const { id } = req?.params;

            console.log('channelId -----> 29',id)

            const message = await MessageService.getMessages(id)

            return res.status(200).json({
                success: true,
                data: message
            })

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

    }

    static async editMessage(req, res) {

        try {

            const { id } = req.params
            const { message } = req?.body

            const updateMessage = await MessageService.editMessage(id, message)

            return res.status(200).json({
                success: true,
                data: updateMessage
            })

        } catch (error) {
            
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }

    }

    static async deleteMessage(req, res) {

        try {

            const {id} = req?.params
            const deleteMessage = await MessageService.deleteMessage(id)

            return res.status(200).json({
                success:true,
                data:deleteMessage
            })

        } catch (error) {
            
            return res.status(500).json({
                success:false,
                message:error?.message
            })
        }
    }

}

export default MessageController;