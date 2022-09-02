import React from "react";

import { ClipboardID } from "../common/ClipboardID";
import { MainWrapper } from "../MainWrapper/MainWrapper";

export const Home = () => {
   return (
      <MainWrapper headerTitle="Camping Trips">
         <ClipboardID></ClipboardID>
      </MainWrapper>
   );
};
