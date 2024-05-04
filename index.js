

// opencage.geocode({ q: 'Delhi, India', key: API_KEY })
//   .then(data => {
    //     console.log("-------------------------data ",data.results[0])
//     if (data.status.code === 200) {
    //       if (data.results.length > 0) {
        //         console.log(data.results[0].formatted);
//         console.log(data.results[0].geometry);
//       } else {
    //         console.log('No results found');
//       }
//     } else {
    //       console.log('Error', data.status.message);
//     }
//   })
//   .catch(error => {
    //     console.log('Error', error.message);
//   });


// const latitude = 28.6239849
// const longitutde  = 77.2994033

// opencage.geocode({ q: `${latitude},${longitutde}`, key: API_KEY })
//   .then(data => {
//     if (data.status.code === 200) {
    //       if (data.results.length > 0) {
        //         const location = data.results[0];
//         console.log("Formatted Address:", location.formatted);
//         console.log("Components:", location.components);
//         console.log("Geometry:", location.geometry);
//         // Analyze the address or components to determine the type of place
//         // For example, check if it contains words like "office", "home", etc.
//       } else {
    //         console.log('No results found');
    //       }
    //     } else {
        //       console.log('Error', data.status.message);
        //     }
//   })
//   .catch(error => {
//     console.log('Error', error.message);
//   });


const opencage = require('opencage-api-client');
const API_KEY = "95c8fc741e5048e281528952bd40ed9f"

const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.post('/getinfo', (req, res) => {
    const { long, lati } = req.body


    console.log(long,lati)





    opencage.geocode({ q: `${lati},${long}`, key: API_KEY })
        .then(data => {
            console.log("----------HIT LEFT-------------",data.rate.remaining)
            if (data.status.code === 200) {
                if (data.results.length > 0) {
                    const location = data.results[0];
                    console.log("Geometry:", location.geometry);
                    console.log("Formatted Address:", location.formatted);
                    console.log("Components:", location.components);
                    return res.status(200).json({category:location.components._category})
                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Error', data.status.message);
            }
        })
        .catch(error => {
            console.log('Error', error.message);
        });

        
        

        
        // return res.status(400).json(false)



})


app.listen("3001", () => {
    console.log("server running")
})