const express = require('express');
const {db, Player, User, Team} = require('./db');
// const {Model} = require("sequelize/types");
const {Op} = require('sequelize');

const server = express();
server.use(express.json());
server.post('/player', async (req, res) => {
    //recibimos informacion por body para agregarla a la db.
    const {firstName, lastName, userName, season, number} = req.body;
    try {
        const newPlayer = await Player.create({
            firstName,
            lastName,
            userName,
            season,
            number
        });
        console.log(newPlayer.toJSON())
        res.json(newPlayer);
    } catch (error) {
        res.send(error);
    }
});
server.get('/players', async (req, res) => {
    const {name} = req.query;
    if (name) {
        //En este if, si se ingreso un name por body, entonces va a buscar ese player a la DB.
        try {
            const player = await Player.findAll({
                where: {
                    firstName: name
                }
            });
            console.log(player);
            res.json(player ? player : "Jugador no encontrado");
        } catch (e) {
            res.send(e);
        }

    } else {
        //En este else, si no ingresaron un nombre por body, entonces trae todos los players
        try {
            const players = await Player.findAll();
            res.json(players.length > 0 ? players : 'No hay jugadores con tal nombre.');
        } catch (e) {
            res.send(e);
        }
    }


});
server.get('/players/name', async (req, res) => {
    try {
        const names = await Player.findAll({attributes: ['firstName', 'lastName']});
        res.send(names);
    } catch (e) {
        res.send(e);
    }
})
server.get('/players/and', async (req, res) => {
    const {name, lastname} = req.query;
    try {
        let players = await Player.findAll({
            where: {
                [Op.and]: [{firstName: name}, {lastName: lastname}]
            },
            order: ['firstName']
        });
        res.send(players.length > 0 ? players : 'No hay jugadores que coincidan con la busqueda');
    } catch (e) {
        res.send(e);
    }
});
server.get('/player/:id', async (req, res) => {
    try {
        let {id} = req.params;
        let player = await Player.findByPk(id);
        console.log(id, player.toJSON());
        res.json(player ? player : 'Player not found.')
    } catch (e) {
        res.send(e);
    }
});
server.get('/teams', async (req,res)=>{

})
server.post('/player/findOrCreate', async (req,res)=>{
    const {firstName, lastName, userName, season, number} = req.body;
    //findOrCreate devuelve un arreglo.
    //arreglo[0] se aloja el find, y en el arreglo[1] se aloja un booleano que va a informar si se creo o no el registro.

    try{
        const [player, created] = await Player.findOrCreate({
            where: { userName },
            defaults: {
                firstName, lastName, userName, season, number
            }
        });
        res.json({player,created});
    }catch (e) {
        res.send(e);
    }
})
server.post('/team',async (req,res)=>{
    try{
        const {name} = req.body;
        const newTeam = await Team.create({
            name
        });
        res.json(newTeam.toJSON());
    }catch (e) {
        res.send(e);
    }

})
server.put('/players', async (req,res)=>{
    //esto es un UPDATE "Players" SET number WHERE firstName = "Augusto";
    //Update devuelve la cantidad de registro modificados.
    try{
        const response = await Player.update(
            {number: 10},
            {
                where:{
                    firstName: "Augusto"
                }
            }
        );
        res.send(`${response} jugadores modificados.`);
    }catch (e) {
        res.send(e);
    }
})
server.delete('/player/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        //El Model.destroy devuelve la cantidad de elementos elminados.
        let deleted = await Player.destroy({
            where: {
                id
            }
        });
        res.json(deleted);

    }catch (e) {
        res.send(e);
    }
})
server.put('/transfer/:id', async (req,res)=>{

    //set este overwrites,
    //add este agrega.
    const {id} = req.params;
    let player = await Player.findByPk(id);
    res.json(await player.addTeams([1,2,3]));

})

server.get('/loadAll',async (req,res)=>{
    const allData = await Player.findAll({
        include: Team
    });
    res.json(allData);

    // const allData = await Player.findAll({
    //     include: [
    //         {
    //             model: Team,
    //             attributes: ['firstName','lastName', 'name'],
    //             through: {
    //                 attributes: []
    //             }
    //         }
    //     ]
    // })
})

server.listen(3000, () => {
    console.log('Servidor funcionando correctamente.');
    db.sync({force: false});
});