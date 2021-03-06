import React from 'react'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import store from '../../redux/store'
import { initGame, resetScore } from '../../redux/actions'

interface ControlProps {
  score?: number
  iteration?: number
  runningScore?: number
}

const useStyles = makeStyles((theme: Theme) => ({
  score: {
    color: '#dd0',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(1),
  },
}))

const Controls: React.FC<ControlProps> = ({
  score,
  iteration,
  runningScore,
}): JSX.Element => {
  const styles = useStyles({})

  const handleNewGame = (): void => {
    store.dispatch(initGame())
  }

  const handleResetScore = (): void => {
    store.dispatch(resetScore())
  }

  /**
  const handleAutoClick = (): void => {
    store.dispatch(autoInit())
  }
  add item type and action to redux store reducer
   */

  return (
    <>
      <div className={styles.score}>
        <Typography variant='body1'>
          <b>Score:</b> {score || 0}
        </Typography>
        <Typography variant='body1'>
          <b>Total Score:</b> {runningScore || 0}
        </Typography>
        <Typography variant='body1'>
          <b>Iteration:</b> {iteration || 1}
        </Typography>
      </div>

      <Button
        onClick={handleNewGame}
        className={styles.button}
        fullWidth
        color='primary'
        variant='contained'>
        New Game
      </Button>
      <Button
        onClick={handleResetScore}
        className={styles.button}
        fullWidth
        variant='contained'>
        Reset Score
      </Button>
      <Button
        /** onClick={handleAutoClick} */
        className={styles.button}
        fullWidth
        color='secondary'
        variant='contained'>
        Start Auto Move!
      </Button>
    </>
  )
}

export default Controls
