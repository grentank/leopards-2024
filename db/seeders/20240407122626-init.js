/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs/promises");

module.exports = {
  async up(queryInterface, Sequelize) {
    const words = await fs.readFile(
      path.join(__dirname, "../../words.txt"),
      "utf-8"
    );
    const wordsArray = words
      .split("\n")
      .map((word) => ({ word, createdAt: new Date(), updatedAt: new Date() }));

    // await queryInterface.bulkInsert("Words", wordsArray, {});

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Alex",
          email: "alex@alex",
          password: await bcrypt.hash("123", 11),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          title: "First post",
          body: "This is the first post",
          img: null,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Second post",
          body: "This is the second post",
          img: null,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Third post",
          body: "This is the third post",
          img: null,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
