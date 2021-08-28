import { useMutation } from "@apollo/client";
import { Button, makeStyles, TextField, Container } from "@material-ui/core";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { LOGIN } from "../hooks/user/LoginUser";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const [errorMessage, setErrorMessage] = useState(<></>);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const [login] = useMutation(LOGIN);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      await login({ variables: { email, password } });
      window.location.replace("/");
    } catch (error: any) {
      setErrorMessage(<Alert variant="error">No user Found</Alert>);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {errorMessage && errorMessage}
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;
