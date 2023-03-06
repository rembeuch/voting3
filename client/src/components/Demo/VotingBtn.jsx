import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VotingBtn() {
    const { state: { contract, accounts } } = useEth();
    const [uint, setUint] = useState("");

    const handleUintChange = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
            setUint(e.target.value);
        }
    };

    const setVote = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (uint === "") {
            alert("Please enter a value to write.");
            return;
        }
        const newValue = uint;
        await contract.methods.setVote(newValue).send({ from: accounts[0] });
    };

    return (
        <div className="btns">

            <div onClick={setVote} className="input-btn">
                setVote(<input
                    type="text"
                    placeholder="uint"
                    uint={uint}
                    onChange={handleUintChange}
                />)
            </div>
        </div>
    );
}

export default VotingBtn;
