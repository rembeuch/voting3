import useEth from "../../contexts/EthContext/useEth";


function StartVoteBtn() {
    const { state: { contract, accounts } } = useEth();

    const StartVote = async e => {
        await contract.methods.startVotingSession().send({ from: accounts[0] });
    };

    return (
        <div className="btns">

            <div onClick={StartVote} className="btn">
                startVotingSession
            </div>

        </div>
    );
}

export default StartVoteBtn;
