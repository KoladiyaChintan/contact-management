import { Sequelize } from 'sequelize-typescript';
import { ContactList } from '../entities/contact-list.entity';
import { UserRegister } from '../entities/create-user.entity';
import { UserSession } from '../entities/user-session.entity';
import { UserVerify } from '../entities/user-verify.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        password: process.env.DATABASE_PASSWORD,
        username: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        logging: false,
        pool: {
          max: 100,
          min: 0,
          acquire: 30000,
          idle: 5000,
        },
      });

      sequelize.addModels([ContactList, UserRegister, UserSession, UserVerify]);

      await sequelize.sync({ force: false });

      return sequelize;
    },
  },
];
