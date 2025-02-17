const { Posts, User } = require('../models');

const createPost = async (req, res) => {
    try {
        const { title, content, date, attachments, user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: "user_id é obrigatório." });
        }

        const post = await Posts.create({ title, content, date, attachments, user_id });

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar o post." });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Posts.findOne({ where: { id } });

        if (!post) {
            return res.status(404).json({ error: "Post não encontrado." });
        }

        await post.destroy();
        res.json({ message: "Post deletado com sucesso." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar post" });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.findAll({
            include: { model: User, as: 'user', attributes: ['id', 'username', 'email'] }
        });

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar posts" });
    }
};

const getAllPostsByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const posts = await Posts.findAll({
            where: { user_id },
            include: { model: User, as: 'user', attributes: ['id', 'username', 'email'] }
        });

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar posts do usuário" });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Posts.findOne({
            where: { id },
            include: { model: User, as: 'user', attributes: ['id', 'username', 'email'] }
        });

        if (!post) {
            return res.status(404).json({ error: "Post não encontrado." });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar post pelo ID." });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, date, attachments } = req.body;

        const post = await Posts.findOne({ where: { id } });

        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        await post.update({ title, content, date, attachments });

        res.json({ message: "Post atualizado com sucesso.", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar post" });
    }
};

module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    getAllPostsByUser,
    getPostById,
    updatePost
};
