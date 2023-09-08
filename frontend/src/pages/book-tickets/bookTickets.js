import { useState } from "react";
import "./bookTickets.css";
import SingleSeat from "../../components/singleSeat/SingleSeat";
import { useParams, useNavigate } from "react-router-dom";
import movieHallImg from "../../assets/images/movieHall.jpg";
import { BiArrowBack } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../../context";

function BookTickets() {
  const [amount, setAmount] = useState(0);
  const [isPayBtnClicked, PayBtnClicked] = useState(false);
  const [seatNames, setSeatNames] = useState([]);
  const { state } = useGlobalContext();
  const navigate = useNavigate();

  const { movieTitle } = useParams();
  var no_of_seats = [];
  var no_of_rows = [];

  for (let i = 1; i <= 12; i++) {
    no_of_seats.push(i);
  }

  for (let i = 1; i <= 8; i++) {
    no_of_rows.push(i);
  }

  const arr = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let i = 0;

  const handleBookedSeats = (bookedSeat) => {
    setSeatNames([...seatNames, bookedSeat]);
    console.log(seatNames);
  };
  //console.log(state);

  const handleFinalPayment = () => {
    state.user
      ? toast.success("Payment successful") &&
        setTimeout(() => {
          navigate("/");
        }, 3000)
      : toast.error("Please Login to Pay");
  };

  return (
    <>
      <div className="ticketBookingBgImg">
        <ToastContainer
          className="toast-position"
          position="top-center"
          autoClose={2400}
        />
        <div className="Imgoverlay"></div>
        <img src={movieHallImg} alt="movie hall background"></img>
      </div>

      <section className="bookingTicketsSection">
        <div
          className={`${
            isPayBtnClicked ? "seatsInfoContainer show" : "seatsInfoContainer "
          }`}
        >
          <h1 className="bookTicketsMovieTitle">{movieTitle}</h1>
          {no_of_rows.map((r) => {
            return (
              <div className="seatRowDiv" key={r}>
                <span className="seatHolder">
                  <span className="row_no">{arr[i++]}</span>
                </span>
                {no_of_seats.map((seat) => (
                  <SingleSeat
                    key={arr[i - 1] + seat}
                    row_no={arr[i - 1]}
                    value={seat}
                    setAmount={setAmount}
                    handleBookedSeats={handleBookedSeats}
                  />
                ))}
              </div>
            );
          })}
          <div
            className={`${
              amount === 0
                ? "payTicketBtnContainer show"
                : "payTicketBtnContainer"
            }`}
          >
            <button
              className="payTicket"
              onClick={() => PayBtnClicked(!isPayBtnClicked)}
            >
              Pay Rs {amount}
            </button>
          </div>
        </div>
      </section>
      <div
        className={`${
          isPayBtnClicked
            ? "finalTicketBookModal "
            : "finalTicketBookModal show"
        }`}
      >
        <BiArrowBack
          className="backBtn"
          onClick={() => PayBtnClicked(!isPayBtnClicked)}
        />
        <h1>Booking Summary</h1>
        <p>{movieTitle}</p>
        <div className="finalbookingwrapper">
          <div className="finalbookingdesc">
            Selected Seats:
            {seatNames.map((seatName, index) => (
              <div
                style={{ padding: "0 3px", display: "inline-block" }}
                key={seatName + index}
              >
                {seatName}
              </div>
            ))}
          </div>
          <div>
            <b>{amount}</b>
          </div>
        </div>
        <div className="finalbookingwrapper">
          <div className="finalbookingdesc">Convinience Fees</div>
          <div>
            <b>{25 + (18 / 100) * amount}</b>
          </div>
        </div>
        <hr />
        <div className="finalbookingwrapper">
          <div className="finalbookingdesc">Total</div>
          <div>
            <b>{amount + (25 + (18 / 100) * amount)}</b>
          </div>
        </div>
        <div className="finalPayTicket">
          <button className="payTicket" onClick={handleFinalPayment}>
            Pay {amount + (25 + (18 / 100) * amount)}
          </button>
        </div>
      </div>
    </>
  );
}

export default BookTickets;
