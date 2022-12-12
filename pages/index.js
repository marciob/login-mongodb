import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  require("dotenv").config();

  const mongokey = process.env.MONGO_API;

  //sends data (using axios) and store on the database (on mongodb)
  async function createAccount() {
    //it selects from name id called user
    const username = document.querySelector("[name=user]").value.toString();

    //it selects from name id called email
    const email = document.querySelector("[name=email]").value.toString();

    //uses axios to send data to the mongodb database
    ////the url is got on mongodb database
    /////https://data.mongodb-api.com/app/data-irddk/endpoint/data/v1/action/
    axios
      .post(
        "https://data.mongodb-api.com/app/data-irddk/endpoint/data/v1/action/insertOne",
        {
          //mongodb settings as the same way as setting on mongodb
          collection: "n2D-collection",
          database: "n2D-database",
          dataSource: "Cluster0",
          //the database entry, properties to be sent to the database
          document: {
            //it creates properties with its related value
            user: username, //stores the username input variable in a 'user' property inside the mongodb database
            email: email, //stores the email input variable in a 'email' property inside the mongodb database
          },
        },
        //those are the Headers to be sent with this API call
        {
          "Content-Type": "application/json", //it says that is expected to send in json format
          "api-key": mongokey, //it authenticates on mongodb using the api key stored with dotenv
        }
      ) //handling error
      .catch((error) => {
        console.log("call failed :", error);
      });
    //handling a message to show in the UI
    //it's showing when the action completes
    let displaysuccess = "Account Created Successfully";
    document.getElementById("displayresult1").innerHTML = displaysuccess;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h3>Create your account</h3>
        <h5>Create your username</h5>

        <input name="user"></input>

        <h5>Create your email</h5>
        <input name="email"></input>
        <button
          style={{ marginTop: "2px", marginBottom: "2px" }}
          onClick={createAccount}
        >
          Create account
        </button>
        <h2 id="displayresult1"></h2>
      </main>
    </div>
  );
}
