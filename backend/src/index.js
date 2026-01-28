const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const v1Routes = require('./routes/index');
const dbConnect = require('./config/db');
// const requestOrgan = require('./repository/requestOrganRepo');

setUpAndStartServer = () => {

    dbConnect();
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',v1Routes)

    app.listen(PORT , async()=> {
        console.log("Server started on PORT ",PORT);

        // const requestOrganRepo = new requestOrgan
        // const requestedOrgans = await requestOrganRepo.findAllByHospitalId("6978f7ff8c53a81c5cd6adaa");

    })
}

setUpAndStartServer();