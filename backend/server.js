import express from "express";
import mysql, { createConnection } from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";

const server = express();
server.use(express.json());
server.use(cors());

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("DB connected");
});

server.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashpass = await bcrypt.hash(password, 10);
    let sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    connection.query(sql, [name, email, hashpass], (err, result) => {
      if (err) throw err;
      console.log("data inserted");
    });
  } catch (error) {}
});

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user where email = ?";
  connection.query(sql, [email], async (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.send("User Not Found");
    }
    console.log(result[0]);
    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.send('Invalid Password');
    }else{
        console.log("Login successfully");
    }
  });
});

server.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server is Running...");
});
