const Cube = require('../models/Cube');

function createCube(data, userId) {
    let cube = new Cube({ ...data, creator: userId });

    return cube.save();
}

function getById(cubeId) {
    return Cube.findById(cubeId).lean();
}

function getByIdwithAccessorires(cubeId) {
    return Cube.findById(cubeId).populate('accessories').lean();
}

async function getAll(query) {
    let cubes = await Cube.find({
        ...(query.search && { name: { $regex: query.search, $options: 'i' } }),
        ...((query.from || query.to) && {
            difficultyLevel: {
                ...(query.from && { $gte: Number(query.from) }),
                ...(query.to && { $lte: Number(query.to) })
            },
        })
    }).lean();

    return cubes;
}


module.exports = {
    getAll,
    getById,
    createCube,
    getByIdwithAccessorires
};