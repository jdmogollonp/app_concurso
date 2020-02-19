const express = require('express');
const path = require('path');
const { originalVideosPath, bannerContestsPath } = require('../config');
const { verifyToken } = require('../libraries/jwt')
const ContestsService = require('../services/contests');
const ContestantsService = require('../services/contestants');
const VideosService = require('../services/videos');
// pagination
const paginate = require('jw-paginate');



const contestsApi = (app) => {
  const router = express.Router();
  app.use('/api/contests', router);


  const contestsService = new ContestsService();
  const contestantsService = new ContestantsService
  const videosService = new VideosService();

  // The administrartor Updates a contest
  router.put('/administrartor/contest/edit/:id', verifyToken, async (req, res) => {
    try {
      const idadmin = req.decodedToken.sub
      const { id } = req.params;
      const { name, image, url, start_date, end_date, description } = req.body;
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
          const contestsId = await contestsService.updateContests(idadmin, id, { name, image, url, start_date, end_date, description });
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

  // The administrartor Creatres a contest
  router.post('/administrartor/new/contest', verifyToken, async (req, res) => {
    try {
      const idadmin = req.decodedToken.sub;
      const imageFile = req.files.file;
      const { name, url, start_date, end_date, description } = JSON.parse(req.body.data);
      if (!url || !name || !end_date || !description) {
        res.status(400).json({
          errors: [`Todos los datos son requeridos`]
        });
      }
      const imageFileName = `${url}_${new Date().getTime()}${path.extname(imageFile.name)}`
      imageFile.mv(`${__dirname}/../uploads/images/${imageFileName}`).then(async () => {
        const image = imageFileName
        const contestId = await contestsService.createContest(idadmin, { name, image, url, start_date, end_date, description });
        res.status(201).json({
          data: `Concurso creado exitosamente.`
        });
      }).catch(error => {
        res.status(400).json({
          errors: [`Error creando el concurso`, error]
        });
      });
    } catch (error) {
      res.status(400).json({
        errors: ['Error creando el concurso', error]
      });
    }
  });


  // A user post a new video in the :url contest
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

      const videoFileName = `${originalVideosPath}/${url}_${new Date().getTime()}${path.extname(videoFile.name)}`

      videoFile.mv(`${__dirname}/../../${videoFileName}`).then(async () => {

        await videosService.createVideo(contest.id, videoFileName, message, email, name, lastName);
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



  // Gets the info of a contest
  router.get('/:url', async (req, res) => {
    try {
      const { url } = req.params;
      const contest = await contestsService.getContestByUrl(url);
      if (contest) {
        res.json({
          data: contest
        });
        console.log(contest);
      } else {
        res.status(404).json({
          errors: [`No existe un concurso esa url `]
        });
      }
    } catch (error) {
      res.status(400).json({
        errors: [`Error cargando la informacion del concurso `, error]
      });
    }
  });

  // Gets the info of a video
  // router.get('/:url/videos/:id', async (req, res) => {
  //     try {
  //         const { id, url } = req.params;
  //         const contest = await contestsService.getContestByUrl(url);
  //         const idcontest = contest.id;
  //         const event = await videosService.getVideoInfo(id, idcontest);
  //         if (event) {
  //             res.json({
  //                 data: event
  //             });
  //         } else {
  //             res.status(404).json({
  //                 errors: [`No existe un video en el concurso  con id `]
  //             });
  //         }
  //     } catch (error) {
  //         res.status(400).json({
  //             errors: [`Error cargando el video con id  dentro del concurso `, error]
  //         });
  //     }
  // });

  // The admin gets all the videos information with the correspondent contestant information from :url contest
  router.get('/:url/videos', async (req, res, next) => {
    try {
      const { url } = req.params;
      const contest = await contestsService.getContestByUrl(url);
      const idcontest = contest.id;
      const events = await videosService.getVideosContestantAdmin(idcontest);
      // get page from query params or default to first page
      const page = parseInt(req.query.page) || 1;
      // get pager object for specified page
      const pageSize = 2;
      const pager = paginate(events.length, page, pageSize);
      // get page of videos from videos array
      const pageOfVIdeos = events.slice(pager.startIndex, pager.endIndex + 1);
      // return pager object and current page of videos
      // return res.json({ pager, pageOfVIdeos });
      res.json({
        data: pageOfVIdeos,
        pager: pager
      });
    } catch (error) {
      res.status(404).json({
        errors: ['Error cargando los videos', error]
      });
    }
  });

  // Gets all the videos information with the correspondent contestant information from :url contest
  router.get('/:url/videos/users', async (req, res, next) => {
    try {
      const { url } = req.params;
      const contest = await contestsService.getContestByUrl(url);
      const idcontest = contest.id;
      const events = await videosService.getVideosContestantUser(idcontest);
      console.log(events);
      // get page from query params or default to first page
      const page = parseInt(req.query.page) || 1;
      // get pager object for specified page
      const pageSize = 2;
      const pager = paginate(events.length, page, pageSize);
      // get page of videos from videos array
      const pageOfVIdeos = events.slice(pager.startIndex, pager.endIndex + 1);
      // return pager object and current page of videos
      // return res.json({ pager, pageOfVIdeos });
      console.log(pager);
      res.json({
        data: pageOfVIdeos,
        pager: pager
      });
    } catch (error) {
      res.status(404).json({
        errors: ['Error cargando los videos', error]
      });
    }
  });

  // Get all contests
  router.get('/administrartor/all', verifyToken, async (req, res) => {
    
    try {
      const contests = await contestsService.getContests()
      if (contests) {
        res.status(200).json({
          data: contests
        });
      } else {
        res.status(404).json({
          errors: [`No existen concursos `]
        });
      }
    } catch (error) {
      res.status(404).json({
        errors: ['Error cargando los concursos', error]
      });
    }

  });

  router.delete('/administrator/delete/:idcontest', verifyToken, async (req, res) => {
    const idadmin = req.decodedToken.sub;
    const { idcontest } = req.params;
    try {
      const contests = await contestsService.deleteContest(idadmin, idcontest)
      if (contests) {
        res.status(200).json({
          data: contests
        });
      } else {
        res.status(404).json({
          errors: [`No se pudo borrar el concurso `]
        });
      }
    } catch (error) {
      res.status(404).json({
        errors: ['Error borrando los concursos', error]
      });
    }

  });

  // Gets contestant info
  router.get('/:url', async (req, res) => {
    try {
      console.log('Esta pidiendo info de concuros');
      const { url } = req.params;
      const { id } = req.body
      const idcontestant = await contestService.getIdContestByUrl(url)
      const contestant = await contestantsService.getcontestant(url, id);
      if (contestant) {
        res.json({
          data: contestant
        });
      } else {
        res.status(404).json({
          errors: [`No existe un Participante con esa id en ese concurso `]
        });
      }
    } catch (error) {
      res.status(400).json({
        errors: [`Error cargando la informacion del participante `, error]
      });
    }
  });

  router.post('/administrator/upload-image/:idcontest', verifyToken, async (req, res) => {
    const idadmin = req.decodedToken.sub;
    const { idcontest } = req.params;
    const ImageFiles = req.files.image
    const ImageFileName = `${new Date().getTime()}${path.extname(ImageFiles.name)}`
    ImageFiles.mv(`${__dirname}/../uploads/images/${ImageFileName}`).then(async () => {
      //console.log(req.files)
      try {
        const contests = await contestsService.uploadImage(idadmin, idcontest, ImageFileName)

        if (contests) {
          res.status(200).json({
            data: contests
          });
        } else {
          res.status(404).json({
            errors: [`No existe un concurso con ese id`]
          });
        }
      } catch (error) {
        res.status(404).json({
          errors: ['Error subiendo la imagen al concurso', error]
        });
      }
    })
  });



};

module.exports = contestsApi;
