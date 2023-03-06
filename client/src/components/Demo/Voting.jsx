import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";


function Voting() {
    const [EventValue, setEventValue] = useState(["", ""]);
    const [oldEvents, setOldEvents] = useState(["", ""]);

    const { state: { contract } } = useEth();

    useEffect(() => {
        (async function () {

            let oldEvents = await contract.getPastEvents('Voted', {
                fromBlock: 0,
                toBlock: 'latest'
            });
            let oldies = [];
            oldEvents.forEach(event => {
                oldies[0] = event.returnValues[0];
                oldies[1] = event.returnValues[1];
            });
            setOldEvents(oldies);

            await contract.events.Voted({ fromBlock: "earliest" })
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
  function setVote(uint256 _id) external onlyVoters {
    require(
        workflowStatus == WorkflowStatus.VotingSessionStarted,
        "Voting session havent started yet"
    );
    require(voters[msg.sender].hasVoted != true, "You have already voted");
    require(_id < proposalsArray.length, "Proposal not found"); // pas obligé, et pas besoin du >0 car uint

    voters[msg.sender].votedProposalId = _id;
    voters[msg.sender].hasVoted = true;
    proposalsArray[_id].voteCount++;

    emit Voted(msg.sender, _id);
}
`}

            <br></br>


            <br></br>
            {`Events arriving`} {EventValue} {`Old events`} voter adress:{oldEvents[0]} proposal id:{oldEvents[1]}
        </code>
    );
}

export default Voting;
