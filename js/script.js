let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  let currentPlayer = 'X';
  let isGameOver = false;

  function checkWinner() {
    const winPatterns = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return board[a[0]][a[1]];
      }
    }

    if (board.flat().every(cell => cell !== '')) {
      return 'T';
    }

    return null;
  }

  function placeMark(row, col) {
    if (isGameOver || board[row][col] !== '') return;

    board[row][col] = currentPlayer;
    document.getElementById('board').rows[row].cells[col].innerText = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      isGameOver = true;
      let statusText = '';
      if (winner === 'T') {
        statusText = "Empate!";
      } else {
        statusText = `O jogador "${winner}" venceu!`;
      }
      document.getElementById('status').innerText = statusText;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('status').innerText = `Vez do jogador "${currentPlayer}"`;
    }
  }

  function restartGame() {
    board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    currentPlayer = 'X';
    isGameOver = false;

    const cells = document.getElementById('board').getElementsByTagName('td');
    for (const cell of cells) {
      cell.innerText = '';
    }

    document.getElementById('status').innerText = `Vez do jogador "${currentPlayer}"`;
  }