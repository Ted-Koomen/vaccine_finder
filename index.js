const express = require('express');
const cron = require('node-cron');
const axios = require('axios');
const Twilio = require('twilio');
const { parse } = require('node-html-parser');

const app = express();

const accountSid = ACCOUNT_SID_FROM_TWILIO,
    authToken = AUTH_TOKEN_FROM_TWILIO

const twilioClient = new Twilio(accountSid, authToken)
const fetchVaccine = async () => {
    try {
        const response = await axios.get(URL_FOR_VACCINE_SCHEDULER)

        return response.data
    } catch (e) {
        throw new Error(e)
    }
}

const shouldSendMessage = data => {
    // if found condition, return true, else false
}


const parseVaccineData = (htmlData) => parse(htmlData)

const task = cron.schedule('* * * * *', async () => {
    // In case of NY State, data was html
    const vaccineData = await fetchVaccine()
    
    // build map of html into JavaScript object
    const parsedData = parseVaccineData(vaccineData)

    // find condition to alert Twilio

    if (shouldSendMessage(parsedData)) {
        twilioClient.messages.create({
            body: "Vaccine is available",
            to: RECIPIENT_NUMBER,
            from: NUMBER_THAT_TWILIO_GIVES_YOU
        })
    }
});

task.start();

app.listen(8080, () => console.log('Listening on 8080'))