import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
const IST_TimezoneOffset = 330 * 60000
const serverTimezoneOffset = new Date().getTimezoneOffset()

// ----------- Customized timelogger created by Sajeethan ----------- //
const timeLogger = (incident= 'Logged at', noLogs = false, logLength = 110) => {
    let IST_CurrentTime = new Date(new Date() - serverTimezoneOffset + IST_TimezoneOffset)
    let formattedDateArray = IST_CurrentTime.toString().split(' ')
    let formattedDate = `on ${formattedDateArray[1]} ${formattedDateArray[2]}, ${formattedDateArray[3]} ${formattedDateArray[0]} at ${formattedDateArray[4]}.${IST_CurrentTime.getMilliseconds()} IST [GMT(+05:30)]`
    let wordCount = `${incident} ${formattedDate}`.length
    let DashCount = (logLength - wordCount - 4)/2
    noLogs != true && console.log(`${'-'.repeat(DashCount)}>`,`${incident} ${formattedDate}`,`<${'-'.repeat(DashCount)}`)
    return ({
        milli: IST_CurrentTime.getMilliseconds(),
        date: IST_CurrentTime.getDate(),
        year: IST_CurrentTime.getFullYear(),
        month: IST_CurrentTime.getMonth(),
        min: IST_CurrentTime.getMinutes(),
        hour: IST_CurrentTime.getSeconds(),
        Date: IST_CurrentTime.getDate(),
    })
}

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.listen(3302, () => {
    console.log("npatel-services is listening to port 3302 for node services.")
    timeLogger('Server Started')
})

app.get('/test', async (req, res) => {
    try {
        // res.setHeader('Content-type', 'text/html')
        res.send(`<html><body><h1>Welcome to NPATEL Lobby via test port and endpoint ${req.url} with ${req.method} method!</h1></body></html>`)
        // res.end()
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})