import useEth from "../../contexts/EthContext/useEth";
import { useEffect, useState } from "react";


function EndProposal() {
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
  function endProposalsRegistering() external onlyOwner {
    require(
        workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
        "Registering proposals havent started yet"
    );
    workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
    emit WorkflowStatusChange(
        WorkflowStatus.ProposalsRegistrationStarted,
        WorkflowStatus.ProposalsRegistrationEnded
    );
}
}`}

            <br></br>
            {`Events arriving`} {EventValue} {`Old events`}  prev:{oldEvents[0]} actual:{oldEvents[1]}
        </code>
    );
}

export default EndProposal;
