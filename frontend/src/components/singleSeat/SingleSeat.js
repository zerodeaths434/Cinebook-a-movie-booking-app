import { useState } from "react";
import "./SingleSeat.css";

function SingleSeat({ value, setAmount, row_no, handleBookedSeats }) {
  const [seatSelected, setSeatSelected] = useState(false);

  function handleSeatClick() {
    console.log(`${row_no}${value}`);
    handleBookedSeats(`${row_no}${value}`);
    if (seatSelected === false) {
      setAmount((amount) => amount + 300);
    } else {
      setAmount((amount) => amount - 300);
    }
    setSeatSelected(!seatSelected);
  }
  return (
    <span className="seatHolder">
      <span
        className={`${seatSelected ? "singleSeat seatSelected" : "singleSeat"}`}
        onClick={handleSeatClick}
      >
        {value}
      </span>
    </span>
  );
}

export default SingleSeat;
