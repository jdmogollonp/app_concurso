const express = require('express');
const ContestService = require('../services/contest');
const router = express.Router();
const {verifyToken} = require('../libraries/jwt')

const contestService = new ContestService();

router.post('/',verifyToken, async (req,res)=>{
    try {
        const idadmin = req.decodedToken.sub
        const {name, image, url, start_date, end_date, description} = req.body ;
        if (!url || !image || !start_date || !end_date || !description) {
            res.status(400).json({
                errors: [`Todos los datos son requeridos`]
            });
        } else {
            console.log("test1");
            // COMO SE MANEJAN LOS TIMESTAMPS DESDE EL FRONTEND (?)
            // Por que gabriel les hace una conversion antes de enviarlos al database?
            // hasta el momento, para pruebas desde postman, enviar start_date y end_date con
            // el formato 2008-01-01 00:00:01

            const contestId = await contestService.createContest(idadmin, {name, image, url, start_date, end_date, description});
            console.log("test2");
            if (contestId) {
                res.status(201).json({
                    data: 'Concurso creado exitosamente'
                });
            } else {
                res.status(400).json({
                    errors: [`Error creando el concurso`]
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            errors: [`Error creando el concurso`, error]
        });
    }




});



module.exports = router;
