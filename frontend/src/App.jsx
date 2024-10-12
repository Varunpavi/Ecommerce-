import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [color, setColor] = useState("");
  const [count , setCount] = useState(0);
  useEffect(()=> {
      const timer = setTimeout(() => {
        setCount((count)=> count);
      }, 2000);
    return ()=> clearTimeout(timer);

  },[]);

  return (
    <>
      <div>
        {/* usestats */}
        <div style={{backgroundColor:color,height:'20px'}}>
        </div>
        <h1 className='text-blue-100'>Type a color name or code:</h1>
        <input
          type="text"
          name="colorInput"
          onChange={(e) => setColor(e.target.value)}
          value={color} 
          placeholder="Enter color"
          style={{ padding: '10px', fontSize: '16px', width: '100%', marginTop: '10px' }}
        />
      </div>
      {/* useeffect */}
      <button onClick={() => setCount(count + 1)}>Click</button>
      <h1>I've rendered {count} times!</h1>
    </>
  )
}

export default App
