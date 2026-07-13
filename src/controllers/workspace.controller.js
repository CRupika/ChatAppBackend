import WorkspaceService from "../services/workspace.service.js";

class WorkspaceController {

    static async createWorkspace(req, res) {

        try {

            const workspace =
                await WorkspaceService.createWorkspace(req.body);

            return res.status(201).json({
                success: true,
                message: "Workspace created successfully",
                data: workspace
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    static async getAllWorkspaces(req, res) {

        try {

            const workspaces =
                await WorkspaceService.getAllWorkspaces();

            return res.status(200).json({
                success: true,
                data: workspaces
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    static async getWorkspaceById(req, res) {

        try {

            const workspace =
                await WorkspaceService.getWorkspaceById(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                data: workspace
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message
            });

        }

    }

    static async updateWorkspace(req, res) {

        try {

            const workspace =
                await WorkspaceService.updateWorkspace(
                    req.params.id,
                    req.body
                );

            return res.status(200).json({
                success: true,
                message: "Workspace updated successfully",
                data: workspace
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    static async deleteWorkspace(req, res) {

        try {

            await WorkspaceService.deleteWorkspace(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message: "Workspace deleted successfully"
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message
            });

        }

    }

}

export default WorkspaceController;