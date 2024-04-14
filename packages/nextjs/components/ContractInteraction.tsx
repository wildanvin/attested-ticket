import * as React from "react";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const writeTx = useTransactor();

  const { writeAsync, isLoading } = useContractWrite({
    address: DeployedContracts[31337].YourContract.address,
    abi: DeployedContracts[31337].YourContract.abi,
    functionName: "setGreeting",
    value: parseEther("0.01"),
    args: ["Hello world!"],
  });

  const handleSetGreeting = async () => {
    try {
      await writeTx(writeAsync, { blockConfirmations: 1 });
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleSetGreeting} disabled={isLoading}>
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>
          Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
        </>
      )}
    </button>
  );
};
