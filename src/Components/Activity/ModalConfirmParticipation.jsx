import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';

import Button from '../Forms/Button';
import Input from '../Forms/Input';

import styles from './ModalConfirm.module.css';

const ModalConfirmParicipation = ({tickets}) => {
    
  const dialog = useDialog();
  
  const reservedTickets = tickets;
  const [ticket, setTickets] = useState(tickets);
  const [isValid, setIsValid] = useState(true);

  async function validateReservedTickets(ticket){
    if(ticket > reservedTickets){
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }

  return (
    <div className={styles.modal}>
      <Input
        label= {`Vagas reservadas: ${reservedTickets}`}
        type="number"
        name="ticket"
        value={ticket}
        onKeyUp={ () => {validateReservedTickets(ticket)} }
        onChange={(e) => {
          validateReservedTickets(ticket)
          setTickets(e.target.value);
        }}
      />
      <div className={styles.button}>
        <Button
          disabled={!isValid}
          onClick={() => 
            dialog.close(ticket)
          }
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
}

export default ModalConfirmParicipation;
