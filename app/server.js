const express= require('express')
const path=require('path')
const config = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const port=3000
const app= express()
const cors= require('cors');
app.use(cors);

mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const {
  Hospital,
  TreatmentType,
  MachineType,
  MachineProtocol,
  PreventiveMaintenance,
  PhotonFF,
  PhotonFFF,
  Electron,
  BrachySource,
  MachineModel
} = require('./models/sample');

const lop= require('./models/Machine');

app.post('hello',(req,res)=>{
  res.send("hello");
})

app.get('/api/hospitals', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    console.log(hospitals)
    res.status(200).send(hospitals);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/treatmentTypes', async (req, res) => {
  try {
    const treatmentTypes = await TreatmentType.find();
    res.status(200).send(treatmentTypes);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/machineTypes', async (req, res) => {
  try {
    const machineTypes = await MachineType.find();
    res.status(200).send(machineTypes);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/machineProtocols', async (req, res) => {
  try {
    const machineProtocols = await MachineProtocol.find();
    res.status(200).send(machineProtocols);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/preventiveMaintenances', async (req, res) => {
  try {
    const preventiveMaintenances = await PreventiveMaintenance.find();
    res.status(200).send(preventiveMaintenances);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/photonFFs', async (req, res) => {
  try {
    const photonFFs = await PhotonFF.find();
    res.status(200).send(photonFFs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/photonFFFs', async (req, res) => {
  try {
    const photonFFFs = await PhotonFFF.find();
    res.status(200).send(photonFFFs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/electrons', async (req, res) => {
  try {
    const electrons = await Electron.find();
    res.status(200).send(electrons);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/brachySources', async (req, res) => {
  try {
    const brachySources = await BrachySource.find();
    res.status(200).send(brachySources);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/machineModels', async (req, res) => {
  try {
    const machineModels = await MachineModel.find();
    res.status(200).send(machineModels);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post('/save',(req,res)=>{
    const l= new lop.save(res.body);
})


// const user= require('./routes/user');
// const adminMachine= require('./routes/adminMAchine');
// app.use('/user',user);
// app.use('/admin/',adminMachine);



app.listen(port,(req,res)=>{
    console.log(`Server running on the port ${port}`);
})