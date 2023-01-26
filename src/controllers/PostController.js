import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    //criação do post
    async createPost(req, res) {
        const { content } = req.body;
        const {id} = req.params;

        try {                   //vai buscar o usuario para ver se ele existe
            const user = await prisma.user.findUnique({where: {id:Number(id)}});
            
            //se ñ encontrar o usuario, ele não pode criar o post
            if(!user){
                return res.json({Message: "User does not exist"});
            }

            //caso o usuario exista
            const post = await prisma.post.create({
                data:{
                    content,
                    userId: user.id,
                },
                include: {
                    //quando ele criar o post e for mostrar o post criado, ele tem que trazer os dados do usuario
                    //se colocarmos "false", ele não trará as informações do usuario. 
                    author: true,
                },
            });
            return res.json(post)
        } catch (error) {
            return res.json({message: error.message});
        }
    },

    //listagem do post
    async findAllPosts(req, res) {
        try {             //traz os varios post 
            const posts = await prisma.post.findMany({
                //findMany pode receber alguns metodos.
                //select serve para selecionar quais opçoes eu quero que apareça para o usuario quando ele fizer a busca
                // select: {
                //     content:true,
                //}
            })

            return res.json (posts);
        } catch (error) {
            return res.json (error);
        }
    },

    //atualizar os post
    async updatePost(req, res){
        const { id } = req.params;
        const { content } = req.body;

        try {
            //findUnique pq precisamos validar se o post existe de verdade
            //precisa converter o id para number pq ele vem como string
            const post = await prisma.post.findUnique({where: {id:Number(id)}});

            //se o post não existir, ele não pode ser alterado
            if(!post) {
                return res.json({message: "Post does not exist"});
            }

            //e se ele existir, será feito a atualização dele
            await prisma.post.update({
                where: { id: Number(id) },
                //data: dados atualizados
                data: {content},
            });
            return res.json({message: "Updated post"})
        } catch (error) {
            return res.json({message: error.message});
        }
    },
};