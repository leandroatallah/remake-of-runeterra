import { useBoardContext } from "../BoardContext";

export const MasterToolbar = () => {
  const { playerHand, playerDeck, playerBoard } = useBoardContext();

  const handlePlayerOneDraw = () => {};

  const handleLogPlayerOneHand = () => {
    console.log("Player 1 hand", playerHand);
  };

  const handleLogPlayerOneDeck = () => {
    console.log("Player 1 deck", playerDeck);
  };

  const handleLogPlayerOneBoard = () => {
    console.log("Player 1 board", playerBoard);
  };

  const actions = [
    {
      label: "P1 draw a card",
      handler: handlePlayerOneDraw,
    },
    {
      label: "P1 Log deck",
      handler: handleLogPlayerOneDeck,
    },
    {
      label: "P1 Log hand",
      handler: handleLogPlayerOneHand,
    },
    {
      label: "P1 Log board",
      handler: handleLogPlayerOneBoard,
    },
  ];

  return (
    <div className="w-full fixed top-0 text-zinc-950">
      <div className="p-4 border-2 border-t-0 border-zinc-700 bg-zinc-300 max-w-[480px] m-auto rounded-b-md">
        <h1 className="text-[14px] uppercase text-center font-bold mb-4">
          Master Toolbar
        </h1>
        <div className="flex gap-1">
          {actions.map(({ label, handler }) => (
            <button
              key={label}
              className="w-full flex justify-center items-center border-2 border-zinc-50 bg-zinc-50 p-2 rounded-md"
              onClick={handler}
            >
              <span className="text-zinc-900 text-[12px]">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
