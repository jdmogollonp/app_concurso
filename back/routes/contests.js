const express = require('express');
const path = require('path');
const { originalVideosPath } = require('../config');
const ContestsService = require('../services/contests');
const ContestantsService = require('../services/contestants');
const VideosService = require('../services/videos');

const contestsApi = (app) => {
    const router = express.Router();
    app.use('/api/contests', router);

    const contestsService = new ContestsService();
    const contestantsService = new ContestantsService();
    const videosService = new VideosService();

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

            const contestantId = await contestantsService.createContestant(email, name, lastName);
            if (!contestantId) {
                return res.status(400).json({
                    errors: [`Se presentó un problema creando la participación`]
                });
            }
            const videoFileName = `${originalVideosPath}/${url}_${new Date().getTime()}${path.extname(videoFile.name)}`
            videoFile.mv(`${__dirname}/../../${videoFileName}`).then(async () => {
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