import { Flex, FormControl, Text, FormLabel, Grid, Switch, NumberInput, Textarea, Button } from "@chakra-ui/react";
import { RegisterPILPolicyRequest, StoryClient } from "@story-protocol/core-sdk";
import { useContext, useState } from "react";
import { ClientsContext } from "../providers/clientsProvider";

export default function CreatePolicy({ setPolicyId }: { setPolicyId: React.Dispatch<React.SetStateAction<string>> }) {

    const [transferable, setTransferable] = useState(true);
    const [attribution, setAttribution] = useState(true);
    const [commercialUse, setCommercialUse] = useState(false);
    const [commercialAttribution, setCommercialAttribution] = useState(true);
    const [derivativesAttribution, setDerivativesAttribution] = useState(true);
    const [derivativesAllowed, setDerivativesAllowed] = useState(true);
    const [derivativesApproval, setDerivativesApproval] = useState(true);
    const [derivativesReciprocal, setDerivativesReciprocal] = useState(true);

    const storyClient: StoryClient | undefined = useContext(ClientsContext)?.storyClient;

    const handleCreatePolicy = async () => {
        if (!storyClient) {
            console.log("Story client not found. Please check if the client is initialized.");
            return;
        }

        const nonCommercialSocialRemixingParams: RegisterPILPolicyRequest = {
            transferable: transferable,
            attribution: attribution,
            commercialUse: commercialUse,
            //commercialAttribution: commercialAttribution,
            derivativesAttribution: derivativesAttribution,
            derivativesAllowed: derivativesAllowed,
            derivativesApproval: derivativesApproval,
            derivativesReciprocal: derivativesReciprocal
        }

        const response = await storyClient.policy.registerPILPolicy({
            ...nonCommercialSocialRemixingParams,
            txOptions: { waitForTransaction: true }
        });

        if (response.policyId) setPolicyId(response.policyId);
        console.log(`PIL Policy registered at transaction hash ${response.txHash}, Policy ID: ${response.policyId}`)
    };

    return (
        <Flex flexDirection="column" textColor="white" borderColor="gray.800" borderWidth={1} p={4} borderRadius="xl" w="100%">
            <Text mb={4} textColor="gray.800" fontSize="large">3 - Choose PIL Policy Parameters</Text>
            <Grid as="form" backgroundColor="gray.700" templateColumns="repeat(3, 1fr)" borderRadius="lg" rowGap={0} p={4} h="100%" w="100%" columnGap={8} >
                <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0" fontSize="small">Transferable:</FormLabel>
                    <Switch size="sm" isChecked={transferable} onChange={(e) => setTransferable(e.target.checked)} />
                </FormControl>
                <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0" fontSize="small">Attribution:</FormLabel>
                    <Switch size="sm" isChecked={attribution} onChange={(e) => setAttribution(e.target.checked)} />
                </FormControl>
                <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0" fontSize="small">Commercial Use:</FormLabel>
                    <Switch size="sm" isChecked={commercialUse} onChange={(e) => setCommercialUse(e.target.checked)} />
                </FormControl>
                <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0" fontSize="small">Commercial Attribution:</FormLabel>
                    <Switch size="sm" isChecked={commercialAttribution} onChange={(e) => setCommercialAttribution(e.target.checked)} />
                </FormControl>
                <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0" fontSize="small">Derivatives Attribution:</FormLabel>
                    <Switch size="sm" isChecked={derivativesAttribution} onChange={(e) => setDerivativesAttribution(e.target.checked)} />
                </FormControl>
                <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0" fontSize="small">Derivatives Allowed:</FormLabel>
                    <Switch size="sm" isChecked={derivativesAllowed} onChange={(e) => setDerivativesAllowed(e.target.checked)} />
                </FormControl>
                <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0" fontSize="small">Derivatives Approval:</FormLabel>
                    <Switch size="sm" isChecked={derivativesApproval} onChange={(e) => setDerivativesApproval(e.target.checked)} />
                </FormControl>
                <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0" fontSize="small">Derivatives Reciprocal:</FormLabel>
                    <Switch size="sm" isChecked={derivativesReciprocal} onChange={(e) => setDerivativesReciprocal(e.target.checked)} />
                </FormControl>
                <Button
                    size="sm"
                    onClick={handleCreatePolicy}
                >
                    Create Policy
                </Button>
            </Grid>
        </Flex >
    );
}