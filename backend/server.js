const express= require('express');
const mysql= require('mysql');
const cors= require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:  true}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ama1568',
    database: 'haufe',
})

app.post("/register", (req, res) =>{
    const values= [
    req.body.name,
    req.body.email,
    req.body.password
    ]
    const sqlInsert=
     "INSERT INTO haufe.users (name, email, password) VALUES (?);";
    db.query(sqlInsert, [values], (err, data) =>{
        if (err){
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post("/login", (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const sqlInsert=
     "SELECT * FROM haufe.users WHERE email=? AND password=?;";
    db.query(sqlInsert, [email, password], (err, data) =>{
        if (err){
            return res.json("Error");
        }
        if (data.length >0){
            return res.json("Success");
        }
        else{
            return res.json("Failed");
        }
    });
});


app.get('/get', (req, res)=>{
    const sqlSelect=
     "SELECT * FROM haufe.events;";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    });
});

app.get('/event/:id', (req, res) => {
    const eventId = req.params.id;
    const sqlSelect = "SELECT * FROM haufe.events WHERE id = ?;";
    db.query(sqlSelect, [eventId], (err, result) => {
      if (err) {
        console.error('Error fetching event:', err);
        res.status(500).send('Error fetching event');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('Event not found');
        return;
      }
      res.json(result[0]);
    });
  });

app.post("/recommend", (req, res) =>{
    const{name, place, date, startTime, endTime, description, budget}= req.body;
    const sqlInsert=
     "INSERT INTO haufe.events (name, place, date, startTime, endTime, description, budget) VALUES (?, ?, ?, ?, ?, ?, ?);"; 
    db.query(sqlInsert, [name, place, date, startTime, endTime, description, budget], (err, data) =>{
        if (err){
            return res.json("Error");
        }
        return res.json("Event added successfully");    
    });
});

app.post('/add-friend', (req, res) => {
    const { userId, eventId } = req.body;
    const sqlInsert = "INSERT INTO haufe.friends (userId, eventId) VALUES (?, ?);";
    db.query(sqlInsert, [userId, eventId], (err, result) => {
      if (err) {
        console.error('Error adding friend:', err);
        res.status(500).send('Error adding friend');
        return;
      }
      res.status(200).json({ id: result.insertId, userId, eventId });
    });
  });

  app.get('/users', (req, res) => {
    const sqlSelect = "SELECT * FROM haufe.users;";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Error fetching users');
        return;
      }
      res.send(result);
    });
  });

  app.get('/tasks/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const sqlSelect = "SELECT t.id, t.taskDescription, t.friendId, u.name AS friendName FROM haufe.tasks t JOIN haufe.users u ON t.friendId = u.id WHERE t.eventId = ?;";
    db.query(sqlSelect, [eventId], (err, result) => {
      if (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).send('Error fetching tasks');
        return;
      }
      res.send(result);
    });
  });
  

  app.post('/add-task', (req, res) => {
    const { eventId, friendId, taskDescription } = req.body;
    const sqlInsert = "INSERT INTO haufe.tasks (eventId, friendId, taskDescription) VALUES (?, ?, ?);";
    db.query(sqlInsert, [eventId, friendId, taskDescription], (err, result) => {
      if (err) {
        console.error('Error adding task:', err);
        res.status(500).send('Error adding task');
        return;
      }
      res.status(200).json({ id: result.insertId, eventId, friendId, taskDescription });
    });
  });


app.listen(3001, () => {
    console.log("listening");
});
