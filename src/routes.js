import { Router } from "express";

//*UserController
import UserController from "./controllers/UserController";
//*PostController
import PostController from "./controllers/PostController";

const router = Router();

//!rota do UserController
//para criar usuario
router.post("/user", UserController.createUser);

//para listar usuario
router.get("/users", UserController.findAllUsers);
//para listar/buscar um unico usuario 
//":id" é o parametro da requisição aonde vai pegar o id do usuario
router.get("/user/:id", UserController.findUser);

//atualizar um usuario
router.put("/user/:id", UserController.updateUser);

//deletar um usuario
router.delete("/user/:id", UserController.deleteUser);


//!rota do PostController
//precisamos saber qual usuario está fazendo esse post
router.post("/post/user/:id", PostController.createPost);

//lista os post
router.get("/posts", PostController.findAllPosts);

//atualizar os post
router.put("/post/:id", PostController.updatePost);


export { router };


//no terminal, quando se coloca "yarn prisma studio" é mostrado em uma guia os post lançados. 