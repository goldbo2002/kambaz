import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../redux/store'
import { increment, decrement, addAmount } from '../../redux/counterSlice'

// Lab 4 - Redux Counter Example
const Lab4 = () => {
  // get the counter value from redux
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()
  const [input, setInput] = useState('')

  // add whatever number you type in
  const handleAdd = () => {
    const n = parseInt(input)
    if (!isNaN(n)) {
      dispatch(addAmount(n))
      setInput('')
    }
  }

  return (
    <div>
      <h2>Lab 4: Redux Counter</h2>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span style={{ margin: '0 10px' }}>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <div style={{ marginTop: 16 }}>
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add Amount"
        />
        <button onClick={handleAdd}>Add Amount</button>
      </div>
    </div>
  )
}

export default Lab4
