import { useContext } from "react";

import FavoritesContext from "../store/favorites-context";

import MeetupList from "../components/meetup/MeetupList";

function Favorites() {
  const favContext = useContext(FavoritesContext);

  let content;

  console.log('count '+favContext.count);
  if (favContext.count === 0) {
    content = <p>No favorite item added yet...</p>;
  } else {
    content = <MeetupList meetups={favContext.favorites}/>;
  }
  return (
    <div>
      <h2>Favorites page</h2>
      {content}
    </div>
  );
}

export default Favorites;
