const express = require("express");
const mysql = require('mysql');
const app = express()
let port = 3308

app.use(express.json())

const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "testtodo"
    }
});

knex.schema.hasTable("komallist").then((data) => {
    if (!data){
        return knex.schema.createTable("komallist" , (table) => {
            table.increments("id").primary(),
            table.string("status")
        })
    }
});

app.post("/api/Todo" ,(req,res) => {
    knex("komallist").insert({
        status : req.body.status
    })
        .then(() => {
            console.log("successfully created.....   ")
            res.send("successfully created.....  ")
        })
        .catch((error) => {
            console.log("something went!   ")
            res.send(error)
        })
})


app.get("/api/Todo", (req,res) => {
    knex()
        Select("*")
        From("komallist")
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

app.get("/api/Todo/:id", (req,res) => {
    knex()
        select("*")
        From("komallist")
        Where("id",req.params.id)
        .then((data) => {
            res.send(data)
        })
        .catch((er) => {
            res.send(er)
        })
})

app.put("/api/Todo/:id", (req,res) => {
    knex.update({
        "status" : req.body.status
    })
        .Table("komallist"),where("id", req.params.id)
        .then(() => {
            console.log("updated successfully....  ")
            res.send("updated successfully!..   ")
        })
        .catch((reject) => {
            console.log("not yet updated!.  ")
            res.send(reject)
        })

})


app.delete("/api/Todo/:id", (req,res) => {
    knex("komallist")
        where({"id" : req.params.id}).del()
        .then(() => {
            console.log("deleted Successfully")
            res.send("deleted Successfully ")
        })
        .catch((failed) => {
            console.log("not yet deleted...  ")
            res.send(failed)
        })
})

app.listen(port, () => {
    console.log(`your port is running ${port}`)
})