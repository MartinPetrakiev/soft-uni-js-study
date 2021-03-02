const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

function create(data) {
    let accessory = new Accessory(data);

    return accessory.save();
}

async function deleteCube(id) {
    let cube = await Cube.deleteOne({_id: {$eq: id}});
}

async function editCube(id, data) {
    let cube = await Cube.updateOne({_id: {$eq: id}}, data);
}

async function getAll() {
    let accessories = await Accessory.find().lean();

    return accessories;
}

async function getAllUnattached(ids) {
    let accessories = await Accessory.find({_id: {$nin: ids}}).lean();

    return accessories;
}

async function attach(cubeId, accessoryId) {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);
    cube.accessories.push(accessory); 
    return cube.save();
}


module.exports = {
    create,
    getAll,
    attach,
    getAllUnattached,
    deleteCube,
    editCube
};