const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors');


const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Deepan@123',
    database: 'CRUDDatabase'
});


// app.get('/', (req, res) => {
//     const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('rambo', 'best movie');";

//     db.query(sqlInsert, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send('data inserted');
//         }    
//     });
//     // res.send('hellow worlds');
// })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.delete('/api/delete/:movieParam', (req, res) => {
    const name = req.params.movieParam;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    
    db.query(sqlDelete, name, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}) 

app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?;";

    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})


app.listen(3001, () => {
    console.log('🚀 SERVER IS RUNNING ON PORT 3001 --> http://localhost:3001')
})