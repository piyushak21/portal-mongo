export const getVehicle = (req, res) => {
  const { vehicle_id } = req.params;
  const collection = client.db('your_database_name').collection('vehicle_master');

  collection.findOne({ vehicle_id }, (err, data) => {
    if (err) {
      res.status(500).send({ ErrorIdGet: err });
    } else {
      res.status(200).send({ IdData: data });
    }
  });
};

// (*) Upcoming Update