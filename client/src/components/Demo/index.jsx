import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Cta from "./Cta";
import Voter from "./Voter";
import VoterBtns from "./VoterBtns";
import StartProposalBtn from "./StartProposalBtn";
import StartProposal from "./StartProposal";
import Proposal from "./Proposal";
import ProposalBtn from "./ProposalBtn";
import EndProposalBtn from "./EndProposalBtn";
import EndProposal from "./EndProposal";
import StartVoteBtn from "./StartVoteBtn";
import StartVote from "./StartVote";
import VotingBtn from "./VotingBtn";
import Voting from "./Voting";
import EndVoteBtn from "./EndVoteBtn";
import EndVote from "./EndVote";
import TallyVoteBtn from "./TallyVoteBtn";
import TallyVote from "./TallyVote";

import Desc from "./Desc";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();
  const [voter, setVoter] = useState(["", "", ""]);
  const [whitelist, setWhitelist] = useState("")
  const [proposal, setProposal] = useState(["", ""]);

  const demo =
    <>
      <Cta />
      <div className="contract-container">
        <Voter voter={voter} whitelist={whitelist} />
        <VoterBtns setVoter={setVoter} setWhitelist={setWhitelist} />
      </div>
      <br></br>
      <div className="contract-container">
        <StartProposal />
        <StartProposalBtn />
      </div>
      <br></br>
      <div className="contract-container">
        <Proposal proposal={proposal} />
        <ProposalBtn setProposal={setProposal} />
      </div>
      <br></br>
      <div className="contract-container">
        <EndProposal />
        <EndProposalBtn />
      </div>
      <br></br>
      <div className="contract-container">
        <StartVote />
        <StartVoteBtn />
      </div>
      <br></br>
      <div className="contract-container">
        <Voting />
        <VotingBtn />
      </div>
      <br></br>
      <div className="contract-container">
        <EndVote />
        <EndVoteBtn />
      </div>
      <br></br>
      <div className="contract-container">
        <TallyVote />
        <TallyVoteBtn />
      </div>
      <Desc />
    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
