const { Posts, User, PostReplies } = require('../models');

const createPostReply = async (req, res) => {
    try {
        const { title, content, date, attachments } = req.body;
        const { user_id } = req.params;

        const postReply = await PostReplies.create({ title, content, date, attachments, user_id });

        res.status(201).json(postReply);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar a resposta do post." });
    }
};

const deletePostReply = async (req, res) => {
    try {
        const { id, user_id } = req.params;
        const postReply = await PostReplies.findOne({ where: { id, user_id } });

        if (!postReply) {
            return res.status(404).json({ error: "Resposta do post não encontrada." });
        }

        await postReply.destroy();
        res.json({ message: "Resposta do post deletada com sucesso." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar resposta do post" });
    }
};

const getAllPostReplies = async (req, res) => {
    try {
        const postReplies = await PostReplies.findAll({
            include: { model: User, as: 'user', attributes: ['id', 'username', 'email'] }
        });

        res.json(postReplies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar respostas dos posts" });
    }
};

const getAllPostRepliesByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const postReplies = await PostReplies.findAll({
            where: { user_id },
            include: { model: User, as: 'user', attributes: ['id', 'username', 'email'] }
        });

        res.json(postReplies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar respostas do usuário" });
    }
};

const getPostReplyById = async (req, res) => {
    try {
        const { id, user_id } = req.params;
        const postReply = await PostReplies.findOne({
            where: { id, user_id },
            include: { model: User, as: 'user', attributes: ['id', 'username', 'email'] }
        });

        if (!postReply) {
            return res.status(404).json({ error: "Resposta do post não encontrada." });
        }

        res.json(postReply);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar resposta do post pelo ID." });
    }
};

const updatePostReply = async (req, res) => {
    try {
        const { id, user_id } = req.params;
        const { title, content, date, attachments } = req.body;

        const postReply = await PostReplies.findOne({ where: { id, user_id } });

        if (!postReply) {
            return res.status(404).json({ error: "Resposta do post não encontrada." });
        }

        await postReply.update({ title, content, date, attachments });

        res.json({ message: "Resposta do post atualizada com sucesso.", postReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar resposta do post" });
    }
};

module.exports = {
    createPostReply,
    deletePostReply,
    getAllPostReplies,
    getAllPostRepliesByUser,
    getPostReplyById,
    updatePostReply
};
