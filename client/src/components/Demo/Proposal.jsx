import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";


function Proposal({ proposal }) {
    const spanEle = useRef(null);
    const [EventValue, setEventValue] = useState("");
    const [oldEvents, setOldEvents] = useState();

    const { state: { contract } } = useEth();

    useEffect(() => {
        (async function () {

            let oldEvents = await contract.getPastEvents('ProposalRegistered', {
                fromBlock: 0,
                toBlock: 'latest'
            });
            let oldies = [];
            oldEvents.forEach(event => {
                oldies.push(event.returnValues[0]);
            });
            setOldEvents(oldies);

            await contract.events.ProposalRegistered({ fromBlock: "earliest" })
                .on('data', event => {
                    let lesevents = event.returnValues;
                    setEventValue(lesevents[0]);
                })
                .on('changed', changed => console.log(changed))
                .on('error', err => console.log(err))
                .on('connected', str => console.log(str))
        })();
    }, [contract])

    return (
        <code>
            {`contract Voting {
  function getOneProposal(uint256 _id)
  external
  view
  onlyVoters
  returns (Proposal memory)
{
  return proposalsArray[_id];
}
`}
            <span className="secondary-color" ref={spanEle}>
                Voter:
                description <strong>{`${proposal[0]}`}</strong>/ voteCount <strong>{`${proposal[1]}`}</strong>/

            </span>
            <br></br>
            {`function addProposal(string calldata _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        ); // facultatif
        // voir que desc est different des autres

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length - 1);
    }`}

            <br></br>
            {`Events arriving, Proposal Id:`} {EventValue} {`Old events, Proposal Id:`} {oldEvents}
        </code>
    );
}

export default Proposal;
