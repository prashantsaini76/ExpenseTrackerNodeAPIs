const {format} = require('date-fns');

const { v4: uuid} = require('uuid')  // importing v4 as uuid alias

const fs = require('fs');

const fsPromises = require('fs').promises

const path = require('path');

const logEvents = async (message, logFileName) =>{ 

    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{

        if(!fs.existsSync(path.join(__dirname,'..','logs'))) {
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..','logs',logFileName),logItem);

    }catch(error){
        console.error(error);
    }


   

}

const logger = (req, res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`LOGGER ${req.method} ${req.path}`)
    next();
}

module.exports= {logger,logEvents}
