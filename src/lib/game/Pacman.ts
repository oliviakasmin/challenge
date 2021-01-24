import {
  GameBoardItemType,
  KeyToGameDirection,
  GameDirectionMap,
  GameDirectionToKeys,
  GameDirection,
  pillMax,
} from '../Map'
import Item from './Item'

class Pacman extends Item implements GameBoardItem {
  type: GameBoardItemType = GameBoardItemType.PACMAN

  desiredMove: string | false = false

  score: number = 0

  constructor(
    piece: GameBoardPiece,
    items: GameBoardItem[][],
    pillTimer: GameBoardItemTimer
  ) {
    super(piece, items, pillTimer)

    // Bind context for callback events
    this.handleKeyPress = this.handleKeyPress.bind(this)

    // Add a listener for keypresses for this object
    window.addEventListener('keypress', this.handleKeyPress, false)
  }

  /** auto move method
   * @method autoMove
   * @return {GameBoardItemMove | boolean} Next move
/


    /**
   * Returns the next move from an algorithm
   *
   * @method getNextAutoMove
   * @return {GameBoardItemMove} Next move
   */

  /**
   * Returns the next move from an algorithm
   *  getNextAutoMove(): GameBoardItemMove {
   * 
   *  maxScore = [0, '']
   * 
   *  moves = {
   * 'option type': [coordinates], canExamine?: boolean
   * }
   * 
   * if (moves.keys.length === 2 && moves.includes(ghost, can examine) 
   * && moves.includes (other move, can't examine)) {
   *   return moves[other move]
   * }
   * 
   * for (let key in moves) {
   * 
   * if (key === GameBoardItemType.Cherry && cherryScore > maxScore[0] && canExamine) {
   *   maxScore = [cherryScore, 'cherry']
   * }
   * 
   * if (key === GameBoardItemType.Pill && pillScore > maxScore[0] && canExamine) {
   *   maxScore = [pillScore, 'pill']
   * }
   * 
   * else if (key === Empty && maxScore === 0 && canExamine) {
   *   return moves[Empty]
   * }
   * }
   
   * return moves[maxScore[1]] 
   * 
   * }
   * 

   */

  handleKeyPress(e: KeyboardEvent): void {
    if (KeyToGameDirection[e.key.toUpperCase()]) {
      this.desiredMove = KeyToGameDirection[e.key.toUpperCase()]
    }
  }

  /**
   * Returns the next move from the keyboard input
   *
   * @method getNextMove
   * @return {GameBoardItemMove | boolean} Next move
   */
  getNextMove(): GameBoardItemMove | boolean {
    const { moves } = this.piece

    let move: GameBoardItemMove | false = false

    // If there is a keyboard move, use it and clear it
    if (this.desiredMove) {
      if (moves[this.desiredMove]) {
        move = {
          piece: moves[this.desiredMove],
          direction: GameDirectionMap[this.desiredMove],
        }
        this.desiredMove = false
      }
    }

    // Otherwise, continue in the last direction
    if (!move && this.direction !== GameDirection.NONE) {
      const key = GameDirectionToKeys(this.direction)
      if (moves[key]) {
        move = { piece: moves[key], direction: this.direction }
      }
    }

    return move
  }

  /**
   * Move Pacman and "eat" the item
   *
   * @method move
   * @param {GameBoardPiece} piece
   * @param {GameDirection} direction
   */
  move(piece: GameBoardPiece, direction: GameDirection): void {
    const item = this.items[piece.y][piece.x]
    if (typeof item !== 'undefined') {
      this.score += item.type
      switch (item.type) {
        case GameBoardItemType.PILL:
          this.pillTimer.timer = pillMax
          break
        case GameBoardItemType.GHOST:
          if (typeof item.gotoTimeout !== 'undefined') item.gotoTimeout()
          break
        default:
          break
      }
    }
    this.setBackgroundItem({ type: GameBoardItemType.EMPTY })
    this.fillBackgroundItem()

    this.setPiece(piece, direction)
    this.items[piece.y][piece.x] = this
  }
}

export default Pacman
