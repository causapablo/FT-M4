const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();
router.post('/', async (req, res) => {
    const { code, name, age, race, hp, mana, date_added } = req.body;
    if (!code || !name || !hp || !mana) return res.status(404).send('Falta enviar datos obligatorios');
    try {
        const newCharacter = await Character.create({ code, name, age, race, hp, mana, date_added });
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(404).send("Error en alguno de los datos provistos");
    }

});
router.get('/', async (req, res) => {
    const { name, hp } = req.query;
    if (name && hp) {
        try {
            const characters = await Character.findAll({
                attributes: ['name', 'hp']//Acá lo que hacemos es traer solo las columnas que queremos.
            });

            res.status(200).send(characters);
        } catch (e) {
            res.status(400).send(e);
        }
    } else {
        try {
            const characters = await Character.findAll();
            res.status(200).send(characters);
        } catch {
            res.status(400).send('Error');
        }
    }
});
router.get('/', async (req, res) => {
    const { race, age } = req.query;
    try {
        const characters = await Character.findAll({
            where: {
                race
            },
            attributes: ['code', 'name', 'hp', 'race']
        });

        res.status(200).send(characters);
    } catch (error) {
        console.log(error);
        res.send(e);
    }


})
module.exports = router;