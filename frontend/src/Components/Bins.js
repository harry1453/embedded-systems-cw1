import CircularProgressBar from './CircularProgressBar.js';
import Modal from './Modal.js';
import AddModalWithRenameSupport from './AddModalWithRenameSupport.js';
import Backdrop from './Backdrop.js';
import Card from './ui/Card.js';

import classes from './Bins.module.css';

import {useState} from 'react';

function Bins(props) {
  const [binValue, setBinValue] = useState(false);
  const [renameBinValue, setRenameBinValue] = useState(false);

    function addHandler() {
      setBinValue(true);
      console.log('add ' + props.ID);
    }
    
    function changeNameHandler() {
      setRenameBinValue(true);
      console.log('change name ' + props.ID);
    }

    function closeHandler() {
      setBinValue(false);
      setRenameBinValue(false);
      console.log('remove ' + props.ID);
    }

    return(
        <Card>
          <h2 className={'classes.content'}> ID {props.ID}</h2>


          <div className={'classes.content'}>
            <CircularProgressBar upper_value={props.Fullness}/>
          </div>

          <div className='classes.actions'>
            <button className = 'btn' onClick={addHandler}>Claim This Bin</button>
            <button className = 'btn' onClick={changeNameHandler}>Properties</button>
          </div>
          
          {binValue && <Modal ID = {props.ID} onCancel={closeHandler} onConfirm={closeHandler}/>}
          {(binValue) && <Backdrop onClick={closeHandler}/>}

          {renameBinValue && <AddModalWithRenameSupport 
                                ID={props.ID} 
                                Name={props.Name} 
                                Latitude={props.Latitude} 
                                Longitude={props.Longitude} 
                                Fullness={props.Fullness} 
                                Threshold={props.Threshold} 
                                onCancel={closeHandler} 
                                onConfirm={closeHandler}/>
          }
          {(renameBinValue) && <Backdrop onClick={closeHandler}/>}
        </Card>
    );
}


export default Bins;