import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardContent, Checkbox, Link, TextField, Typography } from "@mui/material";

export function Chat() {
  const URL = "wss://iai3-react-34db9d7c5920.herokuapp.com";
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [inputMessage, setInputMessage] = React.useState('');
  const [inputName, setInputName] = React.useState('');
  const [checkbox, setCheckbox] = React.useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(URL);

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
      setConnected(true);
    };

    ws.current.onmessage = (evt) => {
      const newMessages = JSON.parse(evt.data);
      setMessages((prevMessages) =>
        [...prevMessages, ...newMessages].sort((a, b) => b.when - a.when)
      );
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected, attempting to reconnect...");
      setConnected(false);
      setTimeout(() => {
        ws.current = new WebSocket(URL); // Reconnecter après un délai
      }, 1000);
    };

    return () => {
      // Nettoyage lors du démontage du composant
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleChange = (event) => {
    setCheckbox(event.target.checked);
  };

  const sendMessage = () => {
    if (connected) {
      if (checkbox) {
        const messageData = {
          name: inputName,
          message: inputMessage,
          when: Date.now(),
          moment: 0,
        };
        ws.current.send(JSON.stringify(messageData));
      } else {
        const messageData = {
          name: inputName,
          message: inputMessage,
          when: Date.now(),
        };
        ws.current.send(JSON.stringify(messageData));
      }
    }
  };

  if (!connected) return <div>Chargement du Chat...</div>;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Conteneur des messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
          {console.log(messages)}
          {messages.map((message, index) => (
            <Card key={index} style={{ marginBottom: "10px" }}>
              <CardContent>
                <h3>{message.name}</h3>
                <p>{message.message} {/*<Link underline="hover" onClick={() => console.log("click")}>{message.moment}</Link>*/}</p>
                <Typography variant="overline">{new Date(message.when).toDateString()}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Formulaire en bas */}
        <div style={{
          padding: "10px",
          borderTop: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "white"
        }}>
          <TextField
            variant="outlined"
            label="Name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Checkbox
            checked={checkbox}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}