module.exports = (sequelize, DataTypes) => {
  const Leaderboard = sequelize.define('Leaderboard', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.STRING,
    game: DataTypes.STRING,
    score: DataTypes.INTEGER
  });

  return Leaderboard;
};
