import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VoterBtns({ setVoter, setWhitelist }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    // if (/^\d+$|^$/.test(e.target.value)) {
    setInputValue(e.target.value);
    // }
  };

  const getVoter = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = inputValue;
    const voter = await contract.methods.getVoter(newValue).call({ from: accounts[0] });
    setVoter(voter);

  };

  const addVoter = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = inputValue;
    const voter = await contract.methods.addVoter(newValue).send({ from: accounts[0] });
    setWhitelist(voter);

  };

  return (
    <div className="btns">

      <div onClick={getVoter} className="input-btn">
        getVoter(<input
          type="text"
          placeholder="address"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>
      <div onClick={addVoter} className="input-btn">
        addVoter(<input
          type="text"
          placeholder="address"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default VoterBtns;
