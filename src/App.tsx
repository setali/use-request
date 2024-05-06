import { useState } from 'react'
import Sample from './Sample'

export default function App () {
  const [mount, setMount] = useState<boolean>(true)

  return (
    <div>
      <div>
        <button onClick={() => setMount(m => !m)}>
          {mount ? 'Unmount' : 'Mount'}
        </button>
      </div>
      {mount && <Sample />}
    </div>
  )
}
