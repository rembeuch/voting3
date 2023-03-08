import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";


function StartProposalBtn() {
    const { state: { contract, accounts } } = useEth();
    const [error, setError] = useState()

    const StartProposal = async e => {
        await contract.methods.startProposalsRegistering().call({ from: accounts[0] }, function (error, result) {
            if (error) {
                setError(error.message.match(/revert (.*)/)[1]); // Affiche le message d'erreur du require()
            } else {
                contract.methods.startProposalsRegistering().send({ from: accounts[0] }); // Affiche le résultat de la fonction si la condition est remplie
            }
        });

    }
    return (
        <div className="btns">

            <div onClick={StartProposal} className="btn">
                startProposalsRegistering
            </div>
            {error}
        </div>
    );
}
export default StartProposalBtn;
