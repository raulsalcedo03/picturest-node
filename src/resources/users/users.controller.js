const persimon = require('../../utils/persimon');
const db= persimon('/assets/users.json'); 
const userModel = require ('./users.model');


const getAll = (req, res) => {
    const users = userModel.all();
    return res.status(200).json(users);
};

const getOne = (req, res) => {
    const user = userModel.get(req.params.id);
    return res.status(200).json(user);
};

const create = (req, res) => {
    const user = userModel.create(req.body);
    return res.status(200).json(user);
};

const update = (req, res) => {
    const user = userModel.update(req.params.id, req.body);
    return res.status(200).json(user);
};

const remove = (req, res) => {
    const user = db.delete(req.params.id);
    return res.status(200).json(user);
};

module.exports = {
    getAll,
    getOne,
    update,
    remove,
    create,
};