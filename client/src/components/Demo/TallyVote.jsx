import useEth from "../../contexts/EthContext/useEth";
import { useEffect, useState } from "react";


function TallyVote() {
    const [EventValue, setEventValue] = useState(["", ""]);
    const [oldEvents, setOldEvents] = useState(["", ""]);
    const { state: { contract } } = useEth();

    useEffect(() => {
        (async function () {

            let oldEvents = await contract.getPastEvents('WorkflowStatusChange', {
                fromBlock: 0,
                toBlock: 'latest'
            });
            let oldies = [];
            oldEvents.forEach(event => {
                oldies[0] = event.returnValues[0];
                oldies[1] = event.returnValues[1];
            });
            setOldEvents(oldies);

            await contract.events.WorkflowStatusChange({ fromBlock: "earliest" })
                .on('data', event => {
                    let lesevents = event.returnValues;
                    setEventValue([lesevents[0], lesevents[1]]);
                })
                .on('changed', changed => console.log(changed))
                .on('error', err => console.log(err))
                .on('connected', str => console.log(str))
        })();
    }, [contract])

    return (
        <code>
            {`contract Voting {
  function tallyVotes() external onlyOwner {
    require(
        workflowStatus == WorkflowStatus.VotingSessionEnded,
        "Current status is not voting session ended"
    );
    uint256 _winningProposalId;
    for (uint256 p = 0; p < proposalsArray.length; p++) {
        if (
            proposalsArray[p].voteCount >
            proposalsArray[_winningProposalId].voteCount
        ) {
            _winningProposalId = p;
        }
    }
    winningProposalID = _winningProposalId;

    workflowStatus = WorkflowStatus.VotesTallied;
    emit WorkflowStatusChange(
        WorkflowStatus.VotingSessionEnded,
        WorkflowStatus.VotesTallied
    );
}
}`}

            <br></br>
            {`Events arriving`} {EventValue} {`Old events`}  prev:{oldEvents[0]} actual:{oldEvents[1]}
        </code>
    );
}

export default TallyVote;
