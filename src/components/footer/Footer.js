import "./footer.scss"
import { GrNotes } from 'react-icons/gr'
import {AiOutlinePlusSquare,AiOutlineCalculator} from 'react-icons/ai'
import {FcTodoList} from 'react-icons/fc'
import {RiContactsLine} from 'react-icons/ri'

const Footer = () => {
  return (
    <div className='footer'>
        <AiOutlineCalculator id="Calc"/>
       <AiOutlinePlusSquare id="Add" />
       <FcTodoList id="To_do"/>
    </div>
  )
}

export default Footer