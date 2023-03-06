import useEth from "../../contexts/EthContext/useEth";

function TallyVoteBtn() {
    const { state: { contract, accounts } } = useEth();

    const tallyVote = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        await contract.methods.tallyVotes().send({ from: accounts[0] });
    };

    return (
        <div className="btns">

            <div onClick={tallyVote} className="input-btn">
                tallyVotes
            </div>
        </div>
    );
}

export default TallyVoteBtn;
