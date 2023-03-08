import useEth from "../../contexts/EthContext/useEth";


function StartProposalBtn() {
    const { state: { contract, accounts } } = useEth();

    const StartProposal = async e => {
        await contract.methods.startProposalsRegistering().call({ from: accounts[0] }, function (error, result) {
            if (error) {
                console.log(error.message.split("revert ")[1]); // Affiche le message d'erreur du require()
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

        </div>
    );
}
export default StartProposalBtn;
