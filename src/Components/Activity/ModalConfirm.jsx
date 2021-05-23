import React, { useState } from 'react';
import { useDialog } from 'react-st-modal';

import Button from '../Forms/Button';
import Input from '../Forms/Input';

import styles from './ModalConfirm.module.css';

const ModalConfirm = ({vacanciesAvailable, tickets}) => {
    
  const dialog = useDialog();

  const [ticket, setTickets] = useState(tickets);
  const [isValid, setIsValid] = useState(true);

  async function validaVacancies(ticket){
    if(ticket > vacanciesAvailable){
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }

  return (
    <div className={styles.modal}>
      <Input
        label= {`Vagas Disponíveis: ${vacanciesAvailable}`}
        type="number"
        name="ticket"
        value={ticket}
        onKeyUp={ () => {validaVacancies(ticket)} }
        onChange={(e) => {
          validaVacancies(ticket)
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

export default ModalConfirm;
