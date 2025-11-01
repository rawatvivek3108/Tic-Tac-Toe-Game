export default function Square({ value, onClick, isWinningSquare }) {
  const className = `square ${value ? value : ""} ${
    isWinningSquare ? "winning" : ""
  }`;

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}
