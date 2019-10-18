import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";


const EmailComponentService = ({ template, service }) => {
    const { values, responseBody, responseTitle } = template;
    const url = service.post.url;

    if (!Array.isArray(values)) throw new Error(`The wanted values in the email service is not of type array. Is type ${values.constructor.name}`)
    if (typeof responseBody != "function") throw new Error(`The responseBody is not of valid type function. The response body should be a function with argmuents (requestedValues, inputtedValues)=>string. The object is type ${values.constructor.name}`)
    if (typeof responseTitle != "function") throw new Error(`The responseTitle is not of valid type function. The response body should be a function with argmuents (requestedValues, inputtedValues)=>string. The object is type ${values.constructor.name}`)
    if (typeof url != "string") throw new Error(`The wanted values for the service.post.url doesnt match the required string. The type of the object is ${url.constructor.name}`)


    const [open, setOpen] = useState(false);
    const [myValue, setValue] = useState(new Array(values.length))

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const ContactDialog = () => {
        return <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {responseTitle(values, myValue)}
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    {responseBody(values, myValue)}
                </Typography>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Stäng
            </Button>
            </DialogActions>
        </Dialog>
    }

    return (
        <React.Fragment>
            <ContactDialog ></ContactDialog>
            <FormControl validate className="form" >
                {values && values.map((value, index) => <TextField
                    onChange={(e) => setValue(() => { const i = myValue; i[index] = e.target.value; setValue(i) })}
                    variant="outlined"
                    label={value}
                    margin="normal"
                />)}
                <Button onClick={handleClickOpen}>SKICKA</Button>
            </FormControl>
        </React.Fragment>
    )
}

export default EmailComponentService;