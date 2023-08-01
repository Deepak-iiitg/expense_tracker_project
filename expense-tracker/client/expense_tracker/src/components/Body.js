import Yearly from './Yearly';
import Monthly from "./Monthly";
import DaytoDay from "./DayToDay";
import Leaderboard from "./Leaderboard";
import AddExpense from "./AddExpense";
function Body(props){
    if(props.render === 'add'){
        return <AddExpense email= {props.email}/>
    }else if(props.render === 'monthly' || props.render==='day'){
        return <Monthly email={props.email}/>
    }
    else if(props.render === 'yearly'){
        return <Yearly email={props.email}/>
    }
    else if(props.render === 'leaderboard'){
        return <Leaderboard />
    }else if(props.render === 'daily'){
        return <DaytoDay email={props.email}/>
    }
}
export default Body;