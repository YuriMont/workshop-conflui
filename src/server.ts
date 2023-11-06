import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";


interface CreateUserParams{
    name: string;
    email: string;
}

interface UpdateUserParam{
    name: string;
}

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("Primeira requisição")
});

app.get("/all", async (req, res) => {
    const allUser = await prisma.user.findMany();

    res.status(200).json(allUser)
});

app.post("/create", async (req, res) => {
    const params: CreateUserParams = req.body;

    const { name, email } = params;

    const userCreated = await prisma.user.create({
        data: {
            name, 
            email
        }
    });

    res.status(201).json(userCreated);
});

app.put("/update/:id", async (req, res) => {
    const params = req.params.id

    const bodyParams: UpdateUserParam = req.body;

    const userExits = await prisma.user.findUniqueOrThrow({
        where: {
            id: params
        }
    })

    await prisma.user.update({
        where: {
            id: userExits.id
        },
        data: {
            name: bodyParams.name
        }
    })


    res.status(200).send("Usuario atualizado com sucesso!")
})

app.delete("/delete/:id", async (req, res) => {
    const params = req.params.id;

    await prisma.user.delete({
        where: {
            id: params
        }
    })

    res.status(200).send("Usuario deletado com sucesso!");
})


app.listen(3333, () => {
    console.log("Http server running on http://localhost:3333")
})
