import React, { useState } from "react";
import "./TextBox.css";
import axios from 'axios';
import { useEffect } from "react";

function TextBox() {
  // will change latter
  // const output = "output will present here ";


  const [input, setInput] = useState("");
  const [output , setOutput] = useState("")
  const [schemaInput , setSchemaInput ] = useState("")
  const [fixedInput, setFixedInput] = useState(false)
  const [allmessages , setAllMessages ] = useState([])
  
  // useEffect(() => {
  //   // Define async function to fetch data
  //   async function fetchData() {
  //     try {
  //       const response = await axios.post('http://127.0.0.1:8000/chat');
  //       setOutput(response.data.message);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }

  //   // Call the async function
  //   fetchData();
  // }, []);
  
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
 
    try {

      const obj = {"role": "user", "content": input};
      
      console.log("Sending data:", obj); // Log the data being sent

      const response = await axios.post('http://127.0.0.1:9000/chat', obj);
      
      console.log("Response:", response.data); // Log the response data
      
      // const outputObject = response.data.message.content ; 
     let newMsg = [...allmessages , obj , response.data.query.message]

      console.log(newMsg);
      setAllMessages(newMsg)
      setInput('enter your text')
      // setOutput(outputObject);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  async function handleSubmit_schema(e) {
    e.preventDefault(); // Prevent default form submission
  
    try {
      setFixedInput(true);
      const obj = {"role": "user", "content": input};
      console.log("Sending data:", obj); // Log the data being sent
  
      const response = await axios.post('http://127.0.0.1:9000/schema_input', obj);
      
      console.log("Response:", response.data); // Log the response data
      
      // const outputObject = response.data.message.content ; 
      // setOutput(outputObject);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function clear_schema(e) {
    e.preventDefault(); // Prevent default form submission
  
    try {
      setSchemaInput("");
      setFixedInput(false);  
      const response = await axios.get('http://127.0.0.1:9000/clear');
      
      console.log("Response:", response.data); // Log the response data

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSchemaChange (e)
  {
    setSchemaInput(e.target.value)
  }


  return (
    <div className="container">
      <div className="box1">

        <div className="kavya">
          <form onSubmit={handleSubmit_schema} className="form">

            <textarea
              type="text"
              id="user_text"
              name="user_text"
              value={schemaInput}
              onChange={handleSchemaChange}
              className="inputFeild"
              style={{ borderRadius: "1%" }}
              readOnly={fixedInput}
              placeholder="Enter Schema"
            />

            <div className="outerbtn">
              <button type="submit" className="submitbtn" onClick={handleSubmit_schema}>
                Submit
              </button>
              <button type="submit" className="submitbtn" onClick={clear_schema}>
                Clear
              </button>
            </div>

            
          </form>
        </div>

        <div className="kavya2">
          <div
            className="inputFeild1"
            type="text"
            value={output}
            // onChange={handleOutputChange}
          >

            {/* need to apply css */}
            {
              allmessages.length > 0 ? (<div className="messages">
                {
                  allmessages.map((msg,index) => (
                    <div key={index} className="message">
                      <div className="details">
                        <h2>{msg.role === 'user' ? 'you' : 'assistant'}</h2>
                        <p>{msg.content}</p>
                        <p>{}</p>
                      </div>
                    </div>
                  ))
                }
              </div>) : ( <></>)
            }
          </div>

          <div className="dhruv">
            <input
              className="inputbtn"
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="enter prompt"
            ></input>

            <button type="submit" className="submitbtn1" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default TextBox;
