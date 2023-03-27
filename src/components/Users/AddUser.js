import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error,setError]= useState();

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
if (enteredUsername.trim().length===0|| enteredAge.trim().length===0){
  setError({
    title:'Invalid input.',
    message:'Please enter a valid name and age.'
  }); 
  return;
}
if (+enteredAge<1){
  setError({
    title:'Invalid age.',
    message:'Please enter a valid age.'
  }); 
    return;
}

props.onAddUser(enteredUsername,enteredAge);
    setEnteredAge('');
    setEnteredUsername('');
  };

  const errorHandler=()=>{
    setError(null);
  };

  return (<div>
    {error && <ErrorModal onConfirm={errorHandler} title={error.title} message={error.message}/>}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          value={enteredUsername}
          type="text"
          id="username"
          onChange={usernameChangeHandler}
        ></input>
        <label htmlFor="age">Age (Years)</label>
        <input
          value={enteredAge}
          type="number"
          id="age"
          onChange={ageChangeHandler}
        ></input>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </div>
  );
};

export default AddUser;
