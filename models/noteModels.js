const Notes = require("../schema/Notes");

const findAll = async () => {
  return await Notes.findAll({
    attributes: ["id", "judul", "isi", "tanggal_dibuat"],
  });
};

const create = async (NotesData) => {
  return await Notes.create(NotesData);
}

const findById = async (id) => {
  return await Notes.findByPk(id, {
    attributes: ["id", "judul", "isi", "tanggal_dibuat"],
  });
}

const updateById = async (id, NotesData) => {
  return await Notes.update(NotesData, {
    where: {
      id: id,
    },
  });
}

const deleteById = async (id) => {
  return await Notes.destroy({
    where: {
      id: id,
    },
  });
}

module.exports = {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
};
