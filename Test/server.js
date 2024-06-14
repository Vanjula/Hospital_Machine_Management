const express = require('express');
const path = require('path');
const config = require('./config/database');
const bodyParser = require('body-parser');

const expressMessages = require('express-messages');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;
const app = express();
const multer = require('multer');
const passport = require('passport');


app.use(cors()); // Fixed middleware usage
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});


// Express session middleware
app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, 
    },
}));


require('./config/passport')(passport); // Assuming your Passport configuration is in 'config/passport.js'

// ... other server setup code ...

app.use(passport.initialize());
app.use(passport.session());

// Express messages middleware
app.use((req, res, next) => {
  res.locals.messages = expressMessages(req, res);
  next();
});



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


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

const Machine = require('./models/Machine');

// Corrected route definition
app.get('/hello', (req, res) => {
  res.send("hello");
});

// Changed POST to GET for fetching data
app.get('/api/hospitals', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).send(hospitals);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/treatmentTypes', async (req, res) => {
  try {
    const treatmentTypes = await TreatmentType.find();
    res.status(200).send(treatmentTypes);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/machineTypes', async (req, res) => {
  try {
    const machineTypes = await MachineType.find();
    res.status(200).send(machineTypes);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/machineProtocols', async (req, res) => {
  try {
    const machineProtocols = await MachineProtocol.find();
    res.status(200).send(machineProtocols);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/preventiveMaintenances', async (req, res) => {
  try {
    const preventiveMaintenances = await PreventiveMaintenance.find();
    res.status(200).send(preventiveMaintenances);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/photonFFs', async (req, res) => {
  try {
    const photonFFs = await PhotonFF.find();
    res.status(200).send(photonFFs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/photonFFFs', async (req, res) => {
  try {
    const photonFFFs = await PhotonFFF.find();
    res.status(200).send(photonFFFs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/electrons', async (req, res) => {
  try {
    const electrons = await Electron.find();
    res.status(200).send(electrons);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/brachySources', async (req, res) => {
  try {
    const brachySources = await BrachySource.find();
    res.status(200).send(brachySources);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/machineModels', async (req, res) => {
  try {
    const machineModels = await MachineModel.find();
    res.status(200).send(machineModels);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/save', upload.fields([{ name: 'vault_approval_document' }, { name: 'license_document' }]), (req, res) => {
  console.log(req.body);

  // Create a copy of req.body to add file buffers
  const machineData = { ...req.body };

  // Check if files exist before accessing their properties
  if (req.files && req.files['vault_approval_document']) {
    machineData.vault_approval_document = req.files['vault_approval_document'][0].buffer;
  } else {
    machineData.vault_approval_document = null; // or handle accordingly if needed
  }

  if (req.files && req.files['license_document']) {
    machineData.license_document = req.files['license_document'][0].buffer;
  } else {
    machineData.license_document = null; // or handle accordingly if needed
  }

  // Log machineData to verify its structure before saving
  console.log('Machine Data:', machineData);

  // Create a new Machine instance with the combined data
  const machine = new Machine(machineData);

  // Save the machine instance to the database
  machine.save()
    .then(result => res.status(201).send(result))
    .catch(error => {
      console.error('Error saving document:', error); // Log the detailed error
      res.status(500).send(error);
    });
});

const user = require('./routes/user');
app.use("/api/auth",user);

const Machine1 = require('./routes/admin');
app.use("/api/Machine",Machine1);


app.listen(port, () => {
  console.log(`Server running on the port ${port}`);
});
