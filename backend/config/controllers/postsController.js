const { Posts, User } = require('../models');

const createPost = async (req, res) => {
    try { const {title, content, date, attachments} = req.body;
    const user_id = req.params.user_id;
    const post = await Posts.create({ title, content, date, attachments});
    res.status(201).json(post);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o post."})
}};



const deletePost = async (req, res) => {
    try { 
        const {id} = req.params
        const user_id = req.params.user_id;
        const post = await Posts.findOne({ where: { id, user_id } });
        if (!post) {
            return res.status(404).json({error: "Post não encontrado."})
        }
        await post.destroy();
        res.json({message: "Post deletado com sucesso."});
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar post"})
}};



const getAllPosts = async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const post = await Posts.findAll();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar posts" });
    }
  };

const getPostById = async (req, res) => {
    try{ 
        const {id} = req.params;
        const user_id = req.params.user_id;
        const post = await Posts.findOne({ where: id})
    }
}