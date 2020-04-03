const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');


const User = require('./models/User');


const run = async () =>{
    await mongoose.connect(config.database, config.options);
    const connection = mongoose.connection;
    const collections = await connection.db.collections();

    for (let collection of collections){
        await collection.drop();
    }

    await User.create(
        {fullName: 'Adil', username: 'adil', password: 'adil123', role: 'moderator', token: nanoid()},
        {fullName: 'Nurik', username: 'nurik', password: 'nurik123', role: 'user', token: nanoid()}
    );

    await connection.close();
};

run().catch(e=> {
    console.error(e)
});