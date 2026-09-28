const express = require("express")
const cors = require("cors")
const db = require("./config/database")


const app = express()

const PORT = 3001

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json({
        mensagem:"API funcionando"
    })
})

app.get("/planos", async (req, res)=>{
    try {
        const [planos] = await db.query(
            "select * from Planos"
        )
        res.json(planos)
    } catch (error) {
        console.log(error)
    }
})

app.post("/planos", async (req, res) => {
    try {
        const {id, nome, valor} = req.body;

        const sql = `
            INSERT INTO produto (id, nome, valor)
            VALUES (?, ?, ?)
        `;

        const [result] = await db.execute(sql, [
            id,
            nome,
            valor
        ]);

        res.status(201).json({
            mensagem: "Produto cadastrado com sucesso",
            produto: {
                id: result.insertId,
                id, 
                nome,
                valor
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao cadastrar produto"
        });
    }
});

app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta 3001")
})
