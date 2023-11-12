"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const moviesModel_1 = require("./moviesModel");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize: database_config_1.default, tableName: 'user' });
UserInstance.hasMany(moviesModel_1.MoviesInstance, { foreignKey: 'userId', as: 'movies' });
moviesModel_1.MoviesInstance.belongsTo(UserInstance, { foreignKey: 'userId', as: 'user' });
