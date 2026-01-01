import styles from "./select.module.css"

type selectOptions={

 label:string
 value:string
}

type selectProps={
options: selectOptions[]
onChange:(value:selectOptions| undefined)=> void
value?:selectOptions

}

export function Select({value,onChange,options}:selectProps){
return (
<>
  <div className={styles.container}> 
  <span className={styles.value}>value</span>
  <button className={styles["clear-btn"]}>

   &times;
  </button>
  <div className={styles.divider}></div>
  <div className={styles.caret}></div>
  
  </div>
</>
)
}

