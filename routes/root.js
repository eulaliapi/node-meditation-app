import express from 'express';
const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
    res.json({
        "message": "Welcome to the Meditation App backend"
    })
});

export default rootRouter;