import useEth from "../../contexts/EthContext/useEth";


function EndProposalBtn() {
    const { state: { contract, accounts } } = useEth();

    const EndProposal = async e => {
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
    };

    return (
        <div className="btns">

            <div onClick={EndProposal} className="btn">
                endProposalsRegistering
            </div>

        </div>
    );
}

export default EndProposalBtn;
