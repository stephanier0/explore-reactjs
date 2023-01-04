import React from "react";
import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const titleInput = titleInputRef.current.value;
    const imageInput = imageInputRef.current.value;
    const addressInput = addressInputRef.current.value;
    const descriptionInput = descriptionInputRef.current.value;

    const inputData = {
      title: titleInput,
      image: imageInput,
      address: addressInput,
      description: descriptionInput,
    };

    console.log(inputData);
    props.onAddMeetupHandler(inputData);
    // fetch(
    //   "https://react-getting-started-acee8-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json",
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(inputData),
    //     headers:{
    //       'Content-Type':'application/json'
    //     }
    //   }
    // );
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" required id="title" ref={titleInputRef}/>
        </div>

        <div className={classes.control}>
          <label htmlFor="image">Image</label>
          <input type="url" required id="image" ref={imageInputRef}/>
        </div>

        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef}/>
        </div>

        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea type="text" required id="description" rows="5" ref={descriptionInputRef}/>
        </div>
        <div className={classes.actions}>
          <button >Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
