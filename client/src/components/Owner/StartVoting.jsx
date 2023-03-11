import { useState } from "react";

const StartVoting = ({ accounts, contract }) => {
    const [error, setError] = useState();

    const startVotingSession = () => {
        contract.methods.startVotingSession().call({ from: accounts[0] })
            .then(result => {
                contract.methods.startVotingSession().send({ from: accounts[0] });
            })
            .catch(error => {
                setError(error.message.match(/revert (.*)/)[1]);
            });
    };

    return (
        <div>
            <label>Start voting session</label>
            <button onClick={startVotingSession}>startVotingSession</button>
            {error}
        </div>
    );
}

export default StartVoting;
