import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalBtn({ setProposal }) {
    const { state: { contract, accounts } } = useEth();
    const [uint, setUint] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleUintChange = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
            setUint(e.target.value);
        }
    };

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const getProposal = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (uint === "") {
            alert("Please enter a value to write.");
            return;
        }
        const newValue = uint;
        const proposal = await contract.methods.getOneProposal(newValue).call({ from: accounts[0] });
        setProposal(proposal);

    };

    const addProposal = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (inputValue === "") {
            alert("Please enter a value to write.");
            return;
        }
        const newValue = inputValue;
        const proposal = await contract.methods.addProposal(newValue).send({ from: accounts[0] });
        setProposal(proposal);

    };

    return (
        <div className="btns">

            <div onClick={getProposal} className="input-btn">
                getProposal(<input
                    type="text"
                    placeholder="uint"
                    uint={uint}
                    onChange={handleUintChange}
                />)
            </div>
            <div onClick={addProposal} className="input-btn">
                addProposal(<input
                    type="text"
                    placeholder="description"
                    value={inputValue}
                    onChange={handleInputChange}
                />)
            </div>

        </div>
    );
}

export default ProposalBtn;
