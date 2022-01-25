import { useState, useRef, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

import { FaTrash } from 'react-icons/fa';

const styles = {
    textCenter: { textAlign: 'center' },
    textRight: { textAlign: 'right' }
}

function QuotationTable({ data, setDataItems }) {
    const [dataRows, setDataRows] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);


    useEffect(() => {
        let sum = 0;
        let sumDis = 0;
        const z = data.map((v, i) => {
            let amount = (v.qty * v.ppu);
            if (amount > v.dis) {
                amount -= v.dis
            }
            else {
                amount = 0
            };
            sumDis += parseInt(v.dis);
            sum += amount;
            return (
                <tr key={i} style = {{ color:'white' }}>
                    <td><FaTrash onClick={() => deleteClick(i)}/></td>
                    <td style={styles.textCenter}>{v.qty}</td>
                    <td>{v.item}</td>
                    <td style={styles.textCenter}>{numberWithCommas(v.ppu)}</td>
                    <td style={styles.textCenter}>{numberWithCommas(v.dis)}</td>
                    <td style={styles.textCenter}>{numberWithCommas(amount)}</td>
                </tr>
            );
        });

        setDataRows(z);
        setTotalPrice(sum);
        setTotalDiscount(sumDis);
    }, [data]); //empty list of dependency, in this case useEffect will run only one time.

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const clearTable = () => {
        setDataItems([]);
        setDataRows([]);  //list of HTML rows
    };

    const deleteClick = (i) => {
        data.splice(i,1);
        setDataItems([...data]);
    }




    return (
        <div>
            <h1>Quotation</h1>
            <Button onClick={clearTable} variant="dark">Clear</Button>
            <Table style={{ width: '100%' }}>
                <thead>
                    <tr style={{ backgroundColor: 'green', color: 'white' }}>
                        <th></th>
                        <th style={styles.textCenter}>Qty</th>
                        <th style={styles.textCenter}>Item</th>
                        <th style={styles.textCenter}>Price/Unit</th>
                        <th style={styles.textCenter}>Discount</th>
                        <th style={styles.textCenter}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {dataRows}
                </tbody>
                <tfoot>
                    <tr style = {{ color:'white' }}>
                        <th colSpan={3}></th>
                        <th style={styles.textCenter}>Total</th>
                        <th style={styles.textCenter}>{numberWithCommas(totalDiscount)}</th>
                        <th style={styles.textCenter}>{numberWithCommas(totalPrice)}</th>
                    </tr>
                </tfoot>
            </Table>
        </div>


    )
}


export default QuotationTable;