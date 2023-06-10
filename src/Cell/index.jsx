// eslint-disable-next-line react/prop-types
const Cell = ({ value, revealed, flagged, onClick, onContextMenu }) => {
    let display = "";
    if (revealed && value !== 0) {
      display = value === "M" ? "M" : value;
    } else if (flagged) {
      display = "🚩";
    }
  
    return (
      <div
        className={`${revealed ? "revealed" : ""} cell`}
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          onContextMenu();
        }}
      >
        {display}
      </div>
    );
};

export default Cell;