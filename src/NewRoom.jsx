import { useEffect, useRef, useState } from 'react'
import ConstructRoom from './ConstructRoom'

const SmallDivs = ({ isClicked, add }) => {
  const [state, changeState] = useState(false)
  return (
    <div
      data-state={state}
      className={
        'child bg-green-200 border border-white ' + (state ? 'child1' : '')
      }
      onMouseDown={() => {
        changeState(add)
      }}
      onMouseEnter={() => {
        if (!isClicked) return
        changeState(add)
      }}
    ></div>
  )
}

const NewRoom = () => {
  const [states, setStates] = useState(null)

  const boxWidth = 50
  const boxHeight = 50

  const [isClicked, setIsClicked] = useState(false)
  const [add, setAdd] = useState(true)
  const container = useRef()
  const outer = useRef()

  const [n, setN] = useState(0)
  const [m, setM] = useState(0)

  const clear = (changeState) => {
    changeState(false)
  }

  useEffect(() => {
    if (states) return
    const columns = parseInt(outer.current.offsetWidth / boxWidth)
    const rows = parseInt(outer.current.offsetHeight / boxHeight)
    container.current.style.width = columns * boxWidth + 'px'
    container.current.style.height = rows * boxHeight + 'px'
    setN(rows)
    setM(columns)

    window.addEventListener('mousedown', () => {
      setIsClicked(true)
    })

    window.addEventListener('mouseup', () => {
      setIsClicked(false)
    })
  }, []) // fix this later

  const extractRoom = () => {
    const selected = Array.from({ length: n }, () => Array(m).fill(false))
    Array.from(container.current.children).forEach((e, index) => {
      selected[parseInt(index / m)][parseInt(index % m)] =
        e.getAttribute('data-state') === 'true'
    })
    const cropped = [-Infinity, Infinity, -Infinity, Infinity]
    for (let i = 0; i < selected.length; i += 1) {
      for (let j = 0; j < selected[0].length; j += 1) {
        if (!selected[i][j]) continue
        cropped[0] = Math.max(cropped[0], i)
        cropped[1] = Math.min(cropped[1], i)
        cropped[2] = Math.max(cropped[2], j)
        cropped[3] = Math.min(cropped[3], j)
      }
    }
    const X = cropped[0] - cropped[1] + 1
    const Y = cropped[2] - cropped[3] + 1
    const states = Array.from({ length: X + 2 }, () =>
      Array.from({ length: Y + 2 }, () => false)
    )
    for (let i = 0; i < states.length - 1; i += 1) {
      for (let j = 0; j < states[0].length - 1; j += 1) {
        states[i + 1][j + 1] = selected[i + cropped[1]][j + cropped[3]]
      }
    }
    setStates(states)
  }

  return (
    <div className="h-full w-full flex flex-col justify-start items-center py-2 px-4 gap-2">
      <div className="h-5">
        <h1>Design a room</h1>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setAdd(true)}>Add</button>
        <button onClick={() => setAdd(false)}>Remove</button>
      </div>
      <div className="flex">
        <button onClick={extractRoom}>Done</button>
      </div>
      <div
        className="h-full w-full flex flex-col justify-center items-center"
        ref={outer}
      >
        <div className="grid0" ref={container}>
          {Array(n * m)
            .fill(0)
            .map((_, index) => (
              <SmallDivs
                key={index}
                isClicked={isClicked}
                add={add}
                clear={clear}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
export default NewRoom
