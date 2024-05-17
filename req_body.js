/*
Sending request from the body instead of query parameters aka using req.body.
Also, sending POST request instead of a GET request.
*/
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;


app.use(express.json());
//since we are sending from the body, we need to send a POST request instead of a GET request
app.post('/api/data', (req, res) => {
    fs.readFile("mess.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        let jsonData = JSON.parse(data);
        const { type, week, day, meal } = req.body;
        //the filters are taken from the body that we send and not from query parameters
        if (type) {
            jsonData = jsonData[type];
            if (week) {
                jsonData = jsonData?.[week];
                if (day) {
                    jsonData = jsonData?.[day];
                    if (meal) {
                        jsonData = jsonData?.[meal];
                    }
                }
            }
        }

        res.json(jsonData || {});
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});

/* http://localhost:3000/api/data
The body part can be entered in Postman application, and we can send a POST request to get our desired output. One example that we can use is:
 {
    "type": "South Veg",
    "week": "odd",
    "day": "Sunday",
    "meal": "Breakfast"
} */
