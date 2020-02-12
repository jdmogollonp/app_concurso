const express = require('express');
const path = require('path');
const { originalVideosPath } = require('../config');
const {verifyToken} = require('../libraries/jwt')
const ContestsService = require('../services/contests');
const ContestantsService = require('../services/contestants');
const VideosService = require('../services/videos');

const contestsApi = (app) => {
    const router = express.Router();
    app.use('/api/contests', router);

    const contestsService = new ContestsService();
    const contestantsService = new ContestantsService();
    const videosService = new VideosService();
    // Updates an event
    router.put('/edit/:id', verifyToken, async (req, res) => {
        try {
            const idadmin = req.decodedToken.sub
            const { id } = req.params;
            const {name, image, url, start_date, end_date, description} = req.body;
            if (!url || !image || !start_date || !end_date || !description) {
                res.status(400).json({
                    errors: [`Todos los datos son requeridos`]
                });
            // } else if (endDate <= startDate) {
            //     res.status(400).json({
            //         errors: [`La fecha fin debe ser mayor que la fecha inicio`]
            //     });
            } else {
                try {
                    console.log('Prueba put');
                    // const newStartDate = new Date(Number(startDate)).toJSON().slice(0, 19).replace('T', ' ');
                    // const newEndDate = new Date(Number(endDate)).toJSON().slice(0, 19).replace('T', ' ');
                    const contestsId = await contestsService.updateContests(idadmin, id, {name, image, url, start_date, end_date, description});
                    if (contestsId) {
                        res.status(201).json({
                            data: 'El concurso fue actualizado exitosamente '
                        });
                    } else {
                        res.status(400).json({
                            errors: [`Error actualizando el concurso `]
                        });
                    }
                } catch (err) {
                    console.log(err);
                    res.status(400).json({
                        errors: [`Error actualizando el concurso `, err]
                    });
                }
            }
        } catch (error) {
            res.status(400).json({
                errors: [`Error actualizando el concurso `, error]
            });
        }
    });
    router.post('/new',verifyToken, async (req,res)=>{
        try {
            const idadmin = req.decodedToken.sub
            const {name, image, url, start_date, end_date, description} = req.body ;
            if (!url || !image || !start_date || !end_date || !description) {
                res.status(400).json({
                    errors: [`Todos los datos son requeridos`]
                });
            } else {
                // COMO SE MANEJAN LOS TIMESTAMPS DESDE EL FRONTEND (?)
                // Por que gabriel les hace una conversion antes de enviarlos al database?
                // hasta el momento, para pruebas desde postman, enviar start_date y end_date con
                // el formato 2008-01-01 00:00:01
                const contestId = await contestsService.createContest(idadmin, {name, image, url, start_date, end_date, description});
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
    router.post('/:url/videos', async (req, res) => {
        try {
            const { url } = req.params;
            const { name, lastName, message, email } = JSON.parse(req.body.data);
            const videoFile = req.files.file;
            if (!videoFile || !name || !lastName || !message || !email || !url) {
                return res.status(400).json({
                    errors: [`Todos los campos son requeridos`]
                });
            }
            const contest = await contestsService.getContestByUrl(url);

            if (!contest) {
                return res.status(404).json({
                    errors: [`No existe el concurso especificado`]
                });
            }

            const currentDate = new Date();
            if (new Date(contest.start_date).getTime() > currentDate) {
                return res.status(400).json({
                    errors: [`Todavía no es posible participar en el concurso`]
                });
            }

            if (new Date(contest.end_date) < currentDate) {
                return res.status(400).json({
                    errors: [`El concurso ha finalizado`]
                });
            }

            const contestantId = await contestantsService.createOrUpdateContestant(email, name, lastName);
            const videoFileName = `${originalVideosPath}/${url}_${new Date().getTime()}${path.extname(videoFile.name)}`
            videoFile.mv(`${__dirname}/../${videoFileName}`).then(async () => {
                await videosService.createVideo(contest.id, contestantId, videoFileName, message);
                res.status(201).json({
                    data: `Hemos recibido tu video y lo estamos procesado para que sea publicado. Tan pronto el video quede publicado en la página del concurso te notificaremos por email.`
                });
            }).catch(error => {
                console.log(error);
                res.status(400).json({
                    errors: [`Error subiendo el video`, error]
                });
            });
        } catch (error) {
            res.status(400).json({
                errors: [`Error cargando el video`, error]
            });
        }
    });


};

module.exports = contestsApi;
