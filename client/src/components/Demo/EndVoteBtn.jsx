import useEth from "../../contexts/EthContext/useEth";


function EndVoteBtn() {
    const { state: { contract, accounts } } = useEth();

    const EndVote = async e => {
        await contract.methods.endVotingSession().send({ from: accounts[0] });
    };

    return (
        <div className="btns">

            <div onClick={EndVote} className="btn">
                endVotingSession
            </div>

        </div>
    );
}

export default EndVoteBtn;
