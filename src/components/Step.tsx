
import Popup from "reactjs-popup"
import { v4 }from 'uuid'

interface StepType {
        date: string,
        km : string
}

interface Props {
    data : StepType[],
    onChange : (add : string, date : string) => void,
    onDel : (evt : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,

}



const Step = ({data, onChange, onDel} : Props ) => { 
    
    return data.sort((a:StepType, b:StepType) => {

        const dateA :number[] = a.date.split('.').map(date => +date)
        const dateB :number[] = b.date.split('.').map(date => +date)
        return (new Date(dateB[2], dateB[1], dateB[0]).valueOf() - new Date(dateA[2], dateA[1], dateA[0]).valueOf())
        })
        .map( (el : StepType) => {
            
            const key = v4()
            let date: string = ""
            
                    return (
                        
                    <div className="step" key={key} >
                        <span className="step-date">{el.date}</span>
                        <span className="step-dist">{el.km}</span>
                        <span className="step-actions">
                            <Popup trigger={<button type="button">🖊</button>} position="left bottom" onOpen={(event) => {
                                event?.preventDefault();
                                event?.stopPropagation();
                                date = event?.target.closest('.step').querySelector(".step-date").textContent
                                }}>
                                <div className="step-modal">
                                    <span>Введите количество км :</span>
                                    <input className="step-km-redact" ></input>

                                    <button 
                                    type="button"
                                    onClick={(evt) => { 
                                        evt.preventDefault();
                                        evt.stopPropagation()
                                        console.log(evt.target);
                                        const quantity = document.querySelector('.step-km-redact')?.value.trim() 
                                        if (quantity){
                                            onChange(quantity, date)
                                        }
                                        
                                        }}
                                    >ОК</button>
                                </div>

                            </Popup>
                            <button onClick={onDel}>X</button>
                        </span>
                    </div>
                    )
                })
    }
       
    




export default Step