const persimon = require('../../utils/persimon');
const db= persimon('/assets/boards.json'); 


const getAll = (req, res) => {
    const boards = db.all();
    return res.status(200).json(boards);
};

const getOne = (req, res) => {
    const board = db.get(req.params.id);
    return res.status(200).json(board);
};

const create = (req, res) => {
    const board = db.create(req.body);
    return res.status(200).json(board);
};

const update = (req, res) => {
    const board = db.update(req.params.id, req.body);
    return res.status(200).json(board);
};

const remove = (req, res) => {
    const board = db.delete(req.params.id);
    return res.status(200).json(board);
};

module.exports = {
    getAll,
    getOne,
    update,
    remove,
    create,
};