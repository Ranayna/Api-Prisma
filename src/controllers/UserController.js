import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    //criar um usuario
    async createUser(req, res) {
        try {
            //precisa pegar as duas informaçoes que estão no schema (email e nome) para criar o primeira usuario
            const { name, email } = req.body;
            //findUnique: informação unica
            let user = await prisma.user.findUnique({ where: { email } });

                if (user) {
                //condição para usuario/email existente
                return res.json({ error: "Email and username already exist" });
                }
            //a variavel user vai receber do prisma o name e o email para criar um usuario. "ctrl+espaço" mostra o que
            //ele espera que seja colocado dentro das chaves, nesse caso o "data" que vai estar as info dos usuarios
            user = await prisma.user.create({
                //já tem a criação do usuario
                data: {
                    name,
                    email,
                },
            });
            return res.json(user);
        } catch (error) {
        //usuario não existe
        return res.json({ error });
        }
    },
    //listar o usuario.
    async findAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany();
            return res.json(users);
        } catch (error) {
            return res.json({ error })
        }
    },

    //listar um unico usuario
    async findUser(req, res) {
        try {
            const {id} = req.params;    
                                            //tem que converter para number pq senão ele estará como string
            const user = await prisma.user.findUnique({where: {id: Number(id)}});

            //para caso não encontre um usuario cadastrado
            if(!user) return res.json({ error: "Could not find this user!"})

            return res.json(user);
        } catch (error) {
            return res.json({ error })
        }
    },

    //criar a funcionalidade de atualizar usuario
    async updateUser(req, res) {
        try {
            //precisa saber o usuario que vai editar
            const {id} = req.params;    
            const {name, email} = req.body;

            //tem que converter para number pq senão ele estará como string
            let user = await prisma.user.findUnique({where: {id: Number(id)}});
             //para caso não encontre um usuario cadastrado
            if(!user)
                return res.json({ error: "Could not find this user!"})

            user = await prisma.user.update({
                where: { id: Number(id) }, 
                data: { name, email } 
            });
            return res.json(user);
        } catch (error) {
            res.json({error });
        }
    },

    //deletar um usuario
    async deleteUser (req, res) {
        try {
            const {id} = req.params;    
                                            //tem que converter para number pq senão ele estará como string
            const user = await prisma.user.findUnique({where: {id: Number(id)}});

            //para caso não encontre um usuario cadastrado
            if(!user) return res.json({ error: "Could not find this user!"});

            await prisma.user.delete({where: {id: Number(id)}})

            return res.json({message: "deleted user"});
        } catch (error) {
            return res.json({ error })
        }
    },
};
