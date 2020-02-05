const express = require('express');
const AdministratorsService = require('../services/administrators');
const bcrypt = require('bcrypt');
const { signToken } = require('../libraries/jwt');

const authApi = (app) => {
    const router = express.Router();
    app.use('/api/auth', router);

    const administratorsService = new AdministratorsService();

    router.post('/signUp', async (req, res) => {
        try {
            const { email, password, name, lastName } = req.body;
            if (!email || !password || !name || !lastName) {
                res.status(400).json({
                    errors: [`Todos los datos son requeridos`]
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const administratorId = await administratorsService.createAdministrator(email.toLowerCase(), hashedPassword, name, lastName);
                if (administratorId) {
                    res.status(201).json({
                        data: 'Cuenta creada exitosamente'
                    });
                } else {
                    res.status(400).json({
                        errors: [`Error creando la cuenta`]
                    });
                }
            }
        } catch (error) {
            res.status(400).json({
                errors: [`Error creando la cuenta`, error]
            });
        }
    });

    router.post('/signIn', async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({
                    errors: [`El correo y la contraseña son requeridos`]
                });
            } else {
                const administrator = await administratorsService.getAdministrator(email.toLowerCase());
                if (administrator) {
                    if (await bcrypt.compare(password, administrator.password)) {
                        delete administrator.password;
                        res.json({
                            data: signToken({ sub: administrator.id, email: administrator.email, name: administrator.name, lastName: administrator.last_name })
                        });
                    } else {
                        res.status(400).json({
                            errors: [`Credenciales inválidas`]
                        });
                    }
                } else {
                    res.status(400).json({
                        errors: [`Credenciales inválidas`]
                    });
                }
            }
        } catch (error) {
            res.status(400).json({
                errors: [`No fue posible iniciar sesión`, error]
            });
        }
    });
};

module.exports = authApi;