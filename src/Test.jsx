import { useRef, useEffect, useState } from 'react'
import './Test.css'

const Test = () => {
  const boxWidth = 10
  const boxHeight = 10

  const outer = useRef(null)
  const container = useRef(null)
  const [n, setN] = useState(0)
  const [m, setM] = useState(0)
  const [states, setStates] = useState([])

  useEffect(() => {
    const M = parseInt(outer.current.offsetWidth / boxWidth)
    const N = parseInt(outer.current.offsetHeight / boxHeight)

    container.current.style.width = M * boxWidth + 'px'
    container.current.style.height = N * boxHeight + 'px'

    const states = Array.from({ length: 54 }, () => Array(70).fill(true))

    const n = states.length
    const m = states[0].length

    const newArray = Array.from({ length: N }, () => Array(M).fill(false))

    const ratio = Math.min(M / m, N / n)
    const scale = parseInt(ratio + (ratio > 1.15 ? -0.15 : 0))
    const px = M - m * scale
    const pl = parseInt(px / 2)
    const pr = px - pl
    const py = N - n * scale

    if (scale < 1) {
      newArray.forEach((row) => row.fill(true))
      setStates(newArray)
      return
    }

    for (let i = 0, index = M * parseInt(py / 2); i < n; i += 1) {
      for (let k = 0; k < scale; k += 1) {
        index += pl
        for (let j = 0; j < m; j += 1) {
          for (let l = 0; l < scale; l += 1) {
            newArray[parseInt(index / M)][index % M] = states[i][j]
            index += 1
          }
        }
        index += pr
      }
    }
    setStates(newArray)
  }, [outer.current?.offsetHeight]) // fix this later

  return (
    <div className="flex flex-col justify-start items-center py-2 px-4 h-screen w-screen">
      <div ref={outer} className="w-full h-full outline">
        <div ref={container} className="grid1">
          {states.map((N, i) =>
            N.map((state, j) => (
              <div
                key={String(i) + j}
                className={`h-[10px] w-[10px] outline outline-black outline-[0.5px] ${
                  state ? 'bg-gray-500' : 'bg-red-200'
                }`}
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Test
