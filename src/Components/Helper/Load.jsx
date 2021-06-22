import React, {useState} from 'react';
import LoadGif from "../../Assets/load.gif";
import styles from './Load.module.css';

const Load = () => {
    return (
        <div id="loading-div" className={styles.loadContainer}>
            <table>
                <tr>
                    <td><img src={LoadGif}/></td>
                </tr>
            </table>
        </div>
    );
};

export default Load;
