// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const generateHash = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed;
    let h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
// appointer = To whom appointment email is sent
// appointee = Person who needs the appointment
// 200 = success
// 300 = pending
// 404 = rejected
const admin = require('firebase-admin');
admin.initializeApp();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bookappointment00@gmail.com',
        pass: '',
    },
});
exports.updateAppointment = functions.https.onRequest(async (req, res) => {
    const id = req.query.id;
    const status = req.query.status;
    const collection = admin.firestore().collection('appointmentsEntry');
    try {
        const docSnapshot = await collection.where('id', '==', Number(id)).get();
        if (!docSnapshot.empty) {
            docSnapshot.forEach((doc, index) => {
                if ((doc.data().clicked === 'false' || !doc.data().clicked) && index === 0) {
                    docSnapshot.docs[0].ref.update({ status, clicked: true });
                    res.json({ result: `Success!` });
                    return;
                }
            });
        }
        else {
            res.json({ result: `Failed!` });
        }
    }
    catch (err) {
        res.json({ result: `Failed!` });
        console.error('Error from updateAppointment', err);
    }
});
exports.getAppointments = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const appointeeEmail = req.query.appointeeEmail;
        admin.firestore().collection('appointmentsEntry').get().then(response => {
            const data = [];
            !response.empty && response.forEach(doc => {
                const item = doc.data();
                if (item.appointeeEmail === appointeeEmail) {
                    data.push(item);
                }
            });
            res.json(data);
        });
    });
});
exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const dest = req.query.destEmail;
        const destName = req.query.destName;
        const senderName = req.query.senderName;
        const senderEmail = req.query.senderEmail;
        const appointmentTime = req.query.time;
        const hash = generateHash(`${dest}${destName}${senderName}${senderEmail}${appointmentTime}`);
        const mailOptions = {
            from: 'NO_REPLY Book appointment <bookappointment00@gmail.com>',
            to: dest,
            subject: 'Applying for appointment',
            html: `
<p> Hi ${destName}, </p>
<p> My name is ${senderName}. I would like to take a appointment on ${appointmentTime}. <p />
<p style="margin-bottom:3em">Please reply by clicking on below buttons.</p>
<a style="padding:0.5em 1.5em 0.5em 1.5em; text-decoration:none;color: white;background-color: #1373EB;margin-right:1em;" href="http://localhost:5001/book-appointments-37a0e/us-central1/updateAppointment?id=${hash}&status=200&clicked=false"> Yes </a>
<a style="padding:0.5em 1.5em 0.5em 1.5em;background-color: red; text-decoration:none;color: white;" href="http://localhost:5001/book-appointments-37a0e/us-central1/updateAppointment?id=${hash}&status=404&clicked=false"> No </a>
            `,
        };
        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error from transporter', JSON.stringify(error));
                // throw new functions.https.HttpsError( error.code, { message: error.toString() } )
            }
            admin.firestore().collection('appointmentsEntry').add({
                id: hash,
                appointerName: destName,
                appointerEmail: dest,
                appointeeName: senderName,
                appointeeEmail: senderEmail,
                appointmentTime: appointmentTime,
                status: 300,
                clicked: false,
            }).then()
                .catch(err => {
                console.error('Error in adding document appointmentsEntry', err);
                throw new functions.https.HttpsError(err.code, { message: err });
            });
            return res.send('Sent');
        });
    });
});
//# sourceMappingURL=index.js.map
