const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();
router.post('/', async (req,res)=>{
    const {name, mana_cost} = req.body;
    if(!name || !mana_cost) return res.status(404).send("Falta enviar datos obligatorios");
    try{
      
      const newAbility = await Ability.create({
        name,
        mana_cost
      });
      res.status(201).json(newAbility);
    }catch(e){
      res.status(404).send(e);
    }
  
  })
module.exports = router;