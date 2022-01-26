import React, { useState } from 'react';

function NameList() {
    const names = ["Jacky", "Jenny", "Nick", "Christine"];
    //var listOfNames = ""
    const [listOfNames, setListOfNames] = useState("")
    var currentName = ""
    const optionList = [
        (<option>John</option>),
        (<option>Jack</option>),
        (<option>Jennie</option>),
    ];
    const optionLIst2 = names.map(e => {
        return (<option>{e}</option>)
    });

    const addName = () => {
        alert("Hello " + currentName)
        // listOfNames += currentName+" "
        setListOfNames(listOfNames + " " + currentName)
    }

    const handleNameChange = (e) => {
        console.log(e.target.value)
        currentName = e.target.value
    }

    return (
        <>
            <select>
                {optionLIst2}
            </select>

            <input type="text" onChange={handleNameChange}></input>

            <button onClick={addName}>Add</button>
            <p>{listOfNames}</p>
        </>

    )
}

export default NameList;