import "./CastCard.css";
import defaultPic from "../../images/default.png";

function CastCard({ img, actor_name, character }) {
  return (
    <div className="castCard">
      <img
        src={img ? `https://image.tmdb.org/t/p/original/${img}` : defaultPic}
        alt={actor_name}
      />
      <div className="actorName">{actor_name}</div>
      {character && <div className="characterName">as {character}</div>}
    </div>
  );
}

export default CastCard;
