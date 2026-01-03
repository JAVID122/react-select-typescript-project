import { useEffect, useState ,useRef} from 'react'
import styles from './select.module.css'

export type selectOptions = {
  label: string
  value: string| number
}

type MultipleSelectProps={
  multiple:true
  value?:selectOptions[]
  onChange:(value:selectOptions[])=> void
}


 type SingleSelectProps={
  multiple?: false
  value?: selectOptions
  onChange:(value:selectOptions| undefined)=> void
 }
 type selectProps = {
   options: selectOptions[]
 } & (SingleSelectProps | MultipleSelectProps)
// type selectProps = {
//   options: selectOptions[]
//   onChange: (value: selectOptions | undefined) => void
//   value?: selectOptions
// }

export function Select({ multiple, options, onChange, value }: selectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [HighlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined)
  }
  function selectOptions(option: selectOptions) {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((o) => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }
  function isoptionSelected(option: selectOptions) {
    return multiple ? value?.includes(option) : option === value
  }
  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return
      switch (e.code) {
        case 'Enter':
        case 'space':
          setIsOpen((prev) => !prev)
          if (isOpen) selectOptions(options[HighlightedIndex])
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          const newvalue = HighlightedIndex + (e.code === 'ArrowDown' ? 1 : -1)
          if (newvalue >= 0 && newvalue < options.length) {
            setHighlightedIndex(newvalue)
          }
          break
        }
        case 'Escape':
          setIsOpen(false)
          break
      }
    }

    containerRef.current?.addEventListener('keydown', handler)

    return () => {
      containerRef.current?.removeEventListener('keydown', handler)
    }
  }, [isOpen, HighlightedIndex, options])
  return (
    <>
      <div
        ref={containerRef}
        tabIndex={0}
        className={styles.container}
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={() => setIsOpen(false)}
      >
        <span className={styles.value}>
          {multiple
            ? value.map((v) => (
                <button
                  key={v.value}
                  onClick={(e) => {
                    e.stopPropagation()
                    selectOptions(v)
                  }}
                  className={styles['option-badge']}
                >
                  {v.label}
                  <span className={styles['remove-btn']}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            clearOptions()
          }}
          className={styles['clear-btn']}
        >
          &times;
        </button>
        <div className={styles.divider}> </div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation()
                selectOptions(option)
                setIsOpen(false)
              }}
              key={option.value}
              className={`${styles.option}  ${
                isoptionSelected(option) ? styles.selected : ''
              }  ${index === HighlightedIndex ? styles.highlighted : ''}`}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
