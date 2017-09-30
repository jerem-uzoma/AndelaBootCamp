module.exports = (sequelize, DataType) => {
    const Review = sequelize.define("Review", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
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
        }
    }, {
        classMethods: {
            associate: (models) => {
                Review.belongsTo(models.Recipe {
                    foreignKey: 'recipeId',
                    onDelete: 'CASCADE',
                });
            }
        }
    });
    return Review;
};