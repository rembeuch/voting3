import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";


function Voter({ voter }) {
  const spanEle = useRef(null);
  const [EventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();

  const { state: { contract } } = useEth();

  useEffect(() => {
    (async function () {

      let oldEvents = await contract.getPastEvents('VoterRegistered', {
        fromBlock: 0,
        toBlock: 'latest'
      });
      let oldies = [];
      oldEvents.forEach(event => {
        oldies.push(event.returnValues[0]);
      });
      setOldEvents(oldies);

      await contract.events.VoterRegistered({ fromBlock: "earliest" })
        .on('data', event => {
          let lesevents = event.returnValues[0];
          setEventValue(lesevents);
        })
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str))
    })();
  }, [contract])

  return (
    <code>
      {`contract Voting {
  function getVoter(address _addr)
  external
  view
  onlyVoters
  returns (Voter memory)
{
  return voters[_addr];
} `}
      <span className="secondary-color" ref={spanEle}>
        Voter:
        isRegistered <strong>{`${voter[0]}`}</strong>/ hasVoted <strong>{`${voter[1]}`}</strong>/
        votedProposalId <strong>{`${voter[2]}`}</strong>

      </span>
      <br></br>
      {`function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
     Events arriving: `} {`${EventValue}`} {`
 
 Old events: `} {`${oldEvents}`}
    </code>
  );
}

export default Voter;
