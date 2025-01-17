import { Card, CardContent } from '@mui/material';

export function Chat() {

    const URL = "wss://iai3-react-34db9d7c5920.herokuapp.com";
    const ws = new WebSocket(URL);

    ws.onopen = () => {
        console.log("connected");
        this.setState({
            connected: true
        });
    };

    ws.onmessage = evt => {
        const messages = JSON.parse(evt.data);
        messages.map(message);
    };

    ws.onclose = () => {
        console.log("disconnected, reconnect.");
        this.setState({
            connected: false,
            ws: new WebSocket(URL)
        });
    };

    return(
        <div>
            <Card>
                <CardContent>
                    <h3>Nom</h3>
                    <p>messages</p>
                    <p>date</p>
                </CardContent>
            </Card>
        </div>
    )
}