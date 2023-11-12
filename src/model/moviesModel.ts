import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'



export interface MoviesAtrributes{
    title: string,
    description: string,
    image: string,
    price: number,
    id: string,
    userId?: string
}

export class MoviesInstance extends Model <MoviesAtrributes> {
    userId: any;
}

MoviesInstance.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },

    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: false
    },

    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    userId:{
        type: DataTypes.UUIDV4
    }
},
{sequelize: db, tableName: 'movies'}
)
