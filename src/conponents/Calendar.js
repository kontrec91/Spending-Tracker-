import React ,{useState} from "react";


const Calendar = (props) => {
    // console.log(props.getMonth)
    // const mounthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'December'];

    let today = new Date();
    let monthNow = today.getMonth()
    // let yearNow = today.getFullYear()

    const [increment, setIncrement] = useState(monthNow);

    // console.log(monthNow + ', ' + yearNow)

    // const month = mounthArr[+today.getMonth()]; 
    // const month = mounthArr[increment]; 
    const year = +today.getFullYear();

    function onHandleClick(event) {
        if(event.target.id ==="arrow-left" && increment !==0){
             setIncrement(increment-1);
            //  props.getMonth(increment);
            //  console.log('--increment', increment, mounthArr[increment]);
        }else if(event.target.id ==="arrow-right" && increment !==12){
            setIncrement(increment+1);
            // props.getMonth(increment);
            // console.log('++increment', increment, mounthArr[increment]);
        }
    }

    // (new Date('10')).toLocaleString('default', { month: 'long' })

return (<>
            <span className="arrow-nav" id="arrow-left" onClick={onHandleClick}>&#12296;</span>
            {/* <span>{month + ", " + year}</span>         */}
            <span>{(new Date(increment.toString())).toLocaleString('EN', { month: 'long' }) + ', ' + year}</span>                    
            <span className="arrow-nav" id="arrow-right" onClick={onHandleClick}>&#12297;</span>
        </>)
}

export { Calendar }