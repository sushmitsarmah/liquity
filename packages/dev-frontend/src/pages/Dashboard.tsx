import { Container, Grid, Box } from "theme-ui";

import { TroveManager } from "../components/TroveManager";
import { StabilityDepositManager } from "../components/StabilityDepositManager";
import { StakingManager } from "../components/StakingManager";
import { RedemptionManager } from "../components/RedemptionManager";
import { SystemStats } from "../components/SystemStats";
import { PriceManager } from "../components/PriceManager";
import { LiquidationManager } from "../components/LiquidationManager";
import { RiskiestTroves } from "../components/RiskiestTroves";
import RiskiestTrovesChart from "../components/RiskiestTrovesChart";

export const Dashboard: React.FC = () => (
  <>
    {/* <Container variant="columns">
      <Container variant="left">
        <TroveManager />
        <StabilityDepositManager />
        <StakingManager />
        <RedemptionManager />
      </Container>

      <Container variant="right">
        <SystemStats />
        <PriceManager />
        <LiquidationManager />
      </Container>
    </Container> */}

    <Container variant="columns">
      <Container variant="left">
        <Grid gap={10} columns={4} variant="grid">
            <TroveManager />
            <StabilityDepositManager />
            <StakingManager />
            <RedemptionManager />
        </Grid>
        <RiskiestTrovesChart />
      </Container>
      <Container variant="right">
        <Grid gap={10} columns={1} variant="grid">
          <SystemStats />
          <PriceManager />
          <LiquidationManager />
        </Grid>
      </Container>
    </Container>

    <RiskiestTroves pageSize={10} />
  </>
);
