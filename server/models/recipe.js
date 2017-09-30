module.exports = (sequelize, DataType) => {
    const Recipe = sequelize.define("Recipe", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        upVote: {
            type: DataType.INTEGER,
            defaultValue: 0
        },
        downVote: {
            type: DataType.INTEGER,
            defaultValue: 0
        }
    }, {
        classMethods: {
            associate: (models) => {
                Recipe.belongsTo(models.Users {
                    foreignKey: 'userId',
                });
                Recipe.hasMany(models.Review {
                    foreignKey: 'recipeId',
                    as: 'reviews',
                });
            }
        }
    });
    return Recipe;
};