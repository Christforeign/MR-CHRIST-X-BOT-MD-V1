const games = {};

function createBoard() {
  return ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
}

function renderBoard(board) {
  return `${board[0]} | ${board[1]} | ${board[2]}\n---------\n${board[3]} | ${board[4]} | ${board[5]}\n---------\n${board[6]} | ${board[7]} | ${board[8]}`;
}

function checkWinner(board) {
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a,b,c] of wins) {
    if (board[a] === board[b] && board[b] === board[c]) return board[a];
  }
  if (!board.includes("1") && !board.includes("2") && !board.includes("3") && !board.includes("4") && !board.includes("5") && !board.includes("6") && !board.includes("7") && !board.includes("8") && !board.includes("9")) return "draw";
  return null;
}

module.exports = {
  command: ["tictactoe", "ttt"],
  description: "Jouer au morpion",
  execute: async ({ from, sender, args, reply }) => {
    const arg = args[0];

    if (arg === "start" || !games[from]) {
      games[from] = { board: createBoard(), players: { X: sender, O: null }, turn: "X" };
      return await reply(`🎮 *Tic Tac Toe!*\n\n${renderBoard(games[from].board)}\n\n@${sender.split("@")[0]} a commencé (X)!\n\nUn autre joueur doit faire .ttt join pour rejoindre.\n\nJouez avec .ttt <1-9>`);
    }

    const game = games[from];
    if (arg === "join") {
      if (game.players.X === sender) return await reply("❌ Tu es déjà le joueur X!");
      if (game.players.O) return await reply("❌ La partie est déjà pleine!");
      game.players.O = sender;
      return await reply(`✅ @${sender.split("@")[0]} a rejoint comme joueur O!\n\n${renderBoard(game.board)}\n\n@${game.players.X.split("@")[0]} (X) commence!`);
    }

    if (arg === "stop") {
      delete games[from];
      return await reply("🛑 *Partie terminée!*");
    }

    if (!game.players.O) return await reply("⏳ En attente d'un 2e joueur. Fais .ttt join");

    const currentPlayer = game.turn;
    const currentJid = game.players[currentPlayer];
    if (sender !== currentJid) return await reply(`❌ C'est le tour de @${currentJid.split("@")[0]} (${currentPlayer})!`);

    const pos = parseInt(arg) - 1;
    if (isNaN(pos) || pos < 0 || pos > 8) return await reply("❌ Choisissez une case entre 1 et 9.");
    if (game.board[pos] === "X" || game.board[pos] === "O") return await reply("❌ Cette case est déjà prise!");

    game.board[pos] = currentPlayer;
    const winner = checkWinner(game.board);
    if (winner) {
      const result = winner === "draw" ? "🤝 *Match nul!*" : `🏆 *@${game.players[winner].split("@")[0]} (${winner}) a gagné!*`;
      const board = renderBoard(game.board);
      delete games[from];
      return await reply(`${board}\n\n${result}`);
    }
    game.turn = currentPlayer === "X" ? "O" : "X";
    await reply(`${renderBoard(game.board)}\n\nTour de @${game.players[game.turn].split("@")[0]} (${game.turn})`);
  },
};
