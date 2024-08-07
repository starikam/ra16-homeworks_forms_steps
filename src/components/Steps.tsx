import { MutableRefObject, useRef, useState } from "react"
import Step from "./Step"



interface StepType {
    date: string,
    km : string
}


const Steps = () => {

    const [steps , addStep] = useState([{date : "22.12.22", km : "5" }, {date : "23.12.21", km : "9" }, {date : "24.12.22", km : "17" }])
    const inputDate: MutableRefObject<HTMLInputElement> = useRef()
    const inputKm: MutableRefObject<HTMLInputElement> = useRef()

    const delElement = (add : StepType ) => {
        const newSteps = [...steps].filter( element => !(element.date === inputDate.current.value) )
        addStep([...newSteps, add])
    }


    const onChange = (add : string, date : string) => {

        const newSteps = [...steps].find( element => (element.date === date) )
        if ( newSteps ) {
            newSteps.km = add
            const arr = [...steps].filter( element => !(element.date === date) )
            
            addStep([...arr, newSteps])
        } 
    }

    const onDel = (evt : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const date = evt.target.closest(".step").querySelector(".step-date").textContent
        const newSteps = [...steps].filter( element => !(element.date === date) )
        addStep(newSteps)

    }
    
    return (
        <form 
        className="steps-container"
        onSubmit = { (evt) => {
            evt.preventDefault()
            if (!/^[0-3]{1}[0-9]{1}.[0-9]{2}.[0-9]{2,4}$/.test(inputDate.current.value)){
                console.log("Не та дата");
                
            }
            let km = Number(inputKm.current.value)
            const distance = [...steps].find( element => element.date === inputDate.current.value ) 
            if (distance) {
                km = Number(distance.km) + km
            }

            delElement({date :inputDate.current.value , km : `${km}`})

        }}
        >
            <div className="steps-header">
                <label htmlFor="steps-date">
                {"Дата (дд.мм.гг)"}   
                <input type="text" id="steps-date" ref={inputDate} /> 
                </label>
                
                <label htmlFor="steps-km">
                {"Пройдено км"}    
                <input type="text" id="steps-km" ref={inputKm} />
                </label>
                <button className="steps-btn">OK</button>
            </div>
            <div className="steps-table-head">
                <span>{"Дата (дд.мм.гг)"}</span>
                <span>{"Пройдено км"}</span>
                <span>{"Действия"}</span>

            </div>
            <div className="step-container">
                <Step data={steps} onChange={onChange} onDel={onDel}/>
            </div>
            <div className="steps-place"></div>
        
        </form>
    )
}

export default Steps