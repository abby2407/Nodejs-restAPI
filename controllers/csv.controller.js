const stream = require('stream');
const await = require("await")
const fs = require('fs');
const path = require('path');

const db = require("../config/db");
const record = db.SalesRecord;

const csv = require('fast-csv');



exports.uploadFile = (req, res) => {
    try {
        let salesrecord = [];
        let sales = [];
        fs.createReadStream(__basedir + "/uploads/" + req.file.filename)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error(error);
                throw error.message;
            })
            .on('data', data => {
                salesrecord.push(data);
                salesrecord.forEach(row => {
                    let salesrec = {
                        region: row[0],
                        country: row[1],
                        itemtype: row[2],
                        saleschannel: row[3],
                        orderpriority: row[4],
                        orderdate: row[5],
                        orderid: row[6],
                        shipdate: row[7],
                        unitssold: row[8],
                        unitprice: row[9],
                        unitcost: row[10],
                        totalrevenue: row[11],
                        totalcost: row[12],
                        totalprofit: row[13],
                    };
                    salesrecord.push(salesrec);
                    console.log(salesrec);
                });
            })
            .on('end', () => {
                salesrecord.shift();
                record.bulkCreate(salesrecord).then(() => {
                    const result = {
                        status: "ok",
                        filename: req.file.originalname,
                        message: "Upload Successfully!",
                    }

                    res.json(result);
                });
            });
    } catch (error) {
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
}