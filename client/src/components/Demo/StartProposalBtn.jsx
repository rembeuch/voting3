import useEth from "../../contexts/EthContext/useEth";


function StartProposalBtn() {
    const { state: { contract, accounts } } = useEth();

    const StartProposal = async e => {
        await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
    };

    return (
        <div className="btns">

            <div onClick={StartProposal} className="btn">
                startProposalsRegistering
            </div>

        </div>
    );
}

export default StartProposalBtn;
