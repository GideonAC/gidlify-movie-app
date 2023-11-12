import { DataTypes, Model } from "sequelize";
import db from '../config/database.config';
import { MoviesInstance } from "./moviesModel";


export interface UserAtrributes{
    id: string,
    fullname: string,
    username: string,
    email: string,
    password: string
}

export class UserInstance extends Model <UserAtrributes> {}

UserInstance.init({

    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: true, //false,
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: true, //false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{sequelize: db, tableName: 'user'}
)

UserInstance.hasMany(MoviesInstance, {foreignKey: 'userId', as: 'movies'})
MoviesInstance.belongsTo(UserInstance, {foreignKey: 'userId', as: 'user'})
