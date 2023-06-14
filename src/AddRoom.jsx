import { useEffect, useRef, useState } from 'react'
import './AddRoom.css'

const AddRoom = () => {
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(0)
  const form = useRef(null)

  useEffect(() => {
    setTotal(form.current?.children.length)
    form.current?.children[0].classList.add('active')
  }, [])

  return (
    <main>
      <form ref={form}>
        {/* Room basic details */}
        <div>
          <h1>Basic Details</h1>
          <div className="form-group">
            <label htmlFor="room">Add room name</label>
            <input
              type="text"
              name="room"
              id="room"
              placeholder="Enter room name"
              className="inputs"
            />
          </div>
          <div></div>
        </div>

        {/* Room Layout */}
        <div>
          <h1>Select Room Layout</h1>
          <div></div>
        </div>

        <div>
          <h1>Some other random thing that I cannot think of right now</h1>
        </div>
        <p>
          {current !== 0 ? (
            <button
              type="button"
              onClick={() => {
                form.current?.children[current].classList.toggle('active')
                form.current?.children[current - 1].classList.toggle('active')
                setCurrent(current - 1)
              }}
            >
              Back
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => {
              if (current === total - 2) {
                // Next thing
              } else {
                form.current?.children[current].classList.toggle('active')
                form.current?.children[current + 1].classList.toggle('active')
                setCurrent(current + 1)
              }
            }}
          >
            Next
          </button>
        </p>
      </form>
    </main>
  )
}

export default AddRoom
