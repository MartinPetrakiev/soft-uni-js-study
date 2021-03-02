const database = require('../config/database.json');
const fs = require('fs/promises');
const path = require('path');

class Model {
    save() {
        database.push(this);

        const filePath = path.normalize(path.join(__dirname, '../config/database.json'));
    
        return fs.writeFile(filePath, JSON.stringify(database));
    }
    
    static getAll() {
        return database;
    }

    static getById(cubeId) {
        return database.find(x => x.id === cubeId);
    }
}

module.exports = Model;