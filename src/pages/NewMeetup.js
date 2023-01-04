import NewMeetupForm from "../components/meetup/NewMeetupForm";
// import {useHistory} from "react-router-dom";

function NewMeetup() {
  // const history = useHistory();

  function addMeetupHandler(data) {
    fetch(
      "https://react-getting-started-acee8-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json",
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type':'application/json'
        }
      }

    ).then ( () => {
      // onload((this.window));
      // history.replace("/new-meetup");
      window.location.reload();
    });
  }

  return (
    <div>
      <h2>New Meetup page - Firebase</h2>
      <NewMeetupForm onAddMeetupHandler={addMeetupHandler} />
    </div>
  );
}

export default NewMeetup;
