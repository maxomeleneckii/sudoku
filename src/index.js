module.exports = function solveSudoku(matrix) {
  const size = 9;
  const boxSize = 3;

  const findNull = (matrix) => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (matrix[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }
  const val = (num, pos, matrix) => {
    const [row, col] = pos;
    for (let i = 0; i < size; i++) {
      if (matrix[i][col] === num && i !== row) {
        return false;
      }
    }
    for (let i = 0; i < size; i++) {
      if (matrix[row][i] === num && i !== col) {
        return false;
      }
    }
    const boxRow = Math.floor(row / boxSize) * boxSize;
    const boxCol = Math.floor(col / boxSize) * boxSize;
    for (let i = boxRow; i < boxRow + boxSize; i++) {
      for (let j = boxCol; j < boxCol + boxSize; j++) {
        if (matrix[i][j] === num && i !== row && j !== col) {
          return false;
        }
      }
    }
    return true;
  }
  const solve = () => {
    const currPos = findNull(matrix);
    if (currPos === null) {
      return true;
    }
    for (let i = 1; i < size + 1; i++) {
      const currNum = i;
      const isValid = val(currNum, currPos, matrix);
      if (isValid) {
        const [x, y] = currPos;
        matrix[x][y] = currNum;

        if (solve()) {
          return true;
        }
        matrix[x][y] = 0;
      }
    }
    return false;
  }
  solve();
  return matrix;
};