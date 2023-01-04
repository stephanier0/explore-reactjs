import MeetupList from "../components/meetup/MeetupList";
import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import classes from "../components/meetup/NewMeetupForm.module.css";
import { useRef } from "react";

function AllMeetups() {
  const [meetupData, setMeetupData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  // useEffect(() => {
  //   fetch(
  //     "https://react-getting-started-acee8-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json"
  //   )
  //     .then((response) => {
  //       // console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // console.log(data);
  //       const allData = [];
  //       for (const index in data) {
  //         // console.log(data[index]);
  //         const each = {
  //           id: index,
  //           ...data[index],
  //         };
  //         allData.push(each);
  //       }
  //       // setIsLoadingData(false);
  //       setMeetupData(allData);
  //     });
  // }, []);

  // to add to local DB - done

  useEffect(() => {
    const urls = [
      "https://react-getting-started-acee8-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json",
      "/api/local/be/meetup",
    ];
    Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    )
      .then(([reFirebase, reLocal]) => {
        const allData = [];
        for (const index in reFirebase) {
          const each = {
            id: index,
            ...reFirebase[index],
          };
          allData.push(each);
        }
        for (const index in reLocal.ListMeetupResponse) {
          const each = {
            id: index,
            ...reLocal.ListMeetupResponse[index],
          };
          allData.push(each);
        }

        setMeetupData(allData);
        setIsLoadingData(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoadingData) {
    return <section>Loading...</section>;
  }

  let context;
  if (meetupData.length === 0) {
    context = <h1>There is no data available...</h1>;
  } else {
    context = <MeetupList meetups={meetupData} />;
  }

  function submitToUpperList(event) {
    event.preventDefault();
    const titleForm = titleInputRef.current.value;
    const imageForm = imageInputRef.current.value;
    const addressForm = addressInputRef.current.value;
    const descriptionForm = descriptionInputRef.current.value;
    const dataInput = {
      title: titleForm,
      image: imageForm,
      address: addressForm,
      description: descriptionForm,
    };

    // to add to the upper list only - temporary added data, upon refreshing the page it will be dissappear as it is not stored in any db
    // setMeetupData(meetupData.concat(dataInput));
    fetch("/api/local/be/meetup/add", {
      method: "POST",
      body: JSON.stringify(dataInput),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      // onload((this.window));
      // history.replace("/new-meetup");
      window.location.reload();
    });
  }

  return (
    <div>
      <h2>All Meetup page</h2>
      {context}

      <Card>
        <form className={classes.form} onSubmit={submitToUpperList}>
          <div>
            <h2>Add Temp Data to Local DB</h2>
          </div>
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input type="text" required id="title" ref={titleInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor="image">Image</label>
            <input type="url" required id="image" ref={imageInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <input type="text" required id="address" ref={addressInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              required
              id="description"
              rows="5"
              ref={descriptionInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>Add Meetup</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AllMeetups;
