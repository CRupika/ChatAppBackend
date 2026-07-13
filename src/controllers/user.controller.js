import UserService from "../services/user.service.js";

class UserController {

    static async getUsers(req, res) {

        try {

            const users =
                await UserService.getUsers(req.userId);

            return res.status(200).json({
                success: true,
                data: users
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    static async getUserById(req, res) {

        try {

            const user =
                await UserService.getUserById(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                data: user
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message
            });

        }

    }

}

export default UserController;