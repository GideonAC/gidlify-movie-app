"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class MoviesInstance extends sequelize_1.Model {
}
exports.MoviesInstance = MoviesInstance;
MoviesInstance.init({
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        unique: false
    },
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUIDV4
    }
}, { sequelize: database_config_1.default, tableName: 'movies' });
