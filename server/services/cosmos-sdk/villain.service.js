// @ts-check
const client = require('./db');
const { databaseDefName, villainContainer } = require('./config');

const container = client.database(databaseDefName).container(villainContainer);
const captains = console;

async function getVillains(req, res) {
  try {
    const { result: villains } = await container.items.readAll().toArray();
    res.status(200).json(villains);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function postVillain(req, res) {
  const villain = {
    name: req.body.name,
    description: req.body.description
  };
  villain.id = `Villain ${villain.name}`;

  try {
    const { body } = await container.items.create(villain);
    res.status(201).json(body);
    captains.log('Villain created successfully!');
  } catch (error) {
    res.status(500).send(error);
  }
}

async function putVillain(req, res) {
  const villain = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description
  };

  try {
    const { body } = await container.items.upsert(villain);
    res.status(200).json(body);
    captains.log('Villain updated successfully!');
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteVillain(req, res) {
  const { id } = req.params;

  try {
    const { body } = await container.item(id).delete();
    res.status(200).json(body);
    captains.log('Villain deleted successfully!');
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getVillains,
  postVillain,
  putVillain,
  deleteVillain
};
