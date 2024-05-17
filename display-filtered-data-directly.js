/*
This is the solution code to you question to implement something to display data directly on display..
I am using HTML and rendering the data after converting the data into a string form and then displaying it in HTML form
*/
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/api/data', (req, res) => {
    fs.readFile("mess.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        let jsonData = JSON.parse(data);
        const { type, week, day, meal } = req.query;

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
//instead of directly displaying data using res.JSON, I have added a HTML rendering part that will display data
        if (!jsonData) {
            res.send("<html><body>No data found</body></html>");
        } else {
            const displayData = JSON.stringify(jsonData);
            res.send(`<html><body><h1>Data display: </h1>${displayData}</body></html>`);

        }
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
})

// http://localhost:3000/api/data?type=South%20Veg&week=odd&day=Sunday&meal=Breakfast
