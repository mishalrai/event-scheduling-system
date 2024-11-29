import { Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize( process.env.DATABASE_URL || '', {
    dialect: 'postgres',
    logging: false
})


( async()=>{
    try {
        await sequelize.authenticate();
        console.log('Database connected Successfully.');
    }catch( error){
        console.log('Unable to connect to the database: ', error);
    }
})

export default sequelize;