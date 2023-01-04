import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((item) => (
        <MeetupItem
          id={item.id}
          key={item.id}
          title={item.title}
          image={item.image}
          address={item.address}
          description={item.description}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
