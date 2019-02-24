const bill = require('../../models/bill.model');

/* twilio sms */
const accountSid = 'AC28450f228c786965296fbd2cb991c3a2';
const authToken = '03d8a35f4d0ad4b7b8d55bc953debc09';
const client = require('twilio')(accountSid, authToken);

/* get all bill information */
let getAllBills = (req, res) => {
    bill.find({}, function (err, data) {
        if (err) {
            res.status(403).json({ msg: "something bad", err })
        }
        else {
            res.status(200).json({ msg: "member record fetched successfully", data: data })
        }
    })
}

module.exports.getAllBills = getAllBills;

/* get by id */
let getByID = (req, res) => {
    bill.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(403).json({ msg: "something bad", err })
        }
        else {
            res.status(200).json({ msg: "member record fetched successfully", data: data })
        }
    })
}

module.exports.getByID = getByID;

/* save new bill information */
let addBill = (req, res) => {
    if (req && !req.body) {
        return res.status(403).json({ msg: "Please provide bill details" })
    }
    var billObj = new bill(req.body);
    billObj.save(function (err, data) {
        if (err) {
            res.status(403).json({ msg: "something bad", err: err })
        }
        else {
            client.messages
                .create({
                    body: '!!!! Testing !!!! Your order information Ref#: ' + data._id + ' Name: ' + req.body.customerName + '. From uBreakiFix © Kaene Soft, Inc.',
                    from: '+17123508797',
                    to: '+14027130782',
                    // 4027130782
                    // + req.body.phoneNumber
                })
                .then(message => {
                    console.log(message.sid);
                });
            res.status(200).json({ msg: "Bill record saved successfully", data: data })
        }
    });
    // options = { upsert: true, new: true, setDefaultsOnInsert: true };
}

module.exports.addBill = addBill;

/* update bill with new information */
let updateBill = (req, res) => {
    if (req && !req.body) {
        return res.status(403).json({ msg: "Please provide bill details" })
    }
    bill.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, function (err, data) {
        if (err) {
            res.status(403).json({ msg: "something bad", err: err })
        }
        else {
            client.messages
                .create({
                    body: '!!!! Testing !!!! Your order information updated Ref#: ' + data._id + ' Name: ' + req.body.customerName + ' Order Status: ' + req.body.status + '. From uBreakiFix © Kaene Soft, Inc.',
                    from: '+17123508797',
                    to: '+1' + req.body.phoneNumber,
                    // 4027130782
                })
                .then(message => {
                    console.log(message.sid);
                });
            res.status(200).json({ msg: "Bill record Updated successfully", data: data })
        }
    })
}

module.exports.updateBill = updateBill;

/* update bill with new information */
let deleteBill = (req, res) => {
    if (req && !req.body) {
        return res.status(403).json({ msg: "Please provide bill details" })
    }
    bill.deleteOne({ _id: req.body._id }, function (err, data) {
        if (err) {
            res.status(403).json({ msg: "something bad", err: err })
        }
        else {
            res.status(200).json({ msg: "Bill record deleted successfully", data: data })
        }
    })
}

module.exports.deleteBill = deleteBill;