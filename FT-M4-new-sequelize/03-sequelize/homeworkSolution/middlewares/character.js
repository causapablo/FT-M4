const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post("/", async (req, res)=>{
    const {code, name, age, race, hp,mana, date_added}= req.body
    if(!code || !name ||!hp|| !mana) return res.status(404).send("Falta enviar datos obligatorios")
    try {
        let char={code, name, age, race, hp,mana, date_added}
        let newCharacter= await Character.create(char)
        res.status(201).send(newCharacter)
    } catch (error) {
        res.status(404).send("Error en alguno de los datos provistos")
    }
    
})

router.get("/", async(req, res)=>{
    const {race, age}=req.query
    try {
        let chars
        if(!race){
            chars= await Character.findAll()            
        }else if(!age){
            chars= await Character.findAll({where:{race}})            
        }else{
            chars= await Character.findAll({where:{race,age}})
        }
        
        res.send(chars)
    } catch (error) {
        console.log(error)
    }
})

// "/character/asdasda"
router.get("/young",(req,res)=>{
    Character.findAll({
        where:{
            age:{[Op.lt]: 25}
        }
    }).then(response=>res.send(response))
    .catch(e=>res.status(404).send(e))
})

router.get("/roles/:code",async(req, res)=>{
    const {code}= req.params
try {
    let char= await Character.findOne({  //{where,include}
        where:{code},
        include: Role
    })
    res.send(char)
} catch (error) {
    res.status(404).send(error)
}
})

router.get("/:code", (req, res)=>{
    const {code}= req.params
    Character.findByPk(code)
    .then(response=>{
        if(!response) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
        res.send(response)
    })
    .catch(e=>console.log(e))
})

router.put("/addAbilities", async(req,res)=>{
    const {codeCharacter,abilities}= req.body
    try {
        let char= await Character.findByPk(codeCharacter)
        let arrPromises= abilities.map(elem=>char.createAbility(elem))
        await Promise.all(arrPromises)
        res.send("Abilities added")
    } catch (error) {
        res.status(404).send(error)
    }
})

router.put("/:attribute",async (req,res)=>{
    const {attribute}= req.params
    const {value}=req.query
try {
    await Character.update({[attribute]: value},{
        where:{
            [attribute]:null
        }
    })
    res.send('Personajes actualizados')
} catch (error) {
    res.status(404).send(error)
}


})


module.exports = router;