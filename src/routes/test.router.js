import express from 'express';

const testRouter = express.Router();

testRouter.get('/', (req, res) => {
    res.render('TestPage', { title: 'Test Page' });
});



export default testRouter;