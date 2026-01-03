import { useState } from "react"
import { Select, type selectOptions } from "./Select"

const options = [
  { label: 'first', value: 1 },
  { label: 'second', value: 2 },
  { label: 'third', value: 3 },
  { label: 'Fourth', value: 4 },
  { label: 'Fifth', value: 5 },
  { label: 'sixth', value: 6},
  { label: 'seventh', value: 7 },
   { label: 'Eighth', value: 8 },
  { label: 'Nineth', value: 9 },
  { label: 'Tenth', value: 10},
  { label: 'Eleventh', value: 11 },

]
function App() {
 const [value1,setvalue1] =useState<selectOptions[]>([options[0]])
 
 const [value2,setvalue2] =useState<selectOptions| undefined>(options[0])

  return (
    <>
      <Select multiple options={options} value={value1} onChange={(o) => setvalue1(o)} />

      <br/>
      <Select options={options} value={value2} onChange={(o) => setvalue2(o)} />
    </>
  )
}

export default App
